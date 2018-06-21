/**
 * v-runtime-template v1.5.1
 * (c) 2018 Alex J <alexjovermorales@gmail.com>
 * @license MIT
 */

'use strict';

var getKeysFromOptions = function (options) { return Object.keys((options.data && options.data()) || {}).concat( Object.keys(options.props || {})
); };

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
    if (this.template) {
      var ref = this.$parent;
      var $data = ref.$data;
      var $props = ref.$props;
      var $options = ref.$options;

      var methodKeys = Object.keys($options.methods || {});
      var allKeys = getKeysFromOptions($options).concat(methodKeys);
      var methods = buildFromProps(this.$parent, methodKeys);
      var props = merge([$data, $props, methods]);

      var dynamic = {
        template: this.template || "<div></div>",
        props: allKeys,
        computed: $options.computed,
        components: $options.components
      };

      return h(dynamic, {
        props: props
      });
    }
  }
};

module.exports = index;
