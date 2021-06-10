<template>
  <v-btn text small rounded class="text-capitalize" @click="$emit('click')">
    <v-icon color="grey" x-small class="mr-2" >
      {{ icon }}
    </v-icon>
    <slot />
  </v-btn>
</template>
<script>
export default {
  props: {
    icon: String,
  },
};
</script>
