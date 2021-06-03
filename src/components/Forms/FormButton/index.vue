<template>
  <div class="input-component">
    <div class="form-item">
      <div class="form-label">
        <button class="form-button" v-on:click="onClickEvent">{{ label }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormButton",
  components: {},
  props: {
    root: {
      type: Object,
      required: true,
    },
    onClickPreset: {
      type: Function,
      required: false,
    },
    labelPreset: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      label: this.labelPreset || "Click here",
      onClick: this.onClickPreset || undefined,
    };
  },
  methods: {
      onClickEvent($event) {
          if(typeof this.onClick === 'function') {
              this.onClick($event, this);
          }
      }
  },
};
</script>

<style>
</style>