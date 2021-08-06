const { CommonOptions } = require("esbuild");
const { ProvidePlugin, WebpackOptionsNormalized } = require("webpack");
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
        return ["esbuild-loader", ...(this.preset()?.dependencies || [])];
    }

    /**
     * Set extension options
     * @param {string} preset
     * @param {CommonOptions} options
     * @returns {void}
     */
    register(preset, options) {
        this.presetName = preset;
        this.options = options || {};
    }

    /**
     * Replace babel-loader by esbuild
     * @param {WebpackOptionsNormalized} webpackConfig
     * @returns {void}
     */
    webpackConfig(webpackConfig) {
        const preset = this.preset();

        // Remove babel-loader and ts-loader
        this.removeLoader(webpackConfig, "babel-loader");

        if (preset?.removeTsLoader) {
            this.removeLoader(webpackConfig, "ts-loader");
        }

        if (preset?.plugins) {
            let plugins = preset.plugins;
            if (typeof plugins == "function") {
                plugins = plugins();
            }
            plugins.forEach((plugin) => webpackConfig.plugins.push(plugin));
        }

        // Add esbuild
        webpackConfig.module.rules.push({
            test: /\.(cjs|mjs|jsx?|tsx?)$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                {
                    loader: "esbuild-loader",
                    options: Object.assign(
                        { target: "es2015" },
                        preset?.options || {},
                        this.options
                    ),
                },
            ],
        });
    }

    /**
     * @param {WebpackOptionsNormalized} webpackConfig
     * @param {string} loaderName
     * @returns {void}
     */
    removeLoader(webpackConfig, loaderName) {
        webpackConfig.module.rules = webpackConfig.module.rules.filter(
            (rule) =>
                !rule.use?.find((use) => use?.loader.indexOf(loaderName) !== -1)
        );
    }

    /**
     * @returns {?object}
     */
    preset() {
        return this.presets()[this.presetName] || null;
    }

    /**
     *
     * @returns {object}
     */
    presets() {
        return {
            jsx: {
                options: {
                    loader: "jsx",
                },
            },
            react: {
                dependencies: ["html-webpack-plugin"],
                options: {
                    loader: "jsx",
                },
                plugins: () => [
                    new (require("html-webpack-plugin"))(),
                    new ProvidePlugin({
                        React: "react",
                    }),
                ],
            },
            "react-tsx": {
                dependencies: ["html-webpack-plugin"],
                removeTsLoader: true,
                options: {
                    loader: "tsx",
                },
                plugins: () => [
                    new (require("html-webpack-plugin"))(),
                    new ProvidePlugin({
                        React: "react",
                    }),
                ],
            },
            ts: {
                removeTsLoader: true,
                options: {
                    loader: "ts",
                },
            },
            tsx: {
                removeTsLoader: true,
                options: {
                    loader: "tsx",
                },
            },
        };
    }
}

mix.extend("esbuild", new Esbuild());
