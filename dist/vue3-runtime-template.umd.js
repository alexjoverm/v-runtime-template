!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("vue")):"function"==typeof define&&define.amd?define(["vue"],e):t.vue3RuntimeTemplate=e(t.vue)}(this,function(t){var e=function(t,e,o){if(!e.hasOwnProperty(o)){var r=Object.getOwnPropertyDescriptor(t,o);Object.defineProperty(e,o,r)}};return{props:{template:String,parent:Object,templateProps:{type:Object,default:function(){return{}}}},render:function(){if(this.template){var o=this.parent||this.$parent,r=o.$data;void 0===r&&(r={});var n=o.$props;void 0===n&&(n={});var i=o.$options;void 0===i&&(i={});var p=i.components;void 0===p&&(p={});var a=i.computed;void 0===a&&(a={});var c=i.methods;void 0===c&&(c={});var s=this.$data;void 0===s&&(s={});var d=this.$props;void 0===d&&(d={});var v=this.$options;void 0===v&&(v={});var u=v.methods;void 0===u&&(u={});var f=v.computed;void 0===f&&(f={});var m=v.components;void 0===m&&(m={});var h={$data:{},$props:{},$options:{},components:{},computed:{},methods:{}};Object.keys(r).forEach(function(t){void 0===s[t]&&(h.$data[t]=r[t])}),Object.keys(n).forEach(function(t){void 0===d[t]&&(h.$props[t]=n[t])}),Object.keys(c).forEach(function(t){void 0===u[t]&&(h.methods[t]=c[t])}),Object.keys(a).forEach(function(t){void 0===f[t]&&(h.computed[t]=a[t])}),Object.keys(p).forEach(function(t){void 0===m[t]&&(h.components[t]=p[t])});var $=Object.keys(h.methods||{}),O=Object.keys(h.$data||{}),y=Object.keys(h.$props||{}),b=Object.keys(this.templateProps),j=O.concat(y).concat($).concat(b),l=(E=o,P={},$.forEach(function(t){return e(E,P,t)}),P),k=function(t){var o={};return t.forEach(function(t){t&&Object.getOwnPropertyNames(t).forEach(function(r){return e(t,o,r)})}),o}([h.$data,h.$props,l,this.templateProps]);return t.h({template:this.template||"<div></div>",props:j,computed:h.computed,components:h.components,provide:this.$parent.$.provides?this.$parent.$.provides:{}},Object.assign({},k))}var E,P}}});
//# sourceMappingURL=vue3-runtime-template.umd.js.map