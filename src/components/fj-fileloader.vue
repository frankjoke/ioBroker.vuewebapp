<template>
  <v-tooltip v-if="!!tooltip" v-bind="this_attrs">
    <template v-slot:activator="{ on }">
      <v-btn
        :icon="!text"
        v-on="on"
        style="margin-right: 5px; margin-left: 5px"
        @click="trigger"
        :disabled="disabled"
        v-bind="next_attrs"
      >
        <fj-icon v-if="!!img" :img="img" />
        {{text | tt | beginsp}}
        <input
          type="file"
          id="file1"
          name="file1"
          style="display:none"
          ref="fileInput"
          @change="loadTextFromFile"
        />
      </v-btn>
    </template>
    <span>{{tooltip | tt }}</span>
  </v-tooltip>
  <v-btn
    v-else
    :icon="!text"
    style="right: 5px, left: 5px"
    @click="trigger"
    :disabled="disabled"
    v-bind="next_attrs"
  >
    <fj-icon v-if="!!img" :img="img" />
    {{text | tt | beginsp}}
    <input
      type="file"
      id="file1"
      name="file1"
      style="display:none"
      ref="fileInput"
      @change="loadTextFromFile"
    />
  </v-btn>
</template>

<script>
import attrsMixin from "../mixins/attrs";
// import translateMixin from "../mixins/translate";

export default {
  name: "fj-fileloader",
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
  methods: {
    loadTextFromFile(ev) {
//      console.log(ev);
      const file = ev.target.files[0];
      const reader = new FileReader();
//      console.log(ev);

      reader.onload = e => {
//        console.log(e.target);
        this.$emit("load", e.target.result));
        console.log(file);
        const r = reader.readAsText(file);
//      debugger;
        console.log(r);
      };
    },
    trigger() {
      this.$refs.fileInput.click();
    }
  },
  created() {
    console.log(this);
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
