import 'typeface-roboto';
// import 'material-design-icons-iconfont/dist/material-design-icons.css';
//import '@mdi/font/css/materialdesignicons.css';

import Vue from "vue";
//import "./plugins/vuetify";
import * as FS from 'file-saver';

import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import store from "./store";
import FjIcon from "./components/fj-icon";
import FjBtn from "./components/fj-btn";
//import FjFileloader from "./components/fj-fileloader";
import FjConfig from "./components/fj-config";
import FjConfigItem from "./components/fj-config-item";
import FjDialogQuestion from "./components/fj-dialog-question";
import FjDataTable from "./components/fj-data-table";
import FjDataObject from "./components/fj-data-object";
import FjDataItem from "./components/fj-data-item";

import io from "socket.io-client";
import VueSocketIoExt from "vue-socket.io-extended";
import filters from "./plugins/filters.js";

Vue.prototype.$filters = Vue.options.filters;

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.component("FjIcon", FjIcon);
Vue.component("FjBtn", FjBtn);
//Vue.component("FjFileloader", FjFileloader);
Vue.component("FjDataItem", FjDataItem);
Vue.component("FjDialogQuestion", FjDialogQuestion);
Vue.component("FjDataTable", FjDataTable);
Vue.component("FjDataObject", FjDataObject);
Vue.component("FjConfig", FjConfig);
Vue.component("FjConfigItem", FjConfigItem);

/* 
const GetSockets = {
  install: function(Vue, options = {}) {
    // console.log("install send event:", options);
    Vue.prototype.$ioemit = function(ev, ...data) {
      // console.log("send event:", ev, ...data);
      return new Promise((res, rej) => {
        let tout = setTimeout(
          () =>
            rej(new Error("Timeout SocketIo Response to " + ev), (tout = null)),
          options.timeout || 5000
        );
        Vue.prototype.$socket.client.emit(ev, ...data, (err, result) => {
          if (tout) clearTimeout(tout);
          else return rej("Timeout");
          tout = null;
          if (err || !result) rej(err ? err : "No result");
          else res(result);
        });
      });
    };
    if (options.store) options.store.$ioemit = Vue.prototype.$ioemit;
  }
};
Vue.use(GetSockets, { store });
 */
Vue.use(VueSocketIoExt, io("ws://vmraspi:8081"), { store });
Vue.prototype.$store = store;
Vue.prototype.$FS = FS;
filters.install();

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
