var React = require('reactjs/react-bower@v0.12.1:react.js')
var sizes = require('./component-sizes')


var products = module.exports = {
  init: function () {
    products.toggler()
    products.sizes()
  },
  toggler: function () {
    var toggler = document.querySelector('.details-toggler')
    if ( toggler ) {
      var the_a = toggler.querySelector('a')
      var the_div = toggler.querySelector('.details')
      the_a.addEventListener('click', function (e) {
        e.preventDefault()
        the_div.classList.toggle('hidden')
      })
    }
  },
  sizes: function () {
    var s = document.getElementById('size-select')
    if ( s ) {
      sizes = React.createFactory( sizes )
      var options_data = products.get_sizes_data( s )
      React.render( sizes({ data: options_data }), s )
    }
  },
  get_sizes_data: function ( s ) {
    var oo = s.querySelectorAll('option')
    var options_data = []
    for (var i = 0; i < oo.length; ++i) {
      var d = {
        id: parseInt(oo[i].value),
        desc: oo[i].getAttribute('data-desc'),
        available: oo[i].getAttribute('data-available')
      }
      options_data.push( d )
    }
    return options_data
  }
}
