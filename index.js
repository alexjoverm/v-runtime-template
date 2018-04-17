export default {
  props: {
    template: String,
  },
  computed: {
    dynamic() {
      const {
        props,
        data,
        methods,
        computed,
        components,
        watch,
      } = this.$parent.$options;

      return {
        template: this.template,
        props,
        data,
        methods,
        computed,
        components,
        watch,
      };
    },
  },
  render(h) {
    return h(this.dynamic);
  },
};
