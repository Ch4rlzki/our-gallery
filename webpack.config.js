const path = require("path");

module.exports = {
    mode: "development",
    entry: "./webpack/main.js",
    output: {
        path: path.resolve(__dirname, 'assets', 'js'),
        filename: "main.js"
    },
    watch: true
}