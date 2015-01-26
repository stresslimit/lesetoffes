var _ = require('jashkenas/underscore:underscore-min.js')
var React = require('reactjs/react-bower@v0.12.1:react.js')
var rq = require('visionmedia/superagent')
var cart = require('./component-cart')



var api = module.exports = {

  cart_container_id: 'cart_container',
  cart_qty_id: 'cart-qty',

  init: function () {
    // event listener initializers
    cart = React.createFactory( cart )
    _.each( document.querySelectorAll('.add-to-cart'), function ( el ) {
      el.addEventListener('submit', function (e) {
        e.preventDefault()
        api.add_to_cart( this )
      })
    })
    _.each( document.querySelectorAll('.show-cart'), function ( el ) {
      el.addEventListener('click', function (e) {
        e.preventDefault()
        api.get_cart()
      })
    })
  },
  show_cart: function ( data ) {
    api.cart_container = document.getElementById(api.cart_container_id)
    // render react component with returned json `data`
    React.render( cart({ data:data, api:api }), api.cart_container )
    // add class to body for css for mobile
    document.body.classList.add('cart-open')
    document.getElementById(api.cart_qty_id).innerHTML = data.item_count
  },
  hide_cart: function (e) {
    e.preventDefault()
    // empty cart container & remove body class
    api.cart_container.innerHTML = ''
    document.body.classList.remove('cart-open')
  },
  add_to_cart: function ( form ) {
    var the_id = form.elements['id'].value
    rq.post('/cart/add.js')
      .send({ id:the_id, quantity:1 })
      .end(function (res) {
        if ( res.ok )
          api.get_cart()
      })
  },
  update_cart: function ( data ) {
    data = 'updates['+ data.id +']='+ data.quantity
    rq.post('/cart/update.js')
      .send( data )
      .end(function (res) {
        if ( res.ok )
          api.show_cart( JSON.parse(res.text) )
      })
  },
  get_cart: function () {
    rq.get('/cart.js?nocache='+ Date.now())
      .end(function (res) {
        if ( res.ok )
          api.show_cart( JSON.parse(res.text) )
      })
  }
}
