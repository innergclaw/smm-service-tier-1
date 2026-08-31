const splash = document.querySelector('#splash');
const site = document.querySelector('.site-shell');
const enterButton = document.querySelector('#enter-menu');
const cart = document.querySelector('#cart');
const backdrop = document.querySelector('#cart-backdrop');
const cartTrigger = document.querySelector('#cart-trigger');
const cartClose = document.querySelector('#cart-close');
const cartItems = document.querySelector('#cart-items');
const cartCount = document.querySelector('#cart-count');
const cartTotal = document.querySelector('#cart-total');
const checkoutButton = document.querySelector('#checkout-button');
const items = [];

function reveal() {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
}

function openCart() { cart.classList.add('is-open'); backdrop.classList.add('is-visible'); cart.setAttribute('aria-hidden', 'false'); cartTrigger.setAttribute('aria-expanded', 'true'); }
function closeCart() { cart.classList.remove('is-open'); backdrop.classList.remove('is-visible'); cart.setAttribute('aria-hidden', 'true'); cartTrigger.setAttribute('aria-expanded', 'false'); }

function renderCart() {
  cartCount.textContent = items.length;
  if (!items.length) {
    cartItems.innerHTML = '<p class="empty-cart">Your order is empty.<br>Add a cup to get started.</p>';
    cartTotal.textContent = '$0';
    checkoutButton.href = 'mailto:dejafortes16@gmail.com?subject=DeezR%20Treatz%20order';
    return;
  }
  cartItems.innerHTML = items.map((item, index) => `<div class="cart-row"><div><strong>${item.name}</strong><small>12 oz personal cup</small></div><div><strong>$${item.price}</strong><button class="remove-item" data-index="${index}" type="button">remove</button></div></div>`).join('');
  const total = items.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = `$${total}`;
  const lines = items.map((item) => `- ${item.name}: $${item.price}`).join('%0A');
  checkoutButton.href = `mailto:dejafortes16@gmail.com?subject=DeezR%20Treatz%20order&body=${lines}%0A%0ASubtotal:%20$${total}`;
  cartItems.querySelectorAll('.remove-item').forEach((button) => button.addEventListener('click', () => { items.splice(Number(button.dataset.index), 1); renderCart(); }));
}

enterButton.addEventListener('click', () => { splash.classList.add('is-hidden'); site.classList.add('is-visible'); site.setAttribute('aria-hidden', 'false'); document.querySelector('#menu-title').focus?.(); setTimeout(reveal, 500); });
cartTrigger.addEventListener('click', openCart); cartClose.addEventListener('click', closeCart); backdrop.addEventListener('click', closeCart);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeCart(); });
document.querySelectorAll('.product-card').forEach((card) => card.querySelector('.add-button').addEventListener('click', () => { items.push({ name: card.dataset.product, price: Number(card.dataset.price) }); renderCart(); openCart(); card.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.025)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)' }); }));
renderCart();
