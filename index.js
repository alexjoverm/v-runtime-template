export default {
  props: {
    template: String,
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    dynamic() {
      const { props, data, methods, computed } = this.options;
      return { template: this.template, props, data, methods, computed };
    },
  },
  render(h) {
    return h(this.dynamic);
  },
};
