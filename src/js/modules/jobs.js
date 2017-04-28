import $ from 'jquery'
import 'slick-carousel'

$(document).ready(() => {

  $('#jobs-list').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    focusOnSelect: true,
    prevArrow: '<button type="button" class="prevArrow button icon"><i class="fa fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="nextArrow button icon"><i class="fa fa-chevron-right"></i></button>'
  })

})
