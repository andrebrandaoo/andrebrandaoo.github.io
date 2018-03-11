Vue.config.debug = true;
new Vue({
  name: 'app',
  el: '#app',

  data() {
    return {
      currentJob: null,
      interactions: {
        modalJob: false,
        messageSuccess: false
      },
      nameInvalid: false,
      emailInvalid: false,
      msgInvalid: false,
      form: { name: '', email: '', msg: '', }
    }
  },

  // created () {
  //   window.onbeforeunload = function (e) {
  //     e.preventDefault()
  //     this.interactions.modalJob = false
  //   }
  // },

  computed: {
    portfolio: function () {
      return portfolio
    },

    skills: function () {
      return skills
    }
  },

  mounted () {
    // mixpanel.track('Portfólio 2018', {})
  },

  methods: {
    openClickedJob: function (job) {
      this.currentJob = job
      this.interactions.modalJob = true
    },

    validInput: function (event) {

      // Check Name
      if (event.target.id === 'name') {
        this.nameInvalid = event.target.value === '' ? true : false
      }

      // Check if email is valid
      if (event.target.id === 'email') {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.emailInvalid = event.target.value === '' || !re.test(event.target.value) ? true : false
      }

      // Check Message
      if (event.target.id === 'msg') {
        this.msgInvalid = event.target.value === '' ? true : false
      }
    },

    submitForm: function () {
      mixpanel.track('Contact Form', {
        'name': this.form.name,
        'email': this.form.email,
        'message': this.form.msg
      })

      this.interactions.messageSuccess = true
      this.form = { name: '', email: '', msg: '', }
    },

    sendWhatsAppMessage: function () {
      var url = 'https://api.whatsapp.com/send?text=Olá André, vamos conversar sobre meu projeto ?';
      window.open(url, '_system', null);
    }
  }
})
