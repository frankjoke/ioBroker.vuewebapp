<template>
  <v-dialog v-model="show" :max-width="maxwidth">
    <v-card>
      <v-card-title class="headline">{{value}}</v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="!!ok" small color="error" flat="flat" @click.stop="clicked(true)">
          {{ok}}
          <v-icon right small>{{iconok}}</v-icon>
        </v-btn>
        <v-btn v-if="!!cancel" small color="primary" flat="flat" @click.stop="clicked(false)">
          {{cancel}}
          <v-icon right small>{{iconcancel}}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "fj-dialog-question",
  props: {
    value: {
      validator(value) {
        // The value must match one of these strings
        return ["string", "boolean", "undefined"].indexOf(typeof value) !== -1;
      },
      default: false
    },
    ok: { type: String, default: "Ok" },
    cancel: { type: String, default: "Cancel" },
    iconok: { type: String, default: "mdi-check" },
    iconcancel: { type: String, default: "mdi-cancel" },
    colorok: { type: String, default: "success" },
    colorcancel: { type: String, default: "error" },
    event: { type: String, default: "ok" },
    arg: { type: String, default: undefined },
    maxwidth: { type: Number, default: 600 }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    clicked(what) {
      //      console.log(what);
      this.$emit("input", what);
      if (what) this.$emit("Ok", true);
      this.show = false;
    }
  },
  watch: {
    value(newv, oldv) {
      //      console.log(newv, oldv);
      this.show = typeof newv == "string" && newv;
    },
    show() {
      if (!this.show && this.value) this.clicked(false);
    }
  }
};
</script>

<style>
</style>