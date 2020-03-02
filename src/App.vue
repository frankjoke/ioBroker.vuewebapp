<template>
  <fj-config title="MyTestadapter" image="logo.svg" :config="config" :format="format" :language="redraw">
    <v-layout row>
      <v-flex sm2>
        <fj-btn :text="'test' | tt(2,1)" @click="pressed" img="mdi-lan-check" tooltip="Teste emit"></fj-btn>
      </v-flex>
      <v-flex sm3>
        <fj-btn
          text="Button"
          img="logo.png"
          @click="actionConnected(!connected)"
          tooltip="Translate me later!"
        ></fj-btn>
      </v-flex>
      <v-flex sm3>
        <v-btn color="primary" @click="setLang('de')">
          set lang to {{ lang==='de' ? 'en' : 'de'}}  
          <v-icon small>mdi-cancel</v-icon>vue ui
          
        </v-btn>
      </v-flex>
      <v-flex sm1>
        <v-switch v-model="connected">Connected:</v-switch>
      </v-flex>
      <v-flex sm1>
        <fj-icon img="logo.png"></fj-icon>
      </v-flex>
      <v-flex sm1>
        <v-checkbox v-model="changed"></v-checkbox>
      </v-flex>
    </v-layout>
    <!--     <fj-data-table :items="items" :columns="columns" label="myData Table" class="elevation-1" />
    <fj-data-object :item="items[0]" :attributes="columns"></fj-data-object>-->
    {{lang}}, {{changed}},  {{connected}}, {{toadd}} 
  </fj-config>
</template>

<script>
import Vue from "vue";
import Vuex, { mapMutations } from "vuex";

import {FjConfig, FjBtn, FjIcon} from "./components/fj-components.js";
import { mapGetters, mapActions, mapState } from "vuex";
//import {translate} from "./plugins/dictionary";
import helperMixin from "./mixins/helper";

export default {
  name: "App",
  mixins: [helperMixin],
  components: {  FjConfig, FjBtn, FjIcon },
  data() {
    return {
      toadd: null
    };
  },
  methods: {
    ...mapActions(["actionConnected", "emitSocket"]),
    ...mapMutations(["langMutation","toAdd"]),
    emit(event, ...payload) {
      return this.emitSocket({ event, payload });
    },
    
    setLang() {
      console.log("set lang to de!");
//      debugger;
      this.langMutation(this.lang ==="de" ? "en" : "de");
      this.toAdd(this.toadd = this.toAddDictionary());
      this.reRender();
    },
    reRender(){
        this.$forceUpdate()
     },
    pressed() {
      // this.$socket.emit("getObject", "system.adapter.bmw.0", (err, data) =>
      //   console.log(err, data)
      // );
      this.emit("getObject", "system.adapter.bmw.0")
        .then(res => console.log("res system.adapter.bmw.0:", res))
        .then(() => this.emit("getState", "bmw.0.225xe.navigation.latitude"))
        .then(res => console.log("res latidude bmw:", res))
        .then(() =>
          this.emit("getObjectView", "system", "instance", {
            startkey: "system.adapter.",
            endkey: "system.adapter.\u9999"
          })
        )
        .then(res => console.log("res instance bmw:", res))
        .then(() => this.emit("getObject", "system.config"))
        .then(
          res => console.log("res system.config:", res),
          err => console.log("err:", err)
        );
      //      console.log(this, what);
      // console.log(this.$socket);
      //      console.log(this.$io);
      //      console.log("$io", this.$io.emit);
      //      console.log("$io.io", this.$io.io.emit);
      //      this.$socket.emit("getObject", "system.adapter.bmw.0", (err, res) => {
      //        console.log(err, res);
      //      });
    }
  },
  mounted() {
    //    this.sockets.subscribe("getObject", data => {
    //    console.log(Vue.prototype);
    //    console.log(this.$store);
    //    });
  },
  computed: {
    ...mapGetters(["format", "config"]),
    //    ...mapState({ config: "conf"}),
    ...mapState(["connected", "lang", "changed"]),
    //    ...mapGetters(["connected"])
   redraw() {
     return this.lang + 'changed';
   }
  }
};
</script>

<style>
</style>
