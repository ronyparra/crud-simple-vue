<template>
  <div>
    <slot />
    <v-autocomplete
      solo
      color="pink"
      autocomplete="new-password"
      :value="value"
      :rules="rules"
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      :return-object="returnObject"
      @input="$emit('input', $event)"
      :readonly="readonly"
      validate-on-blur
      background-color="grey lighten-4 "
      flat
    ></v-autocomplete>
  </div>
</template>

<script>
export default {
  props: {
    value: [String,Object,Number],
    readonly: Boolean,
    rules: Array,
    items: Array,
    itemText: String,
    itemValue: String,
    returnObject: Boolean,
  },
};
</script>

<style></style>
