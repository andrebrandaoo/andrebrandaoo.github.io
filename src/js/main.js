Vue.config.debug = true;

new Vue({
  name: 'app',
  el: '#app',

  data() {
    return {
      currentJob: null,
      interactions: {
        modalJob: false
      }
    }
  },

  computed: {
    portolio: function () {
      return portfolio
    }
  },

  mounted () {

  },

  methods: {
    openClickedJob: function (job) {
      this.currentJob = job
      this.interactions.modalJob = true
    }
  }
})
