(function () {
  'use strict';

  var c = this;

  // ── Data from server script ────────────────────────────────
  c.users           = data.users || [];
  c.employmentTypes = data.employmentTypes;

  // ── State ──────────────────────────────────────────────────
  c.search        = '';
  c.filteredUsers = [];
  c.selectedUser  = null;
  c.editForm      = null;
  c.deactivated   = false;
  c.saved         = false;

  // ── Search ─────────────────────────────────────────────────
  c.onSearchChange = function () {
    c.selectedUser = null;
    c.editForm = null;

    if (!c.search) {
      c.filteredUsers = [];
      return;
    }
    var term = c.search.toLowerCase();
    c.filteredUsers = c.users.filter(function (u) {
      var fullName = (u.first_name + ' ' + u.last_name).toLowerCase();
      return fullName.indexOf(term) !== -1;
    });
  };

  // ── Select user ────────────────────────────────────────────
  c.selectUser = function (user) {
    c.selectedUser = user;
    c.editForm = angular.copy(user);
    c.deactivated = !user.active;
  };

  c.clearSelection = function () {
    c.selectedUser = null;
    c.editForm = null;
    c.search = '';
    c.filteredUsers = [];
  };

  // ── Save ───────────────────────────────────────────────────
  c.handleSave = function () {
    c.server.get({
      action:  'update',
      sys_id:  c.selectedUser.sys_id,
      updates: c.editForm
    }).then(function (response) {
      if (response.data.success) {
        // Refresh the local users list
        c.users = response.data.users || c.users;
        c.saved = true;

        setTimeout(function () {
          c.saved = false;
          c.$apply();
        }, 3000);
      }
    });
  };
})();
