<template>
  <v-img
    v-if="type == 'img'"
    :max-width="size"
    :max-height="size"
    :width="size"
    aspect-ratio="1"
    :src="name"
    :alt="alt"
    v-bind="$attrs"
  />
  <v-icon v-else-if="type == 'mdi'" v-bind="$attrs">{{img}}</v-icon>
  <div v-else v-bind="$attrs">fj-ui: {{name}}</div>
</template>

<script>
export default {
  name: "fj-icon",
  inheritAttrs: false,

  props: {
    img: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "2em"
    }
  },
  methods: {},
  computed: {
    name() {
      let t = this.type;
      let i = this.img;
      if (t == "img") i = require(`../assets/${i}`);
      //      console.log(t, i);
      return i;
    },
    type() {
      let n = this.img.toLowerCase().trim();
      if (n.endsWith(".jpg") || n.endsWith(".png") || n.endsWith(".svg"))
        return "img";
      return "mdi";
    }
    //    ...mapGetters(["connected"])
  },
  created() {}
};
</script>

<style>
</style>
