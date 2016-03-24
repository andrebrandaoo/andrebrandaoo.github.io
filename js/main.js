var main = function (){
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

};

$(document).ready(main);
