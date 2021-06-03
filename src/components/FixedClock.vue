<template>
  <div class="fixed-clock-component" v-on:click="toggleMode">
      <div class="fecha-box"></div>
      <div class="hora-box clock-label">
          <span v-if="mode === 'pc'">{{ formatDateReversedTime(now) }}</span>
          <span v-else-if="mode === 'human'">Día {{ formatToDiaSemana(now) }} {{ now.getDate() }} de {{ formatToMesDelAno(now) }} del {{ now.getFullYear() }} a las {{ formatTime(now) }}{{ now.getHours() >= 12 ? "pm" : "am" }}</span>
      </div>
    {{ }}
  </div>
</template>

<script>
import formsUtils from "@/assets/js/forms-utils.js";

let previousId = undefined;

export default {
  name: "FixedClock",
  components: {},
  props: {
    root: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    clearInterval(previousId);
    previousId = setInterval(() => {
        this.now = new Date();
    }, 1000);
  },
  data() {
    return {
      now: new Date(),
      mode: "pc",
    };
  },
  watch: {},
  methods: {
      toggleMode() {
          this.mode = this.mode === "pc" ? "human" : "pc";
      },
    ...formsUtils,
  }
};
</script>

<style>
.fixed-clock-component {
    position: fixed;
    bottom: 0;
    left: 2px;
    opacity: 0.5;
}
.clock-label {
  font-size: 11px;
  padding: 2px;
  border-radius:3pt;
  overflow: hidden;
  cursor: pointer;
}
.clock-label:hover {
  background-color: white;
}
</style>