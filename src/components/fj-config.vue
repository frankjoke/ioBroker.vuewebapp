<template>
  <v-app>
    <v-app-bar app dense>
      <fj-icon v-if="!!image" :img="image" size="2em" />
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <template v-if="menu.length>0">
          <fj-btn
            v-for="(mitem,mindex) in menu"
            :key="mindex"
            @click="menuitem = mindex"
            :img="mitem.icon"
            :text="mitem.text"
            :tooltip="mitem.tooltip"
            :disabled="menuitem === mindex"
          />
        </template>
        <fj-btn text disabled></fj-btn>
        <fj-btn
          img="mdi-content-save"
          text="save"
          :disabled="!changed"
          @click="save"
          tooltip="Save config now"
        />
        <fj-btn
          img="mdi-file-restore"
          :disabled="!changed"
          text="saveclose"
          tooltip="Save and close config"
          @click="saveClose"
        />
        <fj-btn img="mdi-download" tooltip="Download config to file" @click="download" />
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              :icon="!text"
              v-on="on"
              style="margin-right: 5px; margin-left: 5px"
              @click="triggerLoad"
              v-bind="next_attrs"
            >
              <fj-icon img="mdi-upload" />

              <input
                type="file"
                id="file1Load"
                name="file1Load"
                style="display:none"
                ref="file1Load"
                @change="loadTextFromFile"
              />
            </v-btn>
          </template>
          <span>{{"Upload config from file" | tt }}</span>
        </v-tooltip>
        <fj-btn img="mdi-close" text="cancel" @click="close" tooltip="Close and cancel edit"></fj-btn>
        <fj-btn
          :img="(connected?'mdi-lan-disconnect':'mdi-lan-connect')"
          :tooltip="(!connected?'connect':'disconnect') "
          @click="actionConnected(!connected)"
        ></fj-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-card class="mx-auto" outlined tile>
        <v-container fluid pa-2>
          <v-layout row wrap>
            <template v-for="(item,index) in menu[menuitem].entries">
              <fj-config-item :config="config" :format="item" :key="index"></fj-config-item>
            </template>
          </v-layout>
          <slot />
        </v-container>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
//import attrsMixin from "../mixins/attrs";
import { mapActions, mapState } from "vuex";

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
    ...mapActions(["actionConnected", "saveSettings","updateConfig"]),

    loadTextFromFile(ev) {
      //      console.log(ev);
      const file = ev.target.files[0];
      const reader = new FileReader();
      const that = this;
//      console.log(ev.target.value, reader);

      reader.onload = e => {
        let r = null;
        try {
          r = JSON.parse(e.target.result);
        } catch {
          console.log("Error: file did not include json syntax!");
        }
        if(r) 
          that.updateConfig(r);
//       this.$emit("load", e.target.result);
      };
      reader.readAsText(file);
    },
    triggerLoad() {
      //      debugger;
      //      console.log("trigger");
      this.$refs.file1Load.value = "";
      this.$refs.file1Load.click();
      //      this.$refs.file1Load.value = "";
      //            console.log("trigger end");
    },

    checkConf() {
//      let newconf = JSON.stringify(this.config);
      // console.log(this.oldconf);
      // console.log(newconf);
      this.$store.state.changed = this.changed = this.confStr != this.oldconf;
    },
    save() {
      this.saveSettings(this.config);
      this.oldconf = JSON.stringify(this.config);
    },
    /*    close() {
//      debugger;
      if (typeof parent !== "undefined" && parent) {
        try {
          parent.postMessage("close", "*");
        } catch (e) {
          window.close();
        }
      } else window.close();
    }, */
    close() {
      const parent = window.parent;
      console.log(parent);
      debugger;
      if (typeof parent !== "undefined" && parent) {
        try {
          if (
            parent.$iframeDialog &&
            typeof parent.$iframeDialog.close === "function"
          ) {
            parent.$iframeDialog.close();
          } else {
            parent.postMessage("close", "*");
          }
        } catch (e) {
          parent.postMessage("close", "*");
        }
      }
    },
    saveClose() {
      this.save();
      this.close();
    },
    download(what) {
      if (!what) what = this.config;
      if (!what) what = { error: "No config!" };
      console.log(this.$FS);
      const blob = new Blob([JSON.stringify(what, null, 2)], {
        type: "application/json;charset=utf-8"
      });
      this.$FS.saveAs(blob, "config.json");
    },
    upload(what) {}
  },
  computed: {
    ...mapState(["connected", "lang"]),
    // both get and set
    confStr() {
        return JSON.stringify(this.config);
      }
    },

  watch: {
    config: {
      handler(val, oldVal) {
//        console.log("config changed");
        this.$nextTick(() => this.checkConf());
        //        this.$emit("changed", true);
        //        this.$store.state.changed = true;
      },

      deep: true
    },
    oldconf: {
      handler(val, oldVal) {
//        console.log("oldconf changed");
        this.$nextTick(() => this.checkConf());
        //        this.$emit("changed", true);
        //        this.$store.state.changed = true;
      }
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
    this.oldconf = this.confStr;
    //    console.log(this.menu);
  }
};
</script>

<style>
</style>
