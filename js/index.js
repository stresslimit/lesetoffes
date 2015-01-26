var doc_ready = require('desandro/doc-ready')
var product_details = require('./product-details')
var sticky = require('./sticky')
var api = require('./api')



doc_ready(function() {

  api.init()
  product_details.init()
  sticky.init()

})
