/**
 * v-runtime-template v1.6.0
 * (c) 2018 Alex J <alexjovermorales@gmail.com>
 * @license MIT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VRuntimeTemplate = factory());
}(this, (function () { 'use strict';

var defineDescriptor = function (src, dest, name) {
  if (!dest.hasOwnProperty(name)) {
    var descriptor = Object.getOwnPropertyDescriptor(src, name);
    Object.defineProperty(dest, name, descriptor);
  }
};

var merge = function (objs) {
  var res = {};
  objs.forEach(function (obj) {
    obj &&
      Object.getOwnPropertyNames(obj).forEach(function (name) { return defineDescriptor(obj, res, name); }
      );
  });
  return res;
};

var buildFromProps = function (obj, props) {
  var res = {};
  props.forEach(function (prop) { return defineDescriptor(obj, res, prop); });
  return res;
};

var index = {
  props: {
    template: String,
    created: Function,
    mounted: Function,
    destroyed: Function
  },
  render: function render(h) {
    var this$1 = this;
    this$1.$options.methods = this$1.$options.methods || {};
    this$1.$options.computed = this$1.$options.computed || {};
    this$1.$options.components = this$1.$options.components || {};

    if (this.template) {
      var ref = this.$parent;
      var $data = ref.$data || {};
      var $props = ref.$props || {};
      var $options = ref.$options;
      var components = $options.components || {};
      var computed = $options.computed || {};
      var methods = $options.methods || {};

      var passthrough = {$data:{}, $props:{}, $options:{}, components:{}, computed:{}, methods:{}};

      //build new objects by removing keys if already exists (e.g. created by mixins)
      Object.keys($data).forEach(function (e) {if(typeof this$1.$data[e]==="undefined") { passthrough.$data[e] = $data[e]; }} );
      Object.keys($props).forEach(function (e) {if(typeof this$1.$props[e]==="undefined") { passthrough.$props[e] = $props[e]; }} );
      Object.keys(methods).forEach(function (e) {if(typeof this$1.$options.methods[e]==="undefined") { passthrough.methods[e] = methods[e]; }} );
      Object.keys(computed).forEach(function (e) {if(typeof this$1.$options.computed[e]==="undefined") { passthrough.computed[e] = computed[e]; }} );
      Object.keys(components).forEach(function (e) {if(typeof this$1.$options.components[e]==="undefined") { passthrough.components[e] = components[e]; }} );

      var methodKeys = Object.keys(passthrough.methods || {});
      var dataKeys = Object.keys(passthrough.$data || {});
      var propKeys = Object.keys(passthrough.$props || {});
      var allKeys = dataKeys.concat(propKeys).concat(methodKeys);
      var methodsFromProps = buildFromProps(this.$parent, methodKeys);
      var props = merge([passthrough.$data, passthrough.$props, methodsFromProps]);

      var dynamic = {
        template: this.template || "<div></div>",
        props: allKeys,
        created: this.created || function() {},
        mounted: this.mounted || function() {},
        destroyed: this.destroyed || function() {},
        computed: passthrough.computed,
        components: passthrough.components
      };

      return h(dynamic, {
        props: props
      });
    }
  }
};

return index;

})));
