/**
 * v-runtime-template v1.0.0
 * (c) 2018 Alex J <alexjovermorales@gmail.com>
 * @license MIT
 */

var index = {
  props: {
    template: String,
  },
  computed: {
    dynamic: function dynamic() {
      var ref = this.$parent.$options;
      var props = ref.props;
      var data = ref.data;
      var methods = ref.methods;
      var computed = ref.computed;
      var components = ref.components;
      var watch = ref.watch;

      return {
        template: this.template,
        props: props,
        data: data,
        methods: methods,
        computed: computed,
        components: components,
        watch: watch,
      };
    },
  },
  render: function render(h) {
    return h(this.dynamic);
  },
};

export default index;
