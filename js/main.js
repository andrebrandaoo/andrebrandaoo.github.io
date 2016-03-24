var main = function (){

  //desenho das skills
  $(function() {
    $('.skill').easyPieChart({
      scaleColor: "#ecf0f1",
      lineWidth: 10,
      lineCap: 'butt',
      scaleColor: false,
      barColor: '#4FC2F8',
      trackColor:	"#ecf0f1",
      size: 150,
      animate: 500
    });
  });

  $( "#menu" ).on('click touchstart', function(e) {
    e.preventDefault();
    if($('.toggle-icon').hasClass('fa-bars')){
      e.preventDefault();

      //troca o icon para x
      $( '.toggle-icon' ).removeClass('fa-bars');
      $( '.toggle-icon' ).addClass('fa-close');

      //posiciona o menu na tela
      $('.nav').animate({
        right: "0px"
      }, 200);

      $('body').animate({
        right: "250px"
      }, 200);

      $('.bar').animate({
        right: "250px"
      }, 200);

    }
    else {
      e.preventDefault();

      //troca o icone para bars
      $( '.toggle-icon' ).removeClass('fa-close');
      $( '.toggle-icon' ).addClass('fa-bars');

      //esconde o menu da tela
      $('.nav').animate({
        right: "-250px"
      }, 200);

      $('body').animate({
        right: "0px"
      }, 200);

      $('.bar').animate({
        right: "0px"
      }, 200);

    }
    return false;
  });

};

$(document).ready(main);
