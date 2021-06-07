<template>
  <div class="selector-component" :class="{ selected: isSelected }">
    <table class="form-selector-table no-border-table">
      <tbody>
        <tr v-if="label">
          <td colspan="5">
            <div class="form-label">
              {{ label }}
            </div>
          </td>
        </tr>
        <tr>
          <td class="form-input-container-cell">
            <div class="form-input-container">
              <div class="form-input cursor-pointer curved"
                v-on:click="toggleOptions"
                style="min-height: 40px; max-height: 40px; background-color: #FAFAFA;">
                {{ internalValue }}
              </div>
            </div>
          </td>
          <td class="form-input-deployer-container" v-on:click="toggleOptions">
            <div class="form-input-deployer-icon">
              <img
                class="form-input-deployer curved"
                :src="'./img/icons/' + (isSelected ? 'up' : 'down') + '-arrow.png'"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="options-list" v-if="isSelected">
      <div class="options-item" v-if="!possibleValues.length">
        {{ noElementsMessage }}
      </div>
      <div
        class="options-item"
        v-else
        v-for="(possibleValue, indexValue) in possibleValues"
        v-bind:key="indexValue"
        v-on:click="selectValue(indexValue)"
      >
        {{ typeof possibleValue[propertyToShow] === 'string' ? possibleValue[propertyToShow].replace(REGEX_FOR_DATE_IN_THE_END, "") : possibleValue[propertyToShow] }}
      </div>
    </div>

    <div class="error-box" v-if="errorMessage">
      <div class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import store from "@/assets/js/store.js";

export default {
  name: "FormSelector",
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
    propertyToShowPreset: {
      type: String,
      required: false,
    },
    internalValuePreset: {
      type: String,
      required: false,
    },
    possibleValuesPreset: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      REGEX_FOR_DATE_IN_THE_END: store.REGEX_FOR_DATE_IN_THE_END,
      label: typeof this.labelPreset === "string" ? this.labelPreset : "Select any of:",
      propertyToShow: this.propertyToShowPreset || "id",
      internalValue: this.internalValuePreset || undefined,
      possibleValues: this.possibleValuesPreset || [],
      isSelected: false,
      noElementsMessage: "No se encontraron elementos.",
      errorMessage: false,
    };
  },
  watch: {
    internalValue(newValue) {
      if (typeof this.onChangePreset === "function") {
        this.onChangePreset(newValue, this);
      }
    },
  },
  methods: {
    toggleOptions() {
      this.isSelected = !this.isSelected;
    },
    selectValue(index) {
      const selectedItem = this.possibleValues[index];
      const valueBrute = selectedItem[this.propertyToShow];
      this.internalValue = typeof valueBrute === 'string' ? valueBrute.replace(store.REGEX_FOR_DATE_IN_THE_END, "") : valueBrute;
      this.isSelected = false;
    },
  },
};
</script>

<style>
.form-input-deployer-container {
  min-width: 30px;
  min-height: 30px;
}
.form-input-deployer {
  width: 40px;
  height: 40px;
  border-radius: 0pt;
  padding: 10px;
  vertical-align: middle;
  cursor: pointer;
  transition: background-color .2s linear;
}
.form-input-deployer-icon {
  vertical-align: middle;
  -webkit-transition: -webkit-transform 0.8s ease-in-out;
  -ms-transition: -ms-transform 0.8s ease-in-out;
  transition: transform 0.8s ease-in-out;
}
.selector-component.selected .form-input-deployer {
  /*
  transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  */
}
.options-list {
  border: 0px solid transparent;
}
.options-item {
  padding: 10px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  font-size: 12px;
}
.options-item:first-child {
  border-top: none;
}
.options-item:hover {
  background-color: #e0e0e0;
}
.no-border-table {
  border-collapse: collapse;
  border: none;
}
</style>