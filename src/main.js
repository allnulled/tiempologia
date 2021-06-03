import Vue from 'vue'
import App from './App.vue'
import DataManager from "@/components/DataManager.vue";
import FormSelector from "@/components/Forms/FormSelector/index.vue";
import FormNavigationSelector from "@/components/Forms/FormSelector/FormNavigationSelector.vue";
import FormInput from "@/components/Forms/FormInput/index.vue";
import FormButton from "@/components/Forms/FormButton/index.vue";
import FormMoment from "@/components/Forms/FormMoment/index.vue";
import FormTextarea from "@/components/Forms/FormTextarea/index.vue";
import InicioPage from "@/components/InicioPage.vue";
import ObjetivosPage from "@/components/ObjetivosPage.vue";
import PlanesPage from "@/components/PlanesPage.vue";
import PrototiposPage from "@/components/PrototiposPage.vue";
import EventosPage from "@/components/EventosPage.vue";
import ConfiguracionesPage from "@/components/ConfiguracionesPage.vue";
import Intersitial from "@/components/Intersitial.vue";
import FixedClock from "@/components/FixedClock.vue";
import Footer from "@/components/Footer.vue";

Vue.config.productionTip = false
Vue.component("FormSelector", FormSelector);
Vue.component("FormNavigationSelector", FormNavigationSelector);
Vue.component("FormInput", FormInput);
Vue.component("FormButton", FormButton);
Vue.component("FormMoment", FormMoment);
Vue.component("FormTextarea", FormTextarea);
Vue.component("InicioPage", InicioPage);
Vue.component("ObjetivosPage", ObjetivosPage);
Vue.component("PlanesPage", PlanesPage);
Vue.component("PrototiposPage", PrototiposPage);
Vue.component("EventosPage", EventosPage);
Vue.component("ConfiguracionesPage", ConfiguracionesPage);
Vue.component("FixedClock", FixedClock);
Vue.component("DataManager", DataManager);
Vue.component("Footer", Footer);
Vue.component("Intersitial", Intersitial);

window.noop = () => {};

new Vue({
  render: h => h(App),
}).$mount('#app')
