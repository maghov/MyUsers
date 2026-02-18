/**
 * MyUsersUtil — Script Include
 *
 * Reusable server-side helper for user management operations.
 * Called from SP widget server scripts and catalog item workflows.
 *
 * Table: u_myusers (custom table — create in ServiceNow with matching fields)
 *
 * To register: System Definition > Script Includes
 *   Name:       MyUsersUtil
 *   Client callable: true  (for GlideAjax access)
 *   Accessible from: All application scopes
 */

var MyUsersUtil = Class.create();
MyUsersUtil.prototype = Object.extendsObject(AbstractAjaxProcessor, {

  TABLE: 'u_myusers',

  // ── Constants ──────────────────────────────────────────────

  JOB_ROLES: [
    'Developer', 'Designer', 'Project Manager', 'Business Analyst',
    'QA Engineer', 'DevOps Engineer', 'Scrum Master', 'Product Owner',
    'Consultant', 'Architect'
  ],

  EMPLOYMENT_TYPES: [
    'Full-time', 'Part-time', 'Contract', 'Temporary', 'Intern'
  ],

  COMPANIES: [
    'TechCorp AB', 'Nordic Solutions', 'Sopra Steria', 'Accenture',
    'Capgemini', 'Bouvet', 'Computas', 'Knowit', 'Webstep', 'Miles'
  ],

  MANAGERS: [
    'Kari Nordmann', 'Per Berg', 'Ingrid Olsen',
    'Thomas Eriksen', 'Maria Larsen'
  ],

  COUNTRY_CODES: [
    { code: '+47', country: 'Norway' },
    { code: '+46', country: 'Sweden' },
    { code: '+45', country: 'Denmark' },
    { code: '+358', country: 'Finland' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+1', country: 'United States' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+91', country: 'India' }
  ],

  // ── Read ───────────────────────────────────────────────────

  /**
   * Return all users as an array of plain objects.
   * @returns {Array<Object>}
   */
  getUsers: function () {
    var users = [];
    var gr = new GlideRecord(this.TABLE);
    gr.orderBy('u_last_name');
    gr.query();
    while (gr.next()) {
      users.push(this._recordToObj(gr));
    }
    return users;
  },

  /**
   * Return a single user by sys_id.
   * @param {string} sysId
   * @returns {Object|null}
   */
  getUserById: function (sysId) {
    var gr = new GlideRecord(this.TABLE);
    if (gr.get(sysId)) {
      return this._recordToObj(gr);
    }
    return null;
  },

  /**
   * GlideAjax-callable: return users filtered by name search term.
   * Client calls: MyUsersUtil > searchUsers, sysparm_search = <term>
   */
  searchUsers: function () {
    var term = this.getParameter('sysparm_search') || '';
    var users = [];
    var gr = new GlideRecord(this.TABLE);
    if (term) {
      gr.addQuery('u_first_name', 'CONTAINS', term)
        .addOrCondition('u_last_name', 'CONTAINS', term);
    }
    gr.orderBy('u_last_name');
    gr.query();
    while (gr.next()) {
      users.push(this._recordToObj(gr));
    }
    return JSON.stringify(users);
  },

  // ── Create ─────────────────────────────────────────────────

  /**
   * Insert a new user record.
   * @param {Object} data - field values (snake_case keys matching u_ columns)
   * @returns {string} sys_id of the new record
   */
  createUser: function (data) {
    var gr = new GlideRecord(this.TABLE);
    gr.initialize();
    gr.setValue('u_country_code',      data.country_code      || '+47');
    gr.setValue('u_mobile_number',     data.mobile_number     || '');
    gr.setValue('u_first_name',        data.first_name        || '');
    gr.setValue('u_last_name',         data.last_name         || '');
    gr.setValue('u_external_company',  data.external_company  || false);
    gr.setValue('u_company_name',      data.company_name      || '');
    gr.setValue('u_external_email',    data.external_email    || '');
    gr.setValue('u_internal_manager',  data.internal_manager  || '');
    gr.setValue('u_start_date',        data.start_date        || '');
    gr.setValue('u_end_date',          data.end_date          || '');
    gr.setValue('u_title',             data.title             || '');
    gr.setValue('u_job_role',          data.job_role          || '');
    gr.setValue('u_employment',        'Full-time');
    gr.setValue('u_active',            true);
    return gr.insert();
  },

  // ── Update ─────────────────────────────────────────────────

  /**
   * Update an existing user record.
   * @param {string} sysId
   * @param {Object} updates - field values to change
   * @returns {boolean} true on success
   */
  updateUser: function (sysId, updates) {
    var gr = new GlideRecord(this.TABLE);
    if (!gr.get(sysId)) {
      return false;
    }
    for (var field in updates) {
      if (updates.hasOwnProperty(field)) {
        gr.setValue('u_' + field, updates[field]);
      }
    }
    gr.update();
    return true;
  },

  // ── Helpers ────────────────────────────────────────────────

  /**
   * Map a GlideRecord row to a plain JS object.
   */
  _recordToObj: function (gr) {
    return {
      sys_id:            gr.getUniqueValue(),
      country_code:      gr.getValue('u_country_code'),
      mobile_number:     gr.getValue('u_mobile_number'),
      first_name:        gr.getValue('u_first_name'),
      last_name:         gr.getValue('u_last_name'),
      external_company:  gr.getValue('u_external_company') === '1',
      company_name:      gr.getValue('u_company_name'),
      external_email:    gr.getValue('u_external_email'),
      internal_manager:  gr.getValue('u_internal_manager'),
      start_date:        gr.getValue('u_start_date'),
      end_date:          gr.getValue('u_end_date'),
      title:             gr.getValue('u_title'),
      job_role:          gr.getValue('u_job_role'),
      employment:        gr.getValue('u_employment'),
      active:            gr.getValue('u_active') === '1'
    };
  },

  type: 'MyUsersUtil'
});
