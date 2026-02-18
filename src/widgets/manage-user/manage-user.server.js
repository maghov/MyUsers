(function () {
  'use strict';

  var util = new MyUsersUtil();

  // ── Provide data to the client ─────────────────────────────
  data.users           = util.getUsers();
  data.employmentTypes = util.EMPLOYMENT_TYPES;

  // ── Handle client POST actions ─────────────────────────────
  if (input && input.action === 'update') {
    var sysId   = input.sys_id;
    var updates = input.updates || {};

    data.success = util.updateUser(sysId, {
      first_name:     updates.first_name,
      last_name:      updates.last_name,
      external_email: updates.external_email,
      employment:     updates.employment,
      active:         updates.active
    });

    // Return refreshed user list
    data.users = util.getUsers();
  }
})();
