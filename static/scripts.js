var toggleMainNav = document.getElementById('js-main-nav-toggle');
toggleMainNav.onclick = function() {
  document.body.classList.toggle('has-active-main-nav');
}

var toggleContentNav = document.getElementById('js-content-nav-toggle');
toggleContentNav.onclick = function() {
  document.body.classList.toggle('has-active-content-nav');
}
