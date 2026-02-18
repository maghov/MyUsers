/**
 * Catalog Item: Create User Request
 *
 * Register in ServiceNow: Service Catalog > Catalog Definitions > Maintain Items
 *
 * Category:       User Management
 * Short description: Request creation of a new user account
 *
 * ── Catalog Variables ──────────────────────────────────────
 *
 * Name                  Type           Mandatory   Notes
 * ──────────────────────────────────────────────────────────
 * country_code          Select Box     Yes         Choices: +47,+46,+45,+358,+44,+1,+49,+33,+91
 * mobile_number         String         Yes
 * first_name            String         Yes
 * last_name             String         Yes
 * external_company      Checkbox       No          Default: false
 * company_name          String         No          Visible when external_company is checked
 * external_email        Email          Yes
 * internal_manager      Reference      Yes         Reference: sys_user table
 * start_date            Date           Yes
 * end_date              Date           Yes         Validation: max 1 year from today
 * title                 String         No
 * job_role              Select Box     Yes         Choices: Developer, Designer, Project Manager,
 *                                                           Business Analyst, QA Engineer, DevOps Engineer,
 *                                                           Scrum Master, Product Owner, Consultant, Architect
 *
 * ── Catalog Client Scripts ─────────────────────────────────
 *
 * 1. "Show Company Name" (onChange on external_company):
 *    Show/hide company_name variable based on checkbox state.
 *
 * 2. "Validate End Date" (onChange on end_date):
 *    Ensure end_date is not more than 1 year in the future.
 */

// ── Catalog Client Script: Show Company Name ─────────────
// Type: onChange | Variable: external_company
function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading) return;

  var isExternal = newValue === 'true' || newValue === true;
  g_form.setDisplay('company_name', isExternal);
  if (!isExternal) {
    g_form.setValue('company_name', '');
  }
}

// ── Catalog Client Script: Validate End Date ─────────────
// Type: onChange | Variable: end_date
function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading || !newValue) return;

  var endDate = new Date(newValue);
  var maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  if (endDate > maxDate) {
    g_form.showFieldMsg('end_date', 'End date cannot be more than 1 year in the future.', 'error');
    g_form.setValue('end_date', '');
  }
}

// ── Flow / Workflow Script (runs on submission) ──────────
// Use in Flow Designer "Run Script" action or a workflow script activity.
(function executeCreateUser(current) {
  var util = new MyUsersUtil();
  util.createUser({
    country_code:     current.variables.country_code.toString(),
    mobile_number:    current.variables.mobile_number.toString(),
    first_name:       current.variables.first_name.toString(),
    last_name:        current.variables.last_name.toString(),
    external_company: current.variables.external_company.toString() === 'true',
    company_name:     current.variables.company_name.toString(),
    external_email:   current.variables.external_email.toString(),
    internal_manager: current.variables.internal_manager.getDisplayValue(),
    start_date:       current.variables.start_date.toString(),
    end_date:         current.variables.end_date.toString(),
    title:            current.variables.title.toString(),
    job_role:         current.variables.job_role.toString()
  });
})(current);
