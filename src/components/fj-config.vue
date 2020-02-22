<template>
  <v-app>
    <v-app-bar app dense>
      <fj-icon v-if="!!image" :img="image" size="2em" />
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <template v-if="menu.length>1">
          <fj-btn
            flat
            v-for="(mitem,mindex) in menu"
            :key="mindex"
            @click="menuitem = mindex"
            :img="mitem.icon"
            :text="mitem.text"
            :tooltip="mitem.tooltip"
            />
        </template>
        <fj-btn img="mdi-content-save" text="Save" :disabled="!changed" tooltip="Save config now"></fj-btn>
        <fj-btn img="mdi-file-restore" text="Save+close" tooltip="Save and close config"></fj-btn>
        <fj-btn img="mdi-download" tooltip="Download config to file"></fj-btn>
        <fj-btn img="mdi-upload" tooltip="Upload config from file"></fj-btn>"
        <fj-btn img="mdi-close" text="cancel" @click="close" tooltip="Close and cancel edit"></fj-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container fluid pa-2>
        <v-layout row wrap>
          <template v-for="(item,index) in display">
            <fj-config-item :config="config" :format="item" :key="index"></fj-config-item>
          </template>
        </v-layout>
        <slot />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
//import attrsMixin from "../mixins/attrs";

export default {
  name: "fj-config",
  //  mixins: [attrsMixin],

  props: {
    config: {
      type: Object,
      default: () => ({ empty: "No data cofigured!" }),
      required: false
    },
    format: {
      type: Array,
      default: () => [],
      required: false
    },
    title: {
      type: String,
      default: "Default Application Name",
      required: false
    },
    image: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      menu: [],
      menuitem: 0,
      oldconf: "",
      changed: false
      //      my_attrs: /(top|bottom|left|right)/
    };
  },
  methods: {
    checkConf() {
      let newconf = JSON.stringify(this.config);
      console.log(this.oldconf);
      console.log(newconf);
      this.changed = newconf != this.oldconf;
    },
    close() {
      //      window.close();
      if (typeof parent !== "undefined" && parent) {
        try {
          parent.postMessage("close", "*");
        } catch (e) {
          window.close();
        }
      } else window.close();
    }
  },
  computed: {
    display() {
      return this.menu[this.menuitem].entries;
    }
    //    ...mapGetters(["connected"])
  },
  watch: {
    config: {
      handler(val, oldVal) {
        console.log("something changed");
        this.$nextTick(() => this.checkConf());
        //        this.$emit("changed", true);
        this.$store.state.changed = true;
      },

      deep: true
    }
  },

  created() {
    //    console.log("format:", this.format);
    if (this.format[0].type !== "menu")
      this.menu.push({
        text: "config",
        type: "menu",
        value: "entries",
        entries: this.format,
        icon: "mdi-settings",
        tooltip: "Default configuration page"
      });
    else this.menu = this.format;
    this.oldconf = JSON.stringify(this.config);
    //    console.log(this.menu);
  }
};
</script>

<style>
</style>
