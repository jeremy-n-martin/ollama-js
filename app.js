(() => {
  const $ = (id) => document.getElementById(id);
  const sendBtn = $('send');
  const modelInput = $('model');
  const promptInput = $('prompt');
  const output = $('output');
  const status = $('status');

  async function chatOnce() {
    const model = modelInput.value.trim() || 'qwen3:4b';
    const content = promptInput.value.trim() || 'Say hello';
    output.textContent = '';
    status.textContent = 'Envoi en cours…';
    sendBtn.disabled = true;

    try {
      const res = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content }],
          stream: false
        })
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status} ${res.statusText} — ${text}`);
      }

      const data = await res.json();
      const message = data?.message?.content ?? '(réponse vide)';
      output.textContent = message;
      status.textContent = 'Terminé';
    } catch (err) {
      output.textContent = String(err);
      status.textContent = 'Erreur';
    } finally {
      sendBtn.disabled = false;
    }
  }

  sendBtn.addEventListener('click', chatOnce);
})();


