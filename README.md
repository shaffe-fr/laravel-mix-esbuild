# Laravel Mix esbuild

**Laravel Mix extension to replace babel-loader with [esbuild](https://github.com/evanw/esbuild).**

This extension provides support for [esbuild-loader](https://github.com/privatenumber/esbuild-loader) in Laravel Mix.

* [Installation](https://github.com/shaffe-fr/laravel-mix-esbuild#installation)
* [Usage](https://github.com/shaffe-fr/laravel-mix-esbuild#usage)
* [Options](https://github.com/shaffe-fr/laravel-mix-esbuild#options)
* [Changelog](https://github.com/shaffe-fr/laravel-mix-esbuild#changelog)

## Installation

Install the extension:

```sh
npm install laravel-mix-esbuild --save-dev
```

Or if you prefer yarn:

```sh
yarn add laravel-mix-esbuild --dev
```

## Usage

Require the extension within your `webpack.mix.js` file:

```js
// webpack.mix.js
const mix = require('laravel-mix');

require('laravel-mix-esbuild');

mix
    .js('resources/js/app.js', 'public/js')
    .esbuild();
```

## Options

Full list of options available: [esbuild-loader](https://github.com/privatenumber/esbuild-loader).

#### Change target

To sets the target environment for the generated JavaScript code, pass one of the [possible value](https://esbuild.github.io/api/#target) to the `target` option.
Default target is `es2015`.

```js
mix.js('resources/js/app.js', 'public/js')
    .esbuild({
        target: 'esnext'
    });
```

#### Use with JSX

If you're using JSX, use the following options:

```js
mix.js('resources/js/app.js', 'public/js')
    .esbuild({
        loader: 'jsx'
    });
```

#### Use with TypeScript & JSX

If you're using JSX, use the following options:

```js
mix.js('resources/js/app.js', 'public/js')
    .esbuild({
        loader: 'tsx',  // Or 'ts' if you don't need tsx
    });
```

If you have a `tsconfig.json` file, esbuild-loader will automatically detect it.

Alternatively, you can also pass it in directly via the `tsconfigRaw` option:


```js
mix.js('resources/js/app.js', 'public/js')
    .esbuild({
        loader: 'ts',
        tsconfigRaw: require('./tsconfig.json')
    });
```

⚠️ esbuild only supports a subset of `tsconfig` options, see [esbuild-loader](https://github.com/privatenumber/esbuild-loader#typescript--tsx) for more information.

#### Use with Vue

The way esbuild-loader is built doesn't allow the support of Vue.

## License

Laravel Mix esbuild is provided under the [MIT License](LICENSE.md).