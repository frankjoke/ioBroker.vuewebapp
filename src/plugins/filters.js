import Vue from "vue";
import {
    translate,
    dictionary
} from "./dictionary.js";
import Vuex from "vuex";

const filters = {
    capitalize(value) {
        if (!value) return "";
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
    },
    startcase(value) {
        if (!value) return "";
        value = value.toString();
        return value
            .replace(/[_\-]+/g, " ")
            .replace(/([a-z])([A-Z])/g, (str, $1, $2) => $1 + " " + $2)
            .replace(/(\s|^)(\w)/g, (str, $1, $2) => $1 + $2.toUpperCase());

    },
    /* 
        tt(what, ...args) {
            let i = 0;
            while (i<args.length && what.indexOf("$s")) {
                what = what.replace("$s", args[i++]);
            }
            return what;
        },
     */

    beginnbsp(value) {
        if (!value) return "";
        value = value.toString();
        return '&nbsp;' + value;
    },

    beginsp(value) {
        if (!value) return "";
        value = value.toString();
        return ' ' + value;
    },

    install() {
        Vue.filter("capitalize", this.capitalize);
        Vue.filter("startcase", this.startcase);
        Vue.filter("beginnbsp", this.beginnbsp);
        Vue.filter("beginsp", this.beginsp);
        //        console.log(translate,dictionary);
//        console.log(translate('test', 1, 2), translate('rest', 1));
        Vue.filter("tt", translate);
    },
};

export default filters;