$(function() {
  $('.menu-toggle').on('click', function() {
     $('nav').toggleClass('menu-hide menu-show');
     $('body').toggleClass('overflow-hidden');
  })
});

$(function() {
  $('.sidebar-toggle').on('click', function() {
     $('#sidebar-mobile').toggleClass('sidebar-hide sidebar-show');
     $('body').toggleClass('overflow-hidden');
  })
});
