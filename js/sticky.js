// var Stickyfill = require('wilddeer/stickyfill:dist/stickyfill.min.js')



var sticky = module.exports = {
  init: function () {
    // debugger
    var stickyElements = document.getElementsByClassName('sticky')
    for (var i = stickyElements.length - 1; i >= 0; i--) {
      Stickyfill.add(stickyElements[i]);
    }
  }
}
