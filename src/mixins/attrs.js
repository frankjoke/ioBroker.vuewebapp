/*
filter attributes into this_attrs and next_attrs
if there is a value named 'my_attrs' use it to filer 
 */

// @vue/component

export default {
  inheritAttrs: false,
  data() {
    return {
      this_attrs: {},
      next_attrs: {}
    };
  },
  methods: {
    mix_attrs(source, filter = [], isin = {}, isout = {}) {
      if (typeof source == "string") source = { [source]: true };
      source = source || {};
      if (typeof filter == "string")
        filter = filter
          .split(",")
          .map(x => x.trim())
          .filter(x => x.length);
      const f = filter;
      if (Array.isArray(filter)) filter = key => f.indexOf(key) >= 0;
      else if (filter instanceof RegExp) filter = key => f.test(key);
      else if (typeof filter !== "function") filter = key => !!f[key];

      Object.entries(source).forEach(([key, val]) => {
        if (filter(key)) isin[key] = val;
        else isout[key] = val;
      });
      //      console.log(isin, isout);
      return { isin, isout };
    },
    addout_attrs(source, dest = {}, filter = []) {
      return this.mix_attrs(source, filter, {}, Object.assign({}, dest)).isout;
    },
    addin_attrs(source, dest = {}, filter = []) {
      return this.mix_attrs(source, filter, Object.assign({}, dest), {}).isin;
    },
    addall_attrs(source, filter) {
      this.mix_attrs(
        source,
        filter ? filter : this.my_attrs,
        this.this_attrs,
        this.next_attrs
      );
    }
  },
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
  created() {
    let res = this.mix_attrs(
      this.$attrs,
      this.my_attrs,
      this.this_attrs,
      this.next_attrs
    );
  }
};
