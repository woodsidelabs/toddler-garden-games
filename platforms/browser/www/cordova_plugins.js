cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-neutts/www/tts.js",
        "id": "cordova-plugin-neutts.tts",
        "pluginId": "cordova-plugin-neutts",
        "clobbers": [
            "TTS"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-neutts": "1.0.0"
}
// BOTTOM OF METADATA
});