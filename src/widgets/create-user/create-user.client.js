(function () {
  'use strict';

  var c = this;

  // ── Data from server script ────────────────────────────────
  c.countryCodes = data.countryCodes;
  c.jobRoles     = data.jobRoles;
  c.companies    = data.companies;
  c.managers     = data.managers;
  c.maxEndDate   = data.maxEndDate;

  // ── Form model ─────────────────────────────────────────────
  var blankForm = {
    country_code:     '+47',
    mobile_number:    '',
    first_name:       '',
    last_name:        '',
    external_company: false,
    company_name:     '',
    external_email:   '',
    internal_manager: '',
    start_date:       '',
    end_date:         '',
    title:            '',
    job_role:         ''
  };

  c.form = angular.copy(blankForm);
  c.submitted = false;
  c.error = '';

  // ── Company reference field ────────────────────────────────
  c.companySearch = '';
  c.companyOpen   = false;

  c.filteredCompanies = function () {
    if (!c.companySearch) return c.companies;
    var term = c.companySearch.toLowerCase();
    return c.companies.filter(function (name) {
      return name.toLowerCase().indexOf(term) !== -1;
    });
  };

  c.selectCompany = function (name) {
    c.form.external_company = true;
    c.form.company_name = name;
    c.companySearch = name;
    c.companyOpen = false;
  };

  c.clearCompany = function () {
    c.form.external_company = false;
    c.form.company_name = '';
    c.companySearch = '';
  };

  c.closeCompanyDelayed = function () {
    setTimeout(function () {
      c.companyOpen = false;
      c.$apply();
    }, 150);
  };

  // ── Manager reference field ────────────────────────────────
  c.managerSearch = '';
  c.managerOpen   = false;

  c.filteredManagers = function () {
    if (!c.managerSearch) return c.managers;
    var term = c.managerSearch.toLowerCase();
    return c.managers.filter(function (name) {
      return name.toLowerCase().indexOf(term) !== -1;
    });
  };

  c.selectManager = function (name) {
    c.form.internal_manager = name;
    c.managerSearch = name;
    c.managerOpen = false;
  };

  c.clearManager = function () {
    c.form.internal_manager = '';
    c.managerSearch = '';
  };

  c.closeManagerDelayed = function () {
    setTimeout(function () {
      c.managerOpen = false;
      c.$apply();
    }, 150);
  };

  // ── Submit ─────────────────────────────────────────────────
  c.handleSubmit = function () {
    c.error = '';

    // End-date validation: max 1 year from today
    if (c.form.end_date) {
      var maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 1);
      if (new Date(c.form.end_date) > maxDate) {
        c.error = 'End date cannot be more than 1 year in the future.';
        return;
      }
    }

    // POST to server script
    c.server.get({ action: 'create', formData: c.form }).then(function (response) {
      if (response.data.success) {
        c.submitted = true;
        c.form = angular.copy(blankForm);
        c.companySearch = '';
        c.managerSearch = '';

        setTimeout(function () {
          c.submitted = false;
          c.$apply();
        }, 3000);
      } else {
        c.error = response.data.error || 'Failed to create user.';
      }
    });
  };
})();
