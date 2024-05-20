document.addEventListener('DOMContentLoaded', () => {
  var addToCartButtons = document.querySelectorAll('.add-to-cart-button')

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      var productContainer = button.closest('.product-container')
      var productId = productContainer.querySelector('small').id

      addToCart(productId)
    })
  })
})

function addToCart(productId) {
  fetch(`/api/carts/65b27a5ef507d3cef38a6589/product/${productId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId }),
  })
}

const logoutBtn = document.getElementById('logout-btn')

logoutBtn.addEventListener('click', async () => {
  try {
    fetch('/api/sessions/logout', {
      method: 'POST',
    }).then((window.location.href = '/login'))
  } catch (error) {
    console.error('Logout failed:', error)
  }
})
