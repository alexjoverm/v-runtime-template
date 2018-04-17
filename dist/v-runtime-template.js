/**
 * v-runtime-template v1.0.0
 * (c) 2018 Alex J <alexjovermorales@gmail.com>
 * @license MIT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VRuntimeTemplate = factory());
}(this, (function () { 'use strict';

var index = {
  props: {
    template: String,
    options: {
      type: Object,
      default: function () { return ({}); },
    },
  },
  computed: {
    dynamic: function dynamic() {
      var ref = this.options;
      var props = ref.props;
      var data = ref.data;
      var methods = ref.methods;
      var computed = ref.computed;
      return { template: this.template, props: props, data: data, methods: methods, computed: computed };
    },
  },
  render: function render(h) {
    return h(this.dynamic);
  },
};

return index;

})));
