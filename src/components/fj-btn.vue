<template>
  <v-tooltip v-if="!!tooltip" v-bind="this_attrs">
    <template v-slot:activator="{ on }">
      <v-btn
        :icon="!text"
        v-on="on"
        style="margin-right: 5px; margin-left: 5px"
        @click="$emit('click')"
        :disabled="disabled"
        v-bind="next_attrs"
      >
        <fj-icon v-if="!!img" :img="img" />
        {{text | tt | beginsp}}
      </v-btn>
    </template>
    <span>{{tooltip | tt }}</span>
  </v-tooltip>
  <v-btn
    v-else
    :icon="!text"
    style="right: 5px, left: 5px"
    @click="$emit('click')"
    :disabled="disabled"
    v-bind="next_attrs"
  >
    <fj-icon v-if="!!img" :img="img" />
    {{text | tt | beginsp}}
  </v-btn>
</template>

<script>
import attrsMixin from "../mixins/attrs";
// import translateMixin from "../mixins/translate";

export default {
  name: "fj-btn",
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
    tooltip: {
      type: String,
      default: ""
    },
    disabled: false
  },
  created() {
//    console.log(this);
    if (!Object.keys(this.this_attrs).length) this.this_attrs["bottom"] = true;
  }
};
</script>

<style>
.v-icon {
  margin-left: 0.2em;
  margin-right: 0.2em;
}
.v-image {
  margin-left: 0.1em;
  margin-right: 0.1em;
}
</style>
