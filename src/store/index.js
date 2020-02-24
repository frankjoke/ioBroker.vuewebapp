import Vue from "vue";
import Vuex from "vuex";
//import { deepStrictEqual } from "assert";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    connected: false,
    changed: false,
    dictionary: {},
    lang: 'en',
    
    formatConf: [
      {
        text: "ScolumnA",
        value: "a",
        type: "chips",
        edit: false,
        select: "a,b,c,d",
        autoGrow: true,
        placeholder: "placeholder",
        sm4: true
      },
      {
        text: "NcolumnA",
        value: "aa",
        type: "number",
        width: "10%",
        //          default: 10,
        rules: [v => !isNaN(Number(v)) || "Not a number!"],
        xs3: true,
        "offset-xs1": true,
        placeholder: "Numbers in seconds"
      },
      { divider: true },
      {
        text: "Bool",
        value: "b",
        type: "boolean",
        width: "2%",
        sm3: true,
        //          dark: true,
        color: "success",

        sortable: false
      },
      "spacer",
      {
        text: "Switch",
        value: "bb",
        type: "switch",
        sm3: true,
        default: false,
        //          dark: true,
        color: "success"
      },
      "vertical",
      {
        text: "C%",
        value: "c",
        type: "password",
        width: "10%",
        sm3: true,
        label: "LabelS",
        placeholder: "Teset"
      },
      {
        text: "Select",
        value: "s",
        select: ["one", "two", "three"],
        chips: true,
        sm3: true,
        width: "20%"
      },
      {
        type: "table",
        text: "Table1",
        value: "table1",
        sm12: true,
        columns: [{ value: "aa" }, { value: "bb" }, { value: "cc" }]
      },
      {
        type: "table",
        text: "Table2",
        value: "table2",
        sm12: true,
        columnss: [
          { value: "a", name: "A" },
          { value: "b", name: "B" },
          { value: "camel-case_test rest" }
        ]
      }
    ],
    conf: {
      a: [1111],
      aa: 1,
      b: true,
      bb: true,
      c: "t3",
      s: ["two"],
      table1: [{ aa: 11, bb: 22, cc: 33 }],
      table2: [
        { a: "1", b: true, "camel-case_test rest": 3, chipsTo_go: ["test"] }
      ]
    }
  },
  mutations: {
    SOCKET_CONNECT(state, status) {
      state.connected = true;
      console.log("Websocket connected.",Vue.prototype);
    },
    SOCKET_DISCONNECT(state, status) {
      state.connected = false;
      console.log("Websocket disconnected!");
    }
  },
  actions: {
    actionConnected({ state, commit }, val) {
      setTimeout(
        () => commit(state.connected ? "SOCKET_DISCONNECT" : "SOCKET_CONNECT"),
        500
      );
    },
    emitSocket({state, commit}, args) {
          return new Promise((res, rej) => {
            let tout = setTimeout(() => rej(new Error("Timeout SocketIo Response to " + args.event + ": " + args.payload), (tout = null)),
              5000
            );
            console.log(args.event, ...args.payload);
            Vue.prototype.$socket.client.emit(args.event, ...args.payload, (err, result) => {
              if (tout) clearTimeout(tout);
              else return rej("Timeout");
              if (err || !result) rej(err ? err : "No result");
              else res(result);
            });
          });
        },
      },
  getters: {
    //    connected: state => state.connected,
    format: state => state.formatConf,
    config: state => state.conf
  }
});
