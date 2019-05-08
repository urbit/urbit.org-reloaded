$(function() {
  //caches a jQuery object containing the header element

  var $intro = $(".stack-intro");
  var $apart = $(".stack-apart");

  var windowHeight
  var apartHeight
  var introTop
  var apartTop

  var computePositions = function() {
    // Find the offset-top for the items
    windowHeight = window.innerHeight
    introTop = $intro.offset().top
    apartTop = $apart.offset().top
    introHeight = $intro.height()
    apartHeight = $apart.height()
  }

  var computeAndCheckPositions = function() {
    computePositions()
    checkScroll()
  }

  var checkScroll = function() {
    computePositions()

    var windowTop = $(window).scrollTop();
    var windowBottom = windowTop + windowHeight

    if (introTop > windowTop && ((introTop+(windowHeight/2)) < windowBottom)) {
        $intro.removeClass('animate-false').addClass('animate-true');
    }
    if (apartTop > windowTop && ((apartTop+(windowHeight/2)) < windowBottom)) {
        $apart.removeClass('animate-false').addClass('animate-true');
    }
  }

  $(window).on('resize',computePositions)
  $(window).on('scroll',checkScroll)

  computeAndCheckPositions()
  setTimeout(computeAndCheckPositions, 1000)
  setTimeout(computeAndCheckPositions, 4000)
  setTimeout(computeAndCheckPositions, 10000)
})

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
