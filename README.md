# vue3-runtime-template

[![npm](https://img.shields.io/npm/v/vue3-runtime-template.svg)](https://www.npmjs.com/package/vue3-runtime-template)

[![npm](https://img.shields.io/npm/dm/vue3-runtime-template.svg)](https://www.npmjs.com/package/vue3-runtime-template)

A Vue.js components that makes easy compiling and interpreting a Vue.js template at runtime by using a `v-html` like API.

vue3-runtime-template is based off v-runtime-template but tweaked to work with Vue 3.

## Motivation

This library solves the case where you get a vue-syntax template string on runtime, usually from a server. Think of a feature where you allow the user to create their own interfaces and structures. You save that as a vue template in your database, which your UI will request later. While components are pre-compiled at build time, this case isn't (since the template is received at runtime) and needs to be compiled at runtime.

vue3-runtime-template compiles that template and attaches it to the scope of the component that uses it, so it has access to its data, props, methods and computed properties.

Think of it as the `v-html` equivalent that also understands vue template syntax (while `v-html` is just for plain HTML).

## Getting Started

Install it:

```
npm install vue3-runtime-template
```

You must **use the with-compiler Vue.js version**. This is needed in order to compile on-the-fly Vue.js templates. For that, you can set a webpack alias for `vue` to the correct file.

For example, if you use the [Vue CLI](https://github.com/vuejs/vue-cli), create or modify the `vue.config.js` file adding the following alias:

```js
// vue.config.js
module.exports = {
    configureWebpack: {
      resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm-bundler.js',
      // ...
```

In [Nuxt v2](http://nuxtjs.org/), open the `nuxt.config.js` file and extend the webpack config by adding the following line to the `extend` key:

```js
// nuxt.config.js
{
  build: {
    extend(config, { isDev, isClient }) {
      config.resolve.alias["vue"] = "vue.esm-bundler.js";
      // ...
```

In [Nuxt v3](https://v3.nuxtjs.org/), open the `nuxt.config.js` file and extend the vite config by adding the following hook, just on client:

```js
// nuxt.config.js
{
 (...)

 hooks: {
      'vite:extendConfig': (config, { isClient, isServer }) => {
        if (isClient) {
          config.resolve.alias.vue = 'vue/dist/vue.esm-bundler'
        }
      },
    },

  (...)
```

You can read about different bundles of Vue in the official [help guides](https://v3.vuejs.org/guide/installation.html#with-a-bundler).
## Usage

You just need to import the `vue3-runtime-template` component, and pass the template you want:

```html
<template>
	<div>
		<v-runtime-template :template="template"></v-runtime-template>
	</div>
</template>

<script>
import VRuntimeTemplate from "vue3-runtime-template";
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

## Limitations

Keep in mind that the template can only access the instance properties of the component who is using it.

## Comparison

### vue3-runtime-template VS v-html

_TL;DR: If you need to interpret only HTML, use `v-html`. Use this library otherwise._

They both have the same goal: to interpret and attach a piece of structure to a scope at runtime. The difference is, `[v-html](https://vuejs.org/v2/api/#v-html)` doesn't understand vue template syntax, but only HTML. So, while this code works:

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

the following wouldn't since it uses the custom `router-link` component:

```html
<router-link to="mike-page">Go to Mike page</router-link>
```

But you can use vue3-runtime-template, which uses basically the same API than v-html:

```html
<template>
	<vue3-runtime-template :template="template"></vue3-runtime-template>
</template>

<script>
export default {
  data: () => ({
    template: `
      <router-link to="mike-page">Go to Mike page</router-link>
    `
```

### vue3-runtime-template VS dynamic components (`<component>`)

Dynamic components have somewhat different goal: to render a component dynamically by binding it to the `is` prop. Although, these components are usually pre-compiled. However, the goal of vue3-runtime-template can be achieved just by using the component options object form of dynamic components.

In fact, vue3-runtime-template uses that under the hood (in the render function form) along with other common tasks to achieve its goal.
