/* global functions */

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

const sequenceAnimation = (els, delay, initialDelay, animationClassNames, tidy) => {
  // calculate duration

  setTimeout(() => {
    const ArrayOfItems = Array.from(els);
    const duration = (ArrayOfItems.length * delay) + initialDelay;
  
    // run animation
    ArrayOfItems.forEach((item, i) => {
      item.style.animationDelay = `${(i+1) * delay}ms`;
      item.style.transitionDelay = `${(i+1) * delay}ms`;
      [...animationClassNames].forEach((className) => {
        item.classList.add(className);
      });
      // item.classList.add(animationClassNames);
    });
    
    // remove animation after complete
    tidy && setTimeout(() => {
      ArrayOfItems.forEach(item => {
        [...animationClassNames].forEach((className) => {
          item.classList.add(className);
        });
      })
    }, `${duration}`);
      
  }, initialDelay)
}


export { debounce, sequenceAnimation };