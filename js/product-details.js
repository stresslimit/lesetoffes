var products = module.exports = {
  init: function () {
    products.toggler()
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
  }
}
