/**
 * v-runtime-template v1.6.2
 * (c) 2019 Alex J <alexjovermorales@gmail.com>
 * @license MIT
 */

'use strict';

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
    template: String
  },
  render: function render(h) {
    var this$1 = this;

    if (this.template) {
      var ref = this.$parent;
      var $data = ref.$data; if ( $data === void 0 ) $data = {};
      var $props = ref.$props; if ( $props === void 0 ) $props = {};
      var $options = ref.$options; if ( $options === void 0 ) $options = {};
      var components = $options.components; if ( components === void 0 ) components = {};
      var computed = $options.computed; if ( computed === void 0 ) computed = {};
      var methods = $options.methods; if ( methods === void 0 ) methods = {};

      var passthrough = {$data:{}, $props:{}, $options:{}, components:{}, computed:{}, methods:{}};

      //build new objects by removing keys if already exists (e.g. created by mixins)
      Object.keys($data).forEach(function (e) {if(typeof this$1.$data[e]==="undefined") { passthrough.$data[e] = $data[e]; }} );
      Object.keys($props).forEach(function (e) {if(typeof this$1.$props[e]==="undefined") { passthrough.$props[e] = $props[e]; }} );
      Object.keys(methods).forEach(function (e) {if(!this$1.$options.methods || typeof this$1.$options.methods[e]==="undefined") { passthrough.methods[e] = methods[e]; }} );
      Object.keys(computed).forEach(function (e) {if(!this$1.$options.computed || typeof this$1.$options.computed[e]==="undefined") { passthrough.computed[e] = computed[e]; }} );
      Object.keys(components).forEach(function (e) {if(!this$1.$options.components || typeof this$1.$options.components[e]==="undefined") { passthrough.components[e] = components[e]; }} );

      var methodKeys = Object.keys(passthrough.methods || {});
      var dataKeys = Object.keys(passthrough.$data || {});
      var propKeys = Object.keys(passthrough.$props || {});
      var allKeys = dataKeys.concat(propKeys).concat(methodKeys);
      var methodsFromProps = buildFromProps(this.$parent, methodKeys);
      var props = merge([passthrough.$data, passthrough.$props, methodsFromProps]);

      var dynamic = {
        template: this.template || "<div></div>",
        props: allKeys,
        computed: passthrough.computed,
        components: passthrough.components
      };

      return h(dynamic, {
        props: props
      });
    }
  }
};

module.exports = index;
