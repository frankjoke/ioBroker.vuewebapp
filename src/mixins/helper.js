/*
filter attributes into this_attrs and next_attrs
if there is a value named 'my_attrs' use it to filer 
 */

// @vue/component

import {
  translate, toadd, dictionary
} from "../plugins/dictionary";

export default {
  computed: {
    /* 
    safeId() {
      // Computed property that returns a dynamic function for creating the ID.
      // Reacts to changes in both .id and .localId_ And regens a new function
      const id = this.id || this.localId_;

      // We return a function that accepts an optional suffix string
      // So this computed prop looks and works like a method!!!
      // But benefits from Vue's Computed prop caching
      const fn = suffix => {
        if (!id) {
          return null;
        }
        suffix = String(suffix || "").replace(/\s+/g, "_");
        return suffix ? id + "_" + suffix : id;
      };
      return fn;
    }
   */
  },
  methods: {
    t(what, ...args) {
      //        const id = this.$store.state.lang;
      return translate(what, ...args);
    },
    startCase(str) {
      return str
        .replace(/[_\-]+/g, " ")
        .replace(/([a-z])([A-Z])/g, (str, $1, $2) => $1 + " " + $2)
        .replace(/(\s|^)(\w)/g, (str, $1, $2) => $1 + $2.toUpperCase());
    },
    toAddDictionary() {
      return toadd;
    },
    langDictionary() {
      return dictionary;
    },
    getType(obj) {
      return Object.prototype.toString
        .call(obj)
        .replace(/^\[object (.+)\]$/, "$1")
        .toLowerCase();
    },
    getFormat(v, f = {}) {
      if (typeof f == "string") f = {
        value: f
      };
      let i = Object.assign({}, f);
      let typ = this.getType(v);
      if (!i.value && i.text) i.value = i.text;
      if (!i.text) i.text = this.startCase(i.value);
      //    if (!i.id) i.id = i.text + "_" + i.value;
      if (!i.type && i.select) i.type = "select";
      if (!i.type)
        switch (typ) {
          case "boolean":
          case "number":
          case "string":
            i.type = typ;
            break;
          case "array":
            i.type = "chips";
            break;
          default:
            i.type = "string";
            break;
        }
      else if (typeof i.type !== "string") i.type = "string";
      if (i.type == "chips" || i.type == "select")
        i.select = Array.isArray(i.select) ?
        i.select :
        typeof i.select == "string" ?
        i.select.split(",").map(x => x.trim()) :
        [];
      if (i.type == "select" && typ == "array") i.multiple = true;
      if (i.type == "textarea" && i.autoGrow) i.rows = 1;
      //    console.log(i);
      return i;
    }

  },
};