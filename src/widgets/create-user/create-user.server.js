(function () {
  'use strict';

  var util = new MyUsersUtil();

  // ── Provide constants to the client ────────────────────────
  data.countryCodes = util.COUNTRY_CODES;
  data.jobRoles     = util.JOB_ROLES;
  data.companies    = util.COMPANIES;
  data.managers     = util.MANAGERS;

  // Max end date: 1 year from today
  var maxDate = new GlideDateTime();
  maxDate.addYearsUTC(1);
  data.maxEndDate = maxDate.getValue().split(' ')[0]; // yyyy-MM-dd

  // ── Handle client POST actions ─────────────────────────────
  if (input && input.action === 'create') {
    var formData = input.formData || {};
    var sysId = util.createUser(formData);
    data.success = !!sysId;
    if (!sysId) {
      data.error = 'Failed to insert user record.';
    }
  }
})();
