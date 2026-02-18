(function () {
  'use strict';

  // Embed child widgets so they can be rendered via <sp-widget>
  data.createWidget = $sp.getWidget('widget-create-user', {});
  data.manageWidget = $sp.getWidget('widget-manage-user', {});
})();
