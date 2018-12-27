//https://vuejs.org/v2/guide/plugins.html
//https://dev.to/nkoik/writing-a-very-simple-plugin-in-vuejs---example-8g8
// This exports the plugin object.

export default {
  // The install method will be called with the Vue constructor as
  // the first argument, along with possible options
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          testingData: "mixinTest: testData"
        };
      },
      computed: {
        testingComputed() {
          return "mixinTest: testComputed";
        }
      },
      mounted() {
        // eslint-disable-next-line
        console.log("mixinTest: testingMounted");
      }
    }); //end mixin

    Vue.prototype.$testProto = function (str) {
      return "mixinTest: testingProto=" + str;
    }; //end $str

  }
};