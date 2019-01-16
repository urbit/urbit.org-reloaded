$(function() {
  $('.menu-toggle').on('click', function() {
     $('nav').toggleClass('menu-hide menu-show');
     $('body').toggleClass('overflow-hidden');
  })
});
