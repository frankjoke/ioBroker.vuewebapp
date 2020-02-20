const helper = {
  startCase(str) {
    return str
      .replace(/[_\-]+/g, " ")
      .replace(/([a-z])([A-Z])/g, (str, $1, $2) => $1 + " " + $2)
      .replace(/(\s|^)(\w)/g, (str, $1, $2) => $1 + $2.toUpperCase());
  },

  getType(obj) {
    return Object.prototype.toString
      .call(obj)
      .replace(/^\[object (.+)\]$/, "$1")
      .toLowerCase();
  },
  getFormat(v, f = {}) {
    if (typeof f == "string") f = { value: f };
    let i = Object.assign({}, f);
    let typ = helper.getType(v);
    if (!i.value && i.name) i.value = i.name;
    if (!i.text) i.text = helper.startCase(i.value);
    //    if (!i.id) i.id = i.text + "_" + i.value;
    if (!i.type && i.select) i.type = "select";
    if (!i.type)
      switch (typ) {
        case "boolean":
        case "number":
        case "string":
          i.type = typ;
          break;
        case "array":
          i.type = "chips";
          break;
        default:
          i.type = "string";
          break;
      }
    else if (typeof i.type !== "string") i.type = "string";
    if (i.type == "chips" || i.type == "select")
      i.select = Array.isArray(i.select)
        ? i.select
        : typeof i.select == "string"
        ? i.select.split(",").map(x => x.trim())
        : [];
    if (i.type == "select" && typ == "array") i.multiple = true;
    if (i.type == "textarea" && i.autoGrow) i.rows = 1;
    //    console.log(i);
    return i;
  }
};

export default helper;
