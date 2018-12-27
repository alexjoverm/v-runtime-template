<template>
  <div>
    <v-runtime-template :template="testSimple"/>
  </div>
</template>

<script>
import VRuntimeTemplate from "./index.js"; //import raw src
export default {
  data() {
    return {
      testSimple: "<b>Simple Template</b>"
    };
  },
  components: {
    VRuntimeTemplate
  }
};
</script>

<style>
</style>
