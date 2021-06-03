<template>
  <div class="navigation-selector-component" :class="{ selected: isSelected }">
    <div class="text-align-center">
      <div class="display-inline-block">
        <table class="no-border-table">
          <tbody>
            <tr class="navigation-list">
              <td
                v-for="(possibleItem, possibleIndex) in possibleValues"
                v-bind:key="possibleIndex"
                class="text-align-center navigation-item"
                :class="{
                  selected: possibleItem[propertyToShow] === internalValue,
                }"
                v-on:click="selectValue(possibleIndex)"
              >
                <img
                  class="navigation-icon"
                  :src="formatIconPath(possibleItem)"
                />
                <span class="navigation-icon-label">{{
                  possibleItem[propertyToShow]
                }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
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
      label:
        typeof this.labelPreset === "string"
          ? this.labelPreset
          : "Select any of:",
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
      this.internalValue = selectedItem[this.propertyToShow];
      this.isSelected = false;
    },
    formatIconPath(possibleItem) {
      return require("@/components/Forms/icons/" +
        possibleItem[this.propertyToShow].toLowerCase() +
        "-icon.png");
    },
  },
};
</script>

<style>
.navigation-item {
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s linear;
  vertical-align: top;
  padding: 2px;
  width: 15.1666%;
  overflow: hidden;
  padding: 5px;
}
.navigation-item:hover {
  background-color: #e0e0e0;
}
.navigation-item.selected {
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
}
.navigation-icon {
  vertical-align: top;
  max-width: 40px;
}
.navigation-icon-label {
  display: none;
  text-align: center;
  font-size: 9px;
  padding-top: 4px;
}
</style>