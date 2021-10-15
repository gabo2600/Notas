module.exports = {
    entry: "./src/client/index.js",
    output: {
        filename: "bundle.js",
        path: __dirname + "/src/client/public"
    },
    mode: "production",
    module: {
        rules: [{
                test: /\.js/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.svg/,
                use: ['svg-url-loader']
            }
        ]
    }
}