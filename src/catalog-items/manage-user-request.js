/**
 * Catalog Item: Manage User Request
 *
 * Register in ServiceNow: Service Catalog > Catalog Definitions > Maintain Items
 *
 * Category:       User Management
 * Short description: Request modification of an existing user account
 *
 * ── Catalog Variables ──────────────────────────────────────
 *
 * Name                  Type           Mandatory   Notes
 * ──────────────────────────────────────────────────────────
 * user_to_manage        Reference      Yes         Reference: u_myusers table
 * first_name            String         No          Pre-populated from selected user
 * last_name             String         No          Pre-populated from selected user
 * external_email        Email          No          Pre-populated from selected user
 * employment            Select Box     No          Choices: Full-time, Part-time, Contract, Temporary, Intern
 * deactivate_user       Checkbox       No          Default: false
 *
 * ── Catalog Client Scripts ─────────────────────────────────
 *
 * 1. "Populate User Fields" (onChange on user_to_manage):
 *    Use GlideAjax to fetch user details and pre-fill the form.
 */

// ── Catalog Client Script: Populate User Fields ──────────
// Type: onChange | Variable: user_to_manage
function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading || !newValue) return;

  var ga = new GlideAjax('MyUsersUtil');
  ga.addParam('sysparm_name', 'getUserByIdAjax');
  ga.addParam('sysparm_user_id', newValue);
  ga.getXMLAnswer(function (answer) {
    var user = JSON.parse(answer);
    if (user) {
      g_form.setValue('first_name', user.first_name);
      g_form.setValue('last_name', user.last_name);
      g_form.setValue('external_email', user.external_email);
      g_form.setValue('employment', user.employment);
      g_form.setValue('deactivate_user', !user.active);
    }
  });
}

// ── Flow / Workflow Script (runs on submission) ──────────
// Use in Flow Designer "Run Script" action or a workflow script activity.
(function executeManageUser(current) {
  var util = new MyUsersUtil();
  var sysId = current.variables.user_to_manage.toString();

  var updates = {
    first_name:     current.variables.first_name.toString(),
    last_name:      current.variables.last_name.toString(),
    external_email: current.variables.external_email.toString(),
    employment:     current.variables.employment.toString(),
    active:         current.variables.deactivate_user.toString() !== 'true'
  };

  util.updateUser(sysId, updates);
})(current);
