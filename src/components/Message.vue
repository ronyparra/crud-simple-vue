<template>
  <v-snackbar color="green" :value="value" :timeout="timeout">
    <slot />
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="$emit('input', false)">
        <v-icon>fa-times</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  props: {
    value: Boolean,
  },
  data: () => ({
    timeout: 1500,
  }),
  watch: {
    value(v) {
      if (v) setTimeout(() => this.$emit("input", false), this.timeout);
    },
  },
};
</script>
