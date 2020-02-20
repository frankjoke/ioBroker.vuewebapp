<template>
  <v-container elevation-2>
    <v-data-table
      v-bind="attrs"
      :headers="icolumns"
      :items="items"
      hide-actions
      item-key="name"
      disable-initial-sort
    >
      <!--       <template slot="headerCell" slot-scope="props">
        <th>
          <div class="body-2">{{props.header.text}}</div>
        </th>
      </template>
      -->
      <template v-slot:items="iprops" height="auto">
        <tr class="alternate">
          <td>
            <fj-data-item :item="mattr[iprops.index]" :attributes="hcolumn"/>
          </td>
          <td>
            <fj-data-item :item="iprops.item" :attributes="mattr[iprops.index]"/>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "fj-data-object",
  inheritAttrs: false,

  props: {
    item: { type: Object, required: true },
    options: { type: Object, required: false },
    attributes: { type: Array, required: false },
    altcolor: { type: String, required: false, default: "" }
  },
  data: () => ({
    hcolumn: {
      text: "property",
      value: "text",
      align: "right",
      class: "text-xm-right",
      type: "string",
      sortable: false
    },
    icolumns: [
      {
        text: "property",
        value: "name",
        align: "right",
        type: "string",
        sortable: false
      },
      { text: "Value", value: "value", align: "left", sortable: false }
    ],
    attrs: {},
    items: [],
    mattr: []
  }),
  methods: {},
  watch: {},
  computed: {},
  created() {
    let i = this.item;
    let a = {};
    let ma = this.attributes || [];
    if (ma.length)
      ma = ma.map(x => {
        x = Object.assign({}, x);
        a[x.value] = x;
        x.value = "value";
        x.align = "left";
        return x;
      });
    if (typeof i != "object") i = { value: i };
    let il = Object.keys(i).map((j, index) => {
      let li = a[i] ? a[i] : { name: j, value: i[j] };
      if (!ma[index]) ma[index] = "value";
      return li;
    });
    this.mattr = ma;
    this.items = il;

    let o = this.options || {};
    let mo = Object.assign({}, this.$attrs);
    ["light", "pagination.sync", "dark"]
      .filter(x => o[x] !== undefined)
      .forEach(x => {
        mo[x] = o[x];
      });
    this.attrs = mo;
    //    console.log(mo);
    // console.log(this.items);
    // console.log(this.icolumns);
    // console.log(this.mattr);
  }
};
</script>

<style>
/* 
table.v-datatable thead tr th,
th.column {
  height: auto !important;
  padding: 0px 10px !important;
  font-size: 1.1em;
  font-weight: bold;
  background: #fdece3;
}

tr.alternate:nth-child(even) {
  background: #e3f2fd;
}
 */
</style>