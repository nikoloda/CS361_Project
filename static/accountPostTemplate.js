(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['accountPost'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"post\" data-firstName=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"firstName") || (depth0 != null ? lookupProperty(depth0,"firstName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstName","hash":{},"data":data,"loc":{"start":{"line":1,"column":34},"end":{"line":1,"column":47}}}) : helper)))
    + "\" data-lastName=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"lastName") || (depth0 != null ? lookupProperty(depth0,"lastName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastName","hash":{},"data":data,"loc":{"start":{"line":1,"column":64},"end":{"line":1,"column":76}}}) : helper)))
    + "\">\r\n    <div class=\"post-contents\">\r\n    <div class=\"post-image-container\">\r\n        <a href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"password") || (depth0 != null ? lookupProperty(depth0,"password") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"password","hash":{},"data":data,"loc":{"start":{"line":4,"column":17},"end":{"line":4,"column":29}}}) : helper)))
    + "\"><img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"confirmPassword") || (depth0 != null ? lookupProperty(depth0,"confirmPassword") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"confirmPassword","hash":{},"data":data,"loc":{"start":{"line":4,"column":41},"end":{"line":4,"column":60}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"firstName") || (depth0 != null ? lookupProperty(depth0,"firstName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstName","hash":{},"data":data,"loc":{"start":{"line":4,"column":67},"end":{"line":4,"column":80}}}) : helper)))
    + "\"></a>\r\n    </div>\r\n    <div class=\"post-info-container\">\r\n        <a href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"password") || (depth0 != null ? lookupProperty(depth0,"password") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"password","hash":{},"data":data,"loc":{"start":{"line":7,"column":17},"end":{"line":7,"column":29}}}) : helper)))
    + "\" class=\"post-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"firstName") || (depth0 != null ? lookupProperty(depth0,"firstName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstName","hash":{},"data":data,"loc":{"start":{"line":7,"column":50},"end":{"line":7,"column":63}}}) : helper)))
    + "</a> <button type=\"button\" id=\"myButton\" class=\"action-button\">Show lastName</button>\r\n    </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n    <div id=\"myPopup\" class=\"popup\">\r\n        <div class=\"popup-content\">\r\n            <a class =\"post-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"lastName") || (depth0 != null ? lookupProperty(depth0,"lastName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastName","hash":{},"data":data,"loc":{"start":{"line":15,"column":35},"end":{"line":15,"column":47}}}) : helper)))
    + "</a>\r\n            <button id=\"closePopup\">\r\n                  Close\r\n              </button>\r\n        </div>\r\n    </div>";
},"useData":true});
})();