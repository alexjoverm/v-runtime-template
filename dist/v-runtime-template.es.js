/**
 * v-runtime-template v1.6.0
 * (c) 2018 Alex J <alexjovermorales@gmail.com>
 * @license MIT
 */

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
      var $data = ref.$data;
      var $props = ref.$props;
      var $options = ref.$options;
      var components = $options.components;
      var computed = $options.computed;
      var methods = $options.methods;

      var passthrough = {$data:{}, $props:{}, $options:{}, components:{}, computed:{}, methods:{}};

      //build new objects by removing keys if already exists (e.g. created by mixins)
      Object.keys($data).forEach(function (e) {if(typeof this$1.$data[e]==="undefined") { passthrough.$data[e] = $data[e]; }} );
      Object.keys($props).forEach(function (e) {if(typeof this$1.$props[e]==="undefined") { passthrough.$props[e] = $props[e]; }} );
      Object.keys(methods).forEach(function (e) {if(typeof this$1.$parent[e]==="undefined") { passthrough.methods[e] = methods[e]; }} );
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
        computed: passthrough.computed,
        components: passthrough.components
      };

      return h(dynamic, {
        props: props
      });
    }
  }
};

export default index;
