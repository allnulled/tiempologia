<template>
  <div class="textarea-component">
    <div class="form-item">
      <div class="form-label">
        {{ label }}
      </div>
      <table class="no-border-table width-100-x100">
        <tbody>
          <tr>
            <td>
              <textarea class="form-input" v-model="internalValue"></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="error-box" v-if="errorMessage">
      <div class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormTextarea",
  components: {},
  props: {
    root: {
      type: Object,
      required: true,
    },
    onChangePreset: {
      type: Function,
      required: false,
    },
    labelPreset: {
      type: String,
      required: false,
    },
    internalValuePreset: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      label: this.labelPreset || "Insert some text:",
      internalValue: this.internalValuePreset || undefined,
      errorMessage: false,
    };
  },
  watch: {
    internalValue(newValue) {
      if (typeof this.onChangePreset === "function") {
        this.onChangePreset(newValue);
      }
    },
  },
};
</script>

<style>
</style>