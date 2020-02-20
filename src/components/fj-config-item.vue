<template>
  <v-spacer v-if="format =='spacer'  || format.spacer"></v-spacer>
  <v-divider v-else-if="format =='vertical'  || format.vertical" vertical></v-divider>
  <v-flex v-else-if="format =='divider'  || format.divider" align-self-center xs12 pa-1>
    <v-divider></v-divider>
  </v-flex>
  <v-flex v-else align-self-center v-bind="this_attrs" pa-2>
    <fj-data-item :item="config" :attributes="next_attrs"></fj-data-item>
  </v-flex>
</template>

<script>
import attrsMixin from "../mixins/attrs";

export default {
  name: "fj-config-item",
  mixins: [attrsMixin],

  props: {
    config: {
      type: Object,
      required: true
    },
    format: {
      type: [Object, String],
      required: true
    }
  },
  data() {
    return {
      my_attrs: /^((offset-|order-)?(xs|sm|md|lg|xl)\d+|grow|shrink)$/
    };
  },
  methods: {},
  computed: {},
  created() {
    //    console.log("format:", this.format);
    //    console.log("config:", this.config);
    this.addall_attrs(this.format);
    this.next_attrs.edit = true;
    this.next_attrs.label = this.next_attrs.label || this.next_attrs.name;
    //    console.log("this:", this.this_attrs);
    //    console.log("next:", this.next_attrs);
    //    console.log(this.menu);
  }
};
</script>

<style>
</style>
