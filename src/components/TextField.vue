<template>
  <div>
    <slot />
    <v-text-field
      solo
      :value="value"
      :prefix="prefix"
      :rules="rules"
      :type="type"
      color="pink"
      autocomplete="new-password"
      @input="$emit('input', $event)"
      :readonly="readonly"
      validate-on-blur
      background-color="grey lighten-4 "
      flat
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    value: [String,Number],
    readonly: Boolean,
    rules: Array,
    prefix: String,
    type: String
  },
};
</script>

<style></style>
