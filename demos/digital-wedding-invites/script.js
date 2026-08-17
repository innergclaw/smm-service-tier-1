const revealItems = document.querySelectorAll('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.14 });
  revealItems.forEach((item) => observer.observe(item));
}

const form = document.querySelector('#wedding-inquiry');
const status = form?.querySelector('.form-status');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    if (status) status.textContent = 'Please complete the required fields so we can begin.';
    return;
  }
  const data = new FormData(form);
  const payload = `NEW WEDDING INVITE INQUIRY\n\nCouple: ${data.get('partnerOne')} + ${data.get('partnerTwo')}\nWedding Date: ${data.get('weddingDate')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')}\nMessage: ${data.get('message') || 'None provided'}`;
  form.dataset.payload = payload;
  if (status) status.textContent = 'Thank you. Your invitation inquiry is ready for a personal follow-up.';
  form.querySelector('button').textContent = 'Inquiry received ↗';
  form.querySelector('button').disabled = true;
  window.location.href = `sms:+12674730397?body=${encodeURIComponent(payload)}`;
});
