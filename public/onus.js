$('.launch').on('click', function(){
    $('.ui.sidebar')
       .sidebar('toggle');
});


$(document)
.ready(function() {

  // fix menu when passed
  $('.masthead')
    .visibility({
      once: false,
      onBottomPassed: function() {
        $('.fixed.menu').transition('fade in');
      },
      onBottomPassedReverse: function() {
        $('.fixed.menu').transition('fade out');
      }
    })
  ;

  // create sidebar and attach to menu open
  $('.ui.sidebar')
    .sidebar('attach events', '.toc.item')
  ;

})
;

//start button scroll
$('#startButton').on('click', function(e){
  $('.ui.modal').modal('show');
})