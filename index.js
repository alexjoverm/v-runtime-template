const getKeysFromOptions = options => [
  ...Object.keys((options.data && options.data()) || {}),
  ...Object.keys(options.props || {}),
];

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
        defineDescriptor(obj, res, name),
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
  },
  render(h) {
    const {
      $data,
      $props,
      $options
    } = this.$parent;

    const methodKeys = Object.keys($options.methods || {});
    const allKeys = getKeysFromOptions($options).concat(methodKeys);
    const methods = buildFromProps(this.$parent, methodKeys);
    const props = merge([$data, $props, methods]);

    const dynamic = {
      template: this.template,
      props: allKeys,
      computed: $options.computed,
      components: $options.components,
    };

    return h(dynamic, {
      props
    });
  },
};