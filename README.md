## Ollama JS - Démo minimale (navigateur)

Cette démo est une page web simple (`index.html` + `app.js`) qui envoie une requête à un serveur Ollama local et affiche la réponse. Aucune dépendance front n’est requise; on utilise l’API HTTP d’Ollama.

### Prérequis

- **Node.js** ≥ 18 (pour lancer un petit serveur statique via `npx http-server`)
- **Ollama** installé et en cours d’exécution en local

### Server local ollama

Installer Ollama puis puller un modèle LLM (Ollama tourne en fond)
```bash
ollama pull qwen3:4b
```

Exemple de test
```bash
curl http://localhost:11434/api/chat -d '{
  "model": "gemma3",
  "messages": [{
    "role": "user",
    "content": "Hello there!"
  }],
  "stream": false
}'
```

### Lancer la démo

```bash
npm i
npx http-server -p 3000 .
```

Puis ouvrez `http://localhost:3000` dans votre navigateur.

### Détails d’implémentation

- `index.html` : interface minimale (sélection du modèle, prompt, affichage de la réponse).
- `app.js` : envoi d’une requête POST à `http://localhost:11434/api/chat` avec `{ model, messages, stream: false }`.
