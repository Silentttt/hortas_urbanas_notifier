cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-autostart.AutoStart",
    "file": "plugins/cordova-plugin-autostart/www/auto-start.js",
    "pluginId": "cordova-plugin-autostart",
    "clobbers": [
      "cordova.plugins.autoStart"
    ]
  },
  {
    "id": "cordova-plugin-badge.Badge",
    "file": "plugins/cordova-plugin-badge/www/badge.js",
    "pluginId": "cordova-plugin-badge",
    "clobbers": [
      "cordova.plugins.notification.badge"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-facebook4.FacebookConnectPlugin",
    "file": "plugins/cordova-plugin-facebook4/www/facebook-native.js",
    "pluginId": "cordova-plugin-facebook4",
    "clobbers": [
      "facebookConnectPlugin"
    ]
  },
  {
    "id": "cordova-plugin-local-notification.LocalNotification",
    "file": "plugins/cordova-plugin-local-notification/www/local-notification.js",
    "pluginId": "cordova-plugin-local-notification",
    "clobbers": [
      "cordova.plugins.notification.local"
    ]
  },
  {
    "id": "cordova-plugin-local-notification.LocalNotification.Core",
    "file": "plugins/cordova-plugin-local-notification/www/local-notification-core.js",
    "pluginId": "cordova-plugin-local-notification",
    "clobbers": [
      "cordova.plugins.notification.local.core",
      "plugin.notification.local.core"
    ]
  },
  {
    "id": "cordova-plugin-local-notification.LocalNotification.Util",
    "file": "plugins/cordova-plugin-local-notification/www/local-notification-util.js",
    "pluginId": "cordova-plugin-local-notification",
    "merges": [
      "cordova.plugins.notification.local.core",
      "plugin.notification.local.core"
    ]
  },
  {
    "id": "cordova-plugin-network-information.network",
    "file": "plugins/cordova-plugin-network-information/www/network.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "navigator.connection",
      "navigator.network.connection"
    ]
  },
  {
    "id": "cordova-plugin-network-information.Connection",
    "file": "plugins/cordova-plugin-network-information/www/Connection.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "Connection"
    ]
  },
  {
    "id": "cordova-plugin-inappbrowser.inappbrowser",
    "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
    "pluginId": "cordova-plugin-inappbrowser",
    "clobbers": [
      "cordova.InAppBrowser.open",
      "window.open"
    ]
  },
  {
    "id": "cordova-plugin-restful.RESTful",
    "file": "plugins/cordova-plugin-restful/www/RESTful.js",
    "pluginId": "cordova-plugin-restful",
    "clobbers": [
      "cordova.plugins.RESTful"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-autostart": "2.3.0",
  "cordova-plugin-badge": "0.8.8",
  "cordova-plugin-device": "2.0.3",
  "cordova-plugin-facebook4": "6.4.0",
  "cordova-plugin-local-notification": "0.9.0-beta.2",
  "cordova-plugin-network-information": "2.0.2",
  "cordova-plugin-whitelist": "1.3.4",
  "cordova-plugin-inappbrowser": "3.2.0",
  "cordova-plugin-restful": "0.0.3"
};
// BOTTOM OF METADATA
});