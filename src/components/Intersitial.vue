<template>
  <div class="intersitial" v-on:click="onTouchPreset" :class="{ fading }">
    <div class="intersitial-contents">
      <table class="intersitial-table">
        <tbody>
          <tr>
            <td class="width-100-x100 height-100-x100 valign-middle">
              <div class="intersitial-title">Tiempología</div>
              <div>
                <img
                  class="intersitial-logo"
                  src="@/components/Forms/icons/heart.png"
                  alt="Heart icon"
                />
              </div>
              <div class="intersitial-subtitle">
                Control del cuerpo y la mente
              </div>
              <div class="intersitial-authory">Por <a href="https://github.com/allnulled">allnulled</a></div>
            </td>
          </tr>
          <tr>
            <td class="width-100-x100 height-100-x100 valign-middle">
                <div style="min-height: 50px;"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Intersitial",
  components: {},
  props: {
    root: {
      type: Object,
      required: true,
    },
    onTouchPreset: {
      type: Function,
      required: true,
    },
  },
  mounted() {
    setTimeout(() => {
      this.fading = true;
      setTimeout(() => {
        this.onTouch();
      }, 3800);
    }, 3000);
  },
  data() {
    return {
      fading: false,
      onTouch: this.onTouchPreset,
    };
  },
  watch: {},
};
</script>

<style>
.intersitial {
  background-color: transparent;
}
.intersitial .intersitial-contents {
  background-color: black;
  color: white;
  opacity: 1;
  transition: opacity 3.7s linear;
}
.intersitial.fading .intersitial-contents {
  opacity: 0;
}
.intersitial {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.intersitial-contents {
  position: relative;
  height: 100%;
  width: 100%;
}
.intersitial-table {
  width: 100%;
  height: 100%;
}
.intersitial-logo {
  width: 140px;
}
.intersitial-title {
  color: white !important;
  font-size: 23px;
  font-weight: bold;
}
.intersitial-subtitle {
  color: white !important;
  font-size: 11px;
  font-weight: bold;
}
.intersitial-authory {
  color: white !important;
  font-size: 9px;
  padding-top: 15px;
}
</style>