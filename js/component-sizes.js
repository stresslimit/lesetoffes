var React = require('reactjs/react-bower@v0.12.1:react.js')
var E = React.DOM


module.exports = React.createClass({
  getInitialState: function () {
    return {
      selected_id: null
    }
  },
  render: function () {
    var sl = this.state.selected_id
    console.log(sl)
    var tt = this // not sure this is a good idea, but it works. used in onClick below
    return E.div({ className: 'sizes' },
      E.input({ type: 'hidden', name: 'id', value: sl }),
      this.props.data.map(function ( size ) {
        return E.a({
          onClick: function () {
            if ( size.available == 0 ) return
              tt.setState({ selected_id: size.id })
            },
            className: 'btn btn-secondary btn-inline '
            + ( size.available > 0 ? 'available' : 'out-of-stock' )
            +' '+ ( size.id === sl ? 'active' : '' )
          },
          size.desc
        )
      })
    )
  }
})
