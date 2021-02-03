module.exports = {
    presets: [
        [
            "@vue/cli-plugin-babel/preset", 
            {
                "useBuiltIns": "entry",
                "corejs": 3
            }
        ]
    ],
    plugins: [
        [
            "@babel/plugin-transform-runtime",
            { "corejs": 3 }
        ],
        [
            "import", 
            {
                "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": true
            }
        ]
    ]
}
