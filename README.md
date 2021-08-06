# Laravel Mix esbuild

**Laravel Mix extension to replace babel-loader with [esbuild](https://github.com/evanw/esbuild).**

This extension provides support for [esbuild-loader](https://github.com/privatenumber/esbuild-loader) in Laravel Mix.

* [Installation](https://github.com/shaffe-fr/laravel-mix-esbuild#installation)
* [Usage](https://github.com/shaffe-fr/laravel-mix-esbuild#usage)
* [Presets](https://github.com/shaffe-fr/laravel-mix-esbuild#presets)
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

## Presets

#### Use with React

If you're using react, use the following preset:

```js
mix.js('resources/js/app.js', 'public/js')
    .esbuild('react');
```

⚠️ The `react` and `react-tsx` presets might require you to add `acorn` to your dependencies: 

```sh
npm install acorn --save-dev
```

Or if you prefer yarn:

```sh
yarn add acorn --dev
```

#### Use with TypeScript

If you're using Typescript you can use the `ts` or `tsx` presets:

```js
mix.js('resources/js/app.js', 'public/js')
    .esbuild('ts'); // or tsx
```

Your `tsconfig.json` should include the following entries:

```jsonc
{
	"compilerOptions": {
		// Highly recommended TS configurations to match behavior with esbuild
		// https://esbuild.github.io/content-types/#typescript
		"isolatedModules": true,
		"esModuleInterop": true
	}
}
```

If you have a `tsconfig.json` file, esbuild-loader will automatically detect it.

Alternatively, you can also pass it in directly via the `tsconfigRaw` option:

```js
mix.js('resources/js/app.js', 'public/js')
    .esbuild('ts', {
        tsconfigRaw: require('./tsconfig.json')
    });
```

⚠️ esbuild only supports a subset of `tsconfig` options, see [esbuild-loader](https://github.com/privatenumber/esbuild-loader#typescript--tsx) for more information.

#### Use with React and Typescript

If you're using react with Typescript, use the following preset:

```js
mix.js('resources/js/app.js', 'public/js')
    .esbuild('react-tsx');
```

⚠ You should configure your `tsconfig.json` file like mentionned [above](https://github.com/shaffe-fr/laravel-mix-esbuild#use-with-typescript).

#### JSX without React

If you're using JSX without React, use the `jsx` preset:

```js
mix.js('resources/js/app.js', 'public/js')
    .esbuild('jsx');
```

Here is a JSX without React example: https://betterprogramming.pub/how-to-use-jsx-without-react-21d23346e5dc.

#### Use with Vue

It seems that the way esbuild-loader is built doesn't allow the support of Vue.
Vue might work if `.vue` Single File Component are not used.

## Options

You can pass custom options to the extension using the second argument.
Full list of options available: [esbuild-loader](https://github.com/privatenumber/esbuild-loader).

#### Change target

To sets the target environment for the generated JavaScript code, pass one of the [possible value](https://esbuild.github.io/api/#target) to the `target` option.
Default target is `es2015`.

```js
mix.js('resources/js/app.js', 'public/js')
    .esbuild(null, {
        target: 'esnext'
    });
```

## License

Laravel Mix esbuild is provided under the [MIT License](LICENSE.md).