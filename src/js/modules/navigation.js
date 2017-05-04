import $ from 'jquery'
import 'slick-carousel'

$(document).ready(() => {

  $('.changeSection').on('click', (e) => {
    e.preventDefault()

    const target = $(e.currentTarget.attributes[2].nodeValue)
    const positionTarget = target.offset()
    const transitionTime = 500

    $('html, body').animate({
      scrollTop: positionTarget.top
    }, transitionTime)

    setTimeout(() => {
      window.location.hash = e.currentTarget.attributes[2].nodeValue
    }, transitionTime)

  })

})
