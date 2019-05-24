//
  // toggling of navigation menus
//

var toggleMainNav = document.getElementById('js-main-nav-toggle');
if (toggleMainNav !== null) {
  toggleMainNav.onclick = function() {
    document.body.classList.toggle('has-active-main-nav');
  }
}

var toggleContentNav = document.getElementById('js-content-nav-toggle');
if (toggleContentNav !== null) {
  toggleContentNav.onclick = function() {
    document.body.classList.toggle('has-active-content-nav');
  }
}

//
  // styling of input fields
//

var inputElements = document.querySelectorAll('input.tlon-input');
for (var i = 0; i < inputElements.length; i++) {
  //listen for changes in input
  inputElements[i].addEventListener('input', function() {
    // if input has a value do this
    if (this.value) {
      var inputContainer = this.parentNode;
      var validInputs = inputContainer.querySelectorAll('input.tlon-input:valid');
      var inputs = inputContainer.querySelectorAll('input.tlon-input');
      if (validInputs.length !== 0) {
        // has valid input
        for (var i = 0; i < validInputs.length; i++) {
          if (this.classList.contains('is-valid') == false ) {
            validInputs[i].parentNode.classList.add('has-valid-input');
          }
        }
      } else {
        // doesn't have valid input
        for (var i = 0; i < inputs.length; i++) {
          inputs[i].parentNode.classList.remove('has-valid-input');
        }
      }
    } else {
      this.parentNode.classList.remove('has-valid-input');
    }
  });
}
