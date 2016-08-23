﻿// Generated by IcedCoffeeScript 108.0.9
(function() {
  var TileNotification, TileTemplateType, TileUpdateManager, createFromTemplate;

  TileUpdateManager = Windows.UI.Notifications.TileUpdateManager;

  TileTemplateType = Windows.UI.Notifications.TileTemplateType;

  TileNotification = Windows.UI.Notifications.TileNotification;


  /*
  Can be called with createWithTemplate(templateName, text1: "First Text element", image1: "src")
  - or -
  createWithTemplate(templateName,
  text1: "First Text element"
  image1:
      src: "src"
      alt: "alt text")
   */

  createFromTemplate = function(id, templateName) {
    var binding, bindings, index, templateType, tileId, tileXml, value, _i, _len;
    templateName = templateName.charAt(0).toLowerCase() + templateName.slice(1);
    if (!(templateType = TileTemplateType[templateName])) {
      throw new WinJS.ErrorFromName("TileNotificationError", "The template " + templateName + " was not found");
    }
    tileXml = TileUpdateManager.getTemplateContent(templateType);
    tileId = id;
    if (arguments.length > 2) {
      bindings = tileXml.selectSingleNode("tile/visual/binding").childNodes;
      if (typeof arguments[2] === "string") {
        for (index = _i = 0, _len = bindings.length; _i < _len; index = ++_i) {
          binding = bindings[index];
          if (!(index < arguments.length - 2)) {
            continue;
          }
          value = arguments[2 + index].replace(/\r?\n|\r/g, "");
          if (binding.nodeName === "text") {
            binding.innerText = value;
          } else if (binding.nodeName === "image") {
            binding.setAttribute("src", value);
            binding.setAttribute("alt", "Image");
          }
        }
      }
    }
    return {
      branding: function(type) {
        tileXml.selectSingleNode("tile/visual").setAttribute("branding", type);
        return this;
      },
      text: function(index, text) {
        var _ref;
        if ((_ref = tileXml.selectSingleNode("text[" + index + "]")) != null) {
          _ref.innerText = text;
        }
        return this;
      },
      updateSecondaryTile: function() {
        var tileNotification, updater;
        tileNotification = new TileNotification(tileXml);
        updater = TileUpdateManager.createTileUpdaterForSecondaryTile(tileId);
        return updater.update(tileNotification);
      }
    };
  };

  WinJS.Namespace.define("TileNotification", {
    createFromTemplate: createFromTemplate
  });

}).call(this);
