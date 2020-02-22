<template>
  <div>
    <v-toolbar dark dense color="primary">
      <fj-icon v-if="icon" :img="icon"></fj-icon>
      <v-toolbar-title class="headline">{{ label }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="addRow">
        <span class="mr-2">Add entry</span>
        <v-icon>mdi-playlist-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table dense v-bind="this_attrs" :headers="icolumns" :items="items">
       <template v-slot:item="iprops" height="auto">
        <tr class="alternate">
          <td v-for="column in icolumns" :key="column.id">
            <v-icon
              v-if="column.text=='-'"
              dark
              color="error"
              @click.stop="itemDelete(iprops.index)"
            >mdi-delete-forever</v-icon>
            <fj-data-item v-else :item="iprops.item" :attributes="column" />
          </td>
        </tr>
      </template>
  </v-data-table>
    <fj-dialog-question v-model="dialog" @Ok="itemDelete(true)">
      <fj-data-object v-if="ditem" :item="ditem" :attributes="icolumns"></fj-data-object>
    </fj-dialog-question>
    <!--     <v-btn @click="snackShow('ThisTest!')">Snack me</v-btn>
    <v-btn @click="snackShow('Error!')">Err me</v-btn>
    <v-btn @click="dialog = 'Whats next?'">Dialog me</v-btn>
    -->
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">
        <v-icon>mdi-close</v-icon>Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import attrsMixin from "../mixins/attrs";
import helper from "./helper";

export default {
  name: "fj-data-table",
  mixins: [attrsMixin],
  props: {
    items: { type: Array, required: true },
    columns: { type: Array, required: false },
    label: { type: String, required: false, default: "" },
    icon: { type: String, required: false, default: "mdi-table" }
  },
  data: () => ({
    snack: true,
    snackText: "Snack",
    snackColor: "success",
    iprops: null,
    icolumns: null,
    ddelete: false,
    ditem: undefined,
    dindex: undefined,
    dialog: false,
    my_attrs: /^(hideActions|itemKey|light|pagination\.sync|dark|disableInitialSort)$/
  }),
  methods: {
    itemDelete(i) {
      //      console.log(i);
      if (typeof i == "number") {
        this.dindex = i;
        this.ddelete = true;
        this.ditem = this.items[i];
        this.dialog = `Delete row ${i}?`;
      } else if (i && typeof this.dindex == "number") {
        this.items.splice(this.dindex, 1);
        //        this.$emit('Delete',this.dindex);
        this.ditem = this.dindex = undefined;
      }
      //      this.items = this.items.slice(i.index,1);
    },
    addRow() {
      let ni = {};
      this.icolumns.forEach((c, index) => {
        ni[c.value] =
          c.default !== undefined
            ? typeof c.default === "function"
              ? c.default.bind(this)(c, index, this.items)
              : c.default
            : c.type === "number"
            ? 0
            : c.type === "boolean"
            ? false
            : "";
      });

      this.items.push(ni);
      this.snackText = "Added Row.";
    },
    snackShow(msg, color) {
      this.snackText = msg;
      this.snackColor = color
        ? color
        : msg.toLowerCase().startsWith("error")
        ? "error"
        : "info";
      this.snack = true;
    }
  },
  watch: {
    dialog(newi) {
      if (!newi) this.ditem = this.dindex = null;
    }
  },
  created() {
    let { edit, candelete } = this.$attrs;
    this.addall_attrs({
      edit: true,
      candelete: true,
      hideActions: true,
      disableInitialSort: true
    });
    //    console.log(o);

    let cols = this.columns;
    if (!Array.isArray(cols)) {
      if (this.items.length) {
        let v = this.items[0];
        cols = Object.keys(v).map(k => helper.getFormat(v[k], { value: k }));
      } else cols = [{ value: "No Data" }];
    }
    this.icolumns = cols.map((item, index) => {
      if (typeof item === "function") item = item.bind(this)(index);
      if (typeof item !== "object") {
        if (!item) item = index;
        item = { value: item.toString() };
      }

      let i = Object.assign({}, item);
      if (edit) i.edit = true;
      if (candelete) i.candelete = true;
      if (!i.text && i.value) i.text = helper.startCase(i.value);
      i.sortable = false;
      return i;
    });
    if (candelete)
      this.icolumns.push({
        text: "-",
        sortable: false,
        width: "1%"
      });
    console.log(this.icolumns);
    console.log(this.items);
    //    this.snackShow("Started.");
  }
};
</script>
<style>
th.column,
table.v-table thead th {
  height: auto !important;
  padding: 0px 10px 0px 10px !important;
  font-size: 1.1em;
  font-weight: bold;
  background: #fdece3;
}

tr.alternate:nth-child(even) {
  background: #e3f2fd;
}
.v-text-field {
  padding-top: 0px;
  /*  */
  margin-top: 4px;
}
</style>