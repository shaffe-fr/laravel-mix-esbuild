const mix = require("laravel-mix");

class Esbuild {
    /**
     * Get an extension name
     * @returns {string}
     */
    name() {
        return "esbuild";
    }

    /**
     * Get dependencies
     * @returns {array[]}
     */
    dependencies() {
        this.requiresReload = `
            esbuild-loader has now been installed. Please run "npm run dev" again.
        `;

        return ["esbuild-loader"];
    }

    /**
     * Set esbuild options
     * @param {esbuild.CommonOptions} options
     * @returns {void}
     */
    register(options) {
        this.options = Object.assign({ target: "es2015" }, options || {});
    }

    /**
     * Replace babel-loader by esbuild
     * @param {webpack.WebpackOptionsNormalized} webpackConfig
     * @returns {void}
     */
    webpackConfig(webpackConfig) {
        // Remove babel-loader and ts-loader
        webpackConfig.module.rules = webpackConfig.module.rules.filter(
            (rule) =>
                !rule.use?.find(
                    (loader) =>
                        loader?.loader.indexOf("babel-loader") !== -1 ||
                        loader?.loader.indexOf("ts-loader") !== -1
                )
        );

        // Add esbuild
        webpackConfig.module.rules.push({
            test: /\.(cjs|mjs|jsx?|tsx?)$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                {
                    loader: "esbuild-loader",
                    options: this.options,
                },
            ],
        });
    }
}

mix.extend("esbuild", new Esbuild());
