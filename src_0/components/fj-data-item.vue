<template>
  <p
    v-if="['string','number','password'].indexOf(c.type)>=0 && !edit"
    v-bind="next_attrs"
  >{{item[c.value]}}</p>
  <v-checkbox v-else-if="c.type=='boolean'" v-model="item[c.value]" v-bind="next_attrs"/>
  <v-switch v-else-if="c.type=='switch'" v-model="item[c.value]" v-bind="next_attrs"/>
  <v-textarea v-else-if="c.type=='textarea'" v-model="item[c.value]" v-bind="next_attrs"/>
  <v-select
    v-else-if="c.type=='select'"
    :items="c.select"
    v-model="item[c.value]"
    v-bind="next_attrs"
  />

  <v-combobox
    v-else-if="c.type=='chips'"
    v-model="item[c.value]"
    :items="c.select"
    chips
    clearable
    multiple
    v-bind="next_attrs"
  >
    <template v-slot:selection="data">
      <v-chip :selected="data.selected" close @input="removeChip(data.item)">
        <span>{{ data.item }}</span>&nbsp;
      </v-chip>
    </template>
  </v-combobox>

  <fj-data-table
    v-else-if="c.type=='table'"
    :columns="c.columns"
    :items="item[c.value]"
    v-bind="next_attrs"
    :edit="edit"
    :candelete="edit"
  />

  <v-text-field
    v-else
    px-0
    v-model="item[c.value]"
    @input="checkText"
    style="padding: 0px;"
    :type="c.type"
    v-bind="next_attrs"
  ></v-text-field>
</template>

<script>
import attrsMixin from "../mixins/attrs";
import helper from "./helper";

export default {
  name: "fj-data-item",
  mixins: [attrsMixin],
  props: {
    item: { required: true },
    attributes: { required: false }
  },
  data() {
    return {
      c: {},
      edit: false,
      my_attrs: /^(value|type|select|columns|edit|name|default|text|sortable|width)$/
    };
  },
  methods: {
    checkText(val) {
      let { value, type } = this.c;
      console.log("Text:", val, value, type);
      if (type == "number") val = Number(val);
      if (isNaN(val)) val = this.item[value];
      this.$set(this.item, value, val);
    },
    removeChip(item) {
      this.item[this.c.value].splice(this.item[this.c.value].indexOf(item), 1);
      //      this.chips = [...this.chips]
    }
  },
  created() {
    let c = Object.assign({}, this.attributes);
    if (typeof c == "string") c = { value: c };
    else if (typeof c !== "object") c = { value: "value" };
    let i = helper.getFormat(this.item[c.value], c);
    if (this.this_attrs.edit || i.edit) this.edit = true;
    if (i.type === "number" && !i.align && !this.edit) i.align = "right";
    if (i.type === "number" && !i.rules && this.edit)
      i.rules = [v => !isNaN(Number(v)) || "Not a number!"];
    //    console.log(i);
    this.c = i;
    //    console.log("na:", this.next_attrs);
    this.mix_attrs(i, this.my_attrs, {}, this.next_attrs);
    //    console.log("na:", this.next_attrs);
  }
};
</script>

<style>
.v-input__slot {
  margin-bottom: 0px;
}
table.v-table tbody td {
  height: auto !important;
  padding: 0px 5px !important;
}
</style>