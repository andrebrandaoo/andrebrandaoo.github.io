Vue.config.debug = true;

new Vue({
  name: 'app',
  el: '#app',

  data() {
    return {
      currentJob: null,
      interactions: {
        modalJob: false
      },
      emailInvalid: false,
      errors: [],
      form: { name: '', email: '', msg: '', }
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
    },

    validInput: function (input) {
      var index = this.errors.indexOf(event.target.id)

      // Check if email is valid
      if (event.target.id === 'email') {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.emailInvalid = !re.test(event.target.value)
      }

      if ((!event.target.value || this.emailInvalid) && index < 0) {
        this.errors.push(event.target.id)
      }

      if (event.target.value && index > -1) {
        this.errors.splice(index, 1)
      }
    },

    submitForm: function () {
      console.log(this.form)

      mixpanel.track('Contact Form', {
        'name': this.form.name,
        'email': this.form.email,
        'message': this.form.msg
      })
    }
  }
})
