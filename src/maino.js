import Vue from "vue";
import './plugins/vuetify'
import "./plugins/vuetify";
import App from "./App.vue";
import store from "./store";
import FjIcon from "./components/fj-icon";
import FjBtn from "./components/fj-btn";
import FjConfig from "./components/fj-config";
import FjConfigItem from "./components/fj-config-item";
import FjDialogQuestion from "./components/fj-dialog-question";
import FjDataTable from "./components/fj-data-table";
import FjDataObject from "./components/fj-data-object";
import FjDataItem from "./components/fj-data-item";

import io from "socket.io-client";
import VueSocketio from "vue-socket.io-extended";
//import FjSocketio from "./components/fj-socketio";

Vue.prototype.$filters = Vue.options.filters;

Vue.config.productionTip = false;

Vue.component("FjIcon", FjIcon);
Vue.component("FjBtn", FjBtn);
Vue.component("FjDataItem", FjDataItem);
Vue.component("FjDialogQuestion", FjDialogQuestion);
Vue.component("FjDataTable", FjDataTable);
Vue.component("FjDataObject", FjDataObject);
Vue.component("FjConfig", FjConfig);
Vue.component("FjConfigItem", FjConfigItem);

Vue.filter("capitalize", function(value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("startcase", function(value) {
  if (!value) return "";
  value = value.toString();
  return value
    .replace(/[_\-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, (str, $1, $2) => $1 + " " + $2)
    .replace(/(\s|^)(\w)/g, (str, $1, $2) => $1 + $2.toUpperCase());
});

const GetSockets = {
  install: function(Vue, options = {}) {
    Vue.prototype.$ioemit = function(ev, ...data) {
      return new Promise((res, rej) => {
        let tout = setTimeout(
          () =>
            rej(new Error("Timeout SocketIo Response to " + ev), (tout = null)),
          options.timeout || 5000
        );
        Vue.prototype.$socket.emit(ev, ...data, (err, result) => {
          if (tout) clearTimeout(tout);
          if (err || !result) rej(err ? err : "No result");
          else res(result);
        });
      });
    };
    if (options.store) options.store.$ioemit = Vue.prototype.$ioemit;
  }
};

Vue.use(VueSocketio, io("ws://vmraspi:8081"), { store });
Vue.use(GetSockets, { store });

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
