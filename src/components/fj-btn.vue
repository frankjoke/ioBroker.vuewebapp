<template>
  <v-tooltip v-bind="this_attrs">
    <template v-slot:activator="{ on }">
      <v-btn
        :icon="!text"
        :text="flat"
        v-on="on"
        @click="$emit('click')"
        :disabled="disabled"
        v-bind="next_attrs"
      >
        <fj-icon v-if="!!img" :img="img" />
        {{text ? '&nbsp;'+text : ''}}
      </v-btn>
    </template>
    <span>
      <slot></slot>
    </span>
  </v-tooltip>
</template>

<script>
import attrsMixin from "../mixins/attrs";

export default {
  name: "s",
  mixins: [attrsMixin],
  data() {
    //    return { my_attrs: "top,bottom,left,right" };
    return { my_attrs: /(top|bottom|left|right)/ };
  },
  props: {
    img: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    disabled: false
  },
  methods: {},
  computed: {
    //    ...mapGetters(["connected"])
  },
  created() {
    //    console.log(attrsMixin);
    if (!Object.keys(this.this_attrs).length) this.this_attrs["bottom"] = true;
  }
};
</script>

<style>
</style>
