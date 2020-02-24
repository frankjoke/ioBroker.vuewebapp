<template>
  <fj-config title="MyTestadapter" image="logo.svg" :config="config" :format="format">
    <v-layout row>
      <v-flex sm1>
        <fj-btn :text="'test' | tt(2,1)" @click="pressed" img="mdi-lan-check" tooltip="Teste emit"></fj-btn>
      </v-flex>
      <v-flex sm3>
        <fj-btn
          text="Button"
          img="logo.png"
          @click="actionConnected(!connected)"
          :tooltip='"Translate me later!" | tt'
        ></fj-btn>
      </v-flex>
      <v-flex sm3>
        <v-btn color="primary" @click="actionConnected(!connected)">
          mdi-cancel
          <v-icon small>mdi-cancel</v-icon>
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
  </fj-config>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";

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
      /*
       columns: [
        {
          name: "ScolumnA",
          value: "a",
          type: "chips",
          edit: false,
          select: "a,b,c,d",
          autoGrow: true,
          placeholder: "placeholder",
          sm4: true
        },
        {
          name: "NcolumnA",
          value: "aa",
          type: "number",
          width: "10%",
          //          default: 10,
          rules: [v => !isNaN(Number(v)) || "Not a number!"],
          xs3: true,
          "offset-xs1": true,
          placeholder: "Numbers in seconds"
        },
        {
          name: "Bool",
          value: "b",
          type: "boolean",
          width: "2%",
          sm3: true,
          //          dark: true,
          color: "success",

          sortable: false
        },
        {
          name: "Switch",
          value: "bb",
          type: "switch",
          sm3: true,
          default: false,
          //          dark: true,
          color: "success"
        },
        {
          name: "C%",
          value: "c",
          width: "10%",
          sm3: true,
          label: "LabelS",
          placeholder: "Teset"
        },
        {
          name: "Select",
          value: "s",
          select: ["one", "two", "three"],
          chips: true,
          sm3: true,
          width: "20%"
        }
      ],
      items: [
        { a: [1111], aa: 1, b: true, bb: true, c: "t3", s: ["two"] },
        { a: [], aa: 1, b: 5, bb: true, c: 6 },
        { a: [], aa: 1, b: false, bb: true, c: 6 }
      ],
 */
      //      changed: false
    };
  },
  methods: {
    ...mapActions(["actionConnected", "emitSocket"]),
    emit(event, ...payload) {
      return this.emitSocket({ event, payload });
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
          console.log(Vue.prototype);
          console.log(this.$store);
    //    });
  },
  computed: {
    ...mapGetters(["format", "config"]),
    //    ...mapState({ config: "conf"}),
    ...mapState(["connected", "lang", "changed"])
    //    ...mapGetters(["connected"])
  }
};
</script>

<style>
</style>
