<template>
  <div class="moment-component">
    <div class="form-item">
      <div class="form-label">
        {{ label }}
      </div>
      <table class="no-border-table width-100-x100 moment-table">
        <tbody>
          <tr>
            <td class="width-50-x100">
              <input
                ref="dateRef"
                class="form-input"
                type="date"
                v-model="internalValueForDate"
              />
            </td>
            <td class="width-50-x100">
              <input
                ref="timeRef"
                class="form-input"
                type="time"
                v-model="internalValueForTime"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="error-box" v-if="errorMessage">
        <div class="error-message">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import formsUtils from "@/assets/js/forms-utils.js"

export default {
  name: "FormMoment",
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
    internalValueForDatePreset: {
      type: String,
      required: false,
    },
    internalValueForTimePreset: {
      type: String,
      required: false,
    },
  },
  mounted() {
    const currentDate = this.internalValuePreset || new Date();
    const date = this.formatDateReversed(currentDate);
    const time = this.formatTime(currentDate);
    this.internalValueForTime = time;
    this.internalValueForDate = date;
    if (typeof this.onChangePreset === "function") {
      this.onChangePreset(`${date} ${time}`);
    }
  },
  data() {
    return {
      label: this.labelPreset || "Set a date:",
      internalValue: undefined,
      internalValueForDate: this.internalValueForDatePreset || undefined,
      internalValueForTime: this.internalValueForTimePreset || undefined,
      errorMessage: false,
    };
  },
  watch: {
    internalValueForDate(newValue) {
      if(typeof newValue === "undefined") return;
      this.internalValue = newValue + " " + this.internalValueForTime;
    },
    internalValueForTime(newValue) {
      if(typeof newValue === "undefined") return;
      this.internalValue = this.internalValueForDate + " " + newValue;
    },
    internalValue(newValue) {
      if (typeof this.onChangePreset === "function") {
        this.onChangePreset(newValue);
      }
    },
  },
  methods: {
    ...formsUtils
  }
};
</script>

<style>
.moment-table {
  margin-left: -1px;
}
</style>