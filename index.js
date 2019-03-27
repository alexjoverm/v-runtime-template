const defineDescriptor = (src, dest, name) => {
  if (!dest.hasOwnProperty(name)) {
    const descriptor = Object.getOwnPropertyDescriptor(src, name);
    Object.defineProperty(dest, name, descriptor);
  }
};

const merge = objs => {
  const res = {};
  objs.forEach(obj => {
    obj &&
      Object.getOwnPropertyNames(obj).forEach(name =>
        defineDescriptor(obj, res, name)
      );
  });
  return res;
};

const buildFromProps = (obj, props) => {
  const res = {};
  props.forEach(prop => defineDescriptor(obj, res, prop));
  return res;
};

export default {
  props: {
    template: String,
    created: Function,
    mounted: Function,
    destroyed: Function
  },
  render(h) {
    if (this.template) {
      const { $data = {}, $props = {}, $options = {} } = this.$parent;
      const { components = {}, computed = {}, methods = {} } = $options;

      let passthrough = {$data:{}, $props:{}, $options:{}, components:{}, computed:{}, methods:{}};

      //build new objects by removing keys if already exists (e.g. created by mixins)
      Object.keys($data).forEach(e => {if(typeof this.$data[e]==="undefined") passthrough.$data[e] = $data[e];} );
      Object.keys($props).forEach(e => {if(typeof this.$props[e]==="undefined") passthrough.$props[e] = $props[e];} );
      Object.keys(methods).forEach(e => {if(typeof this.$options.methods[e]==="undefined") passthrough.methods[e] = methods[e];} );
      Object.keys(computed).forEach(e => {if(typeof this.$options.computed[e]==="undefined") passthrough.computed[e] = computed[e];} );
      Object.keys(components).forEach(e => {if(typeof this.$options.components[e]==="undefined") passthrough.components[e] = components[e];} );

      const methodKeys = Object.keys(passthrough.methods || {});
      const dataKeys = Object.keys(passthrough.$data || {});
      const propKeys = Object.keys(passthrough.$props || {});
      const allKeys = dataKeys.concat(propKeys).concat(methodKeys);
      const methodsFromProps = buildFromProps(this.$parent, methodKeys);
      const props = merge([passthrough.$data, passthrough.$props, methodsFromProps]);

      const dynamic = {
        template: this.template || "<div></div>",
        props: allKeys,
        created: this.created || function() {},
        mounted: this.mounted || function() {},
        destroyed: this.destroyed || function() {},
        computed: passthrough.computed,
        components: passthrough.components
      };

      return h(dynamic, {
        props
      });
    }
  }
};
