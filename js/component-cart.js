var React = require('reactjs/react-bower@v0.12.1:react.js')
var E = React.DOM


module.exports = React.createClass({
  update: function(e) {
    if ( e.target.value === '' )
      return
    this.props.api.update_cart({
      quantity: parseInt( e.target.value ),
      id: parseInt( e.target.getAttribute('data-item-id') )
    })
  },
  remove: function (e) {
    this.props.api.update_cart({
      quantity: 0,
      id: parseInt( e.target.getAttribute('data-item-id') )
    })
  },
  format_price: function (price) {
    return '$'+ price / 100
  },
  checkout_form: function () {
    return E.form({ className:'cart-checkout-actions', action:'/cart', method:'post' },
            E.input({ type:'submit',
                className:'btn btn-primary btn-inline',
                name:'goto_pp',
                value:'PayPal'
              }),
            E.input({ type:'submit',
                className:'btn btn-primary btn-inline',
                name:'checkout',
                value:'Credit Card'
              })
            )
  },
  render_item: function ( item ) {
    return E.div({ className:'cart-item cf' },
      E.div({ className:'cart-item-thumb', style: { backgroundImage:'url('+item.image+')' } }),
      E.div({ className:'cart-item-desc' },
        E.div({ className:'cart-item-delete', 'data-item-id': item.id, onClick: this.remove }, '×' ),
        E.div({ className:'cart-item-vendor title-uc' }, item.vendor ),
        E.div({ className:'cart-item-product-title' }, item.product_title ),
        E.div({ className:'cart-item-variant-title' }, item.variant_title ),
        E.div({ className:'cart-item-line-price' }, this.format_price( item.line_price ) ),
        E.p({},
          E.input({
              type: 'number',
              pattern: '\\d*',
              defaultValue: item.quantity,
              'data-item-id': item.id,
              onChange: this.update
            },
            ' × ', this.format_price( item.price )
          )
        )
      )
    )
  },
  render: function() {
    return E.div({ className:'cart' },
            E.a({ className:'cart-close', href:'', onClick: this.props.api.hide_cart }, '×' ),
            E.h3({ className:'cart-title title-md title-uc' }, 'Your Shopping Bag' ),
            (
            this.props.data.items.length >=1
            ?
              E.div({},
                this.props.data.items.map( this.render_item ),
                E.h4({ className:'cart-total' }, 'Subtotal '+ this.format_price( this.props.data.total_price )),
                E.h3({ className:'cart-title title-md title-uc clear' }, 'Check Out Now' ),
                this.checkout_form()
              )
            :
              E.p({}, 'Nothing in your cart yet!')
            ),
            E.hr(),
            E.a({ href:'/collections', onClick: this.props.api.hide_cart }, 'Continue Shopping' )
          )
  }
})
