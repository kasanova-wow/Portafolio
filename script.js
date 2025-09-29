// Theme toggle
const toggle = document.getElementById('themeToggle');
const root = document.documentElement;
const current = localStorage.getItem('theme');
if(current === 'dark') root.classList.add('dark');

toggle.addEventListener('click', ()=>{
  root.classList.toggle('dark');
  const isDark = root.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  toggle.textContent = isDark ? '☀️' : '🌙';
});

// Contact form submission via Formspree
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const resultEl = document.getElementById('formResult');
    resultEl.textContent = 'Enviando...';
    try{
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      const json = await res.json();
      if(res.ok){
        resultEl.style.color = 'green';
        resultEl.textContent = 'Mensaje enviado correctamente. Gracias.';
        form.reset();
      } else {
        resultEl.style.color = 'crimson';
        resultEl.textContent = json.error || 'Ocurrió un error al enviar.';
      }
    } catch(err){
      resultEl.style.color = 'crimson';
      resultEl.textContent = 'No se pudo conectar al servidor.';
    }
  });
}

