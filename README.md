# v-runtime-template

[![npm](https://img.shields.io/npm/v/v-runtime-template.svg)](https://www.npmjs.com/package/v-runtime-template)

A Vue.js components that makes easy compiling and interpreting a Vue.js template at runtime. Does this sound confusing? See the _[Why v-runtime-template?](#why-v-runtime-template)_ section.

**[See Demo on CodeSandbox](https://codesandbox.io/s/884v9kq790)**

## Motivation

## Getting Started

Install it:

```
npm install v-runtime-template
```

You must **use the with-compiler Vue.js version**. This is needed in order to compile on-the-fly Vue.js templates. For that, you can set a webpack alias for `vue` to the `vue/dist/vue.common` file.

For example, if you use the [Vue CLI](https://github.com/vuejs/vue-cli), create or modify the `vue.config.js` file adding the following alias:

```js
// vue.config.js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.common",
      },
    },
  },
};
```

And in [Nuxt](http://nuxtjs.org/), open the `nuxt.config.js` file and extend the webpack config by adding the following line to the `extend` key:

```js
// nuxt.config.js
{
  build: {
    extend(config, { isDev, isClient }) {
      config.resolve.alias["vue"] = "vue/dist/vue.common";
      // ...
```

## Usage

You just need to import the `v-runtime-template` component, and pass the template you want:

```html
<template>
	<div>
		<v-runtime-template :template="template"></v-runtime-template>
	</div>
</template>

<script>
import VRuntimeTemplate from "./v-runtime-template";
import AppMessage from "./AppMessage";

export default {
  data: () => ({
    name: "Mellow",
    template: `
      <app-message>Hello {{ name }}!</app-message>
    `
  }),
  components: {
    AppMessage,
    VRuntimeTemplate
  }
};
</script>
```

The template you pass **have access to the parent component instance**. For example, in the last example we're using the `AppMessage` component and accessing the `{{ name }}` state variable.

But you can access computed properties and methods as well from the template:

```js
export default {
  data: () => ({
    name: "Mellow",
    template: `
      <div>
        <app-message>Hello {{ name }}!</app-message>
        <button @click="sayHi">Say Hi!</button>
        <p>{{ someComputed }}</p>
      </div>
		`,
  }),
  computed: {
    someComputed() {
      return "Wow, I'm computed";
    },
  },
  methods: {
    sayHi() {
      console.log("Hi");
    },
  },
};
```

## Why v-runtime-template

Most of times we can precompile all our components and structure at build time.

Sometimes, you might need to get HTML at runtime (for example, coming from an API). For those cases the `[v-html](https://vuejs.org/v2/api/#v-html)` directive works really well.

But, if you need to get Vue template code at runtime, using `v-html` for specific template Vue code will not be interpreted. This is where `v-runtime-template` comes into play.

Some cases you need to do that:

* In front offices or store fronts, where you allow the user to enter data that later you transform into Vue specific code.
* In WYSIWYG visual editors. As a user, think of an interface where you drag and drop components to build something visual. That gets stored as Vue template code in the database and you eventually will receive it in the frontend.
* Basically, anything coming from a user that can contain Vue code.

Let's see an example: this would work with `v-html`:

```html
<template>
	<div v-html="template"></div>
</template>

<script>
export default {
  data: () => ({
    template: `
      <a href="/mike-page">Go to Mike page</a>
    `
```

But the following example doesn't, since we're using a custom component. For that we need `v-runtime-template`:

```html
<template>
	<v-runtime-template :template="template"></v-runtime-template>
</template>

<script>
export default {
  data: () => ({
    template: `
      <router-link to="mike-page">Go to Mike page</router-link>
    `
```
