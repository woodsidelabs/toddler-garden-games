cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-neutts.tts",
      "file": "plugins/cordova-plugin-neutts/www/tts.js",
      "pluginId": "cordova-plugin-neutts",
      "clobbers": [
        "TTS"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-neutts": "1.0.0"
  };
});