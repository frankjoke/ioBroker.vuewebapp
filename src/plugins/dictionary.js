import Vue from "vue"

const dictionary = {
    __l: "en",
    test: {
        en: "Test $2 $1"
    }
};

const toadd = {};

function translate(what, ...args) {
    if (!what) return "";

    let i = 0;
    let dl = Vue.prototype.$store && Vue.prototype.$store.state && Vue.prototype.$store.state.lang || "en";
//    debugger;
    if (dictionary[what] && dictionary[what][dl]) 
        what = dictionary[what][dl];
    else {
        let n = {[dl]: "'" + what + "' for '" + dl + "' to be created/edited!"};
        console.log('dictionary:',n[dl])
        toadd[what] = n;
        if (dl !== 'en' && dictionary[what] && dictionary[what]['en']) 
            what = dictionary[what]['en'];
    }
    while (i < args.length) {
        let rs = "$" + (i + 1).toString();
        while (what.indexOf(rs) !== -1) {
            what = what.replace(rs, args[i].toString());
        }
        i++;
    }
    return what;
}

export { translate, dictionary, toadd};