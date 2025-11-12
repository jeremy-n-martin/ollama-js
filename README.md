### Ollama JS - Démo minimale (navigateur)

Cette démo est une page web simple (`index.html` + `app.js`) qui envoie une requête à un serveur Ollama local et affiche la réponse. Aucune dépendance front n’est requise; on utilise l’API HTTP d’Ollama.

### Prérequis

- **Node.js** ≥ 18 (pour lancer un petit serveur statique via `npx http-server`)
- **Ollama** installé et en cours d’exécution en local
- macOS, Linux ou Windows

### Installer Ollama

- macOS (Homebrew) :

```bash
brew install ollama
```

- Linux : suivez la documentation officielle d’Ollama (`https://ollama.com/download`)
- Windows : installez via l’installeur officiel (`https://ollama.com/download`)

### Démarrage du service Ollama

Test rapide :

```bash
ollama serve &>/dev/null &            # (optionnel) lance en arrière-plan si non démarré
curl -sS http://localhost:11434/api/version
```

Si la commande `curl` échoue, lancez explicitement :

```bash
ollama serve
```

### Télécharger un modèle

Exemple avec Qwen 3 (4B) :

```bash
ollama pull qwen3:4b
```

Vous pouvez aussi utiliser un autre modèle (ex. `gemma3`, `llama3.1`, etc.). Vérifiez la liste :

```bash
ollama list
```

### Autoriser CORS (accès depuis le navigateur)

Pour éviter l’erreur “TypeError: Failed to fetch”, exposez l’origine du serveur statique (ex. `http://localhost:3000`) via la variable d’environnement `OLLAMA_ORIGINS`.

- Si vous démarrez Ollama dans un terminal :

```bash
export OLLAMA_ORIGINS="http://localhost:3000,http://127.0.0.1:3000"
ollama serve
```

En développement uniquement, vous pouvez utiliser `"*"` :

```bash
export OLLAMA_ORIGINS="*"
ollama serve
```

- Si vous utilisez l’app macOS (service launchd) :

```bash
launchctl setenv OLLAMA_ORIGINS "http://localhost:3000,http://127.0.0.1:3000"
launchctl kickstart -k gui/$UID/ai.ollama
```

### Lancer la démo

Dans ce dossier :

```bash
cd /Users/ynphea/Dev/ollama-js
npx http-server -p 3000 .
```

Puis ouvrez `http://localhost:3000` dans votre navigateur.

- Dans le champ “Modèle”, entrez `qwen3:4b` (ou laissez la valeur par défaut et changez-la).
- Dans “Message”, tapez votre prompt.
- Cliquez “Envoyer” : la réponse du modèle s’affiche.

### Vérifier l’API Ollama manuellement

Si besoin, testez l’API HTTP directement :

```bash
curl -s http://localhost:11434/api/chat \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "qwen3:4b",
    "messages": [{"role":"user","content":"Bonjour, peux-tu te présenter ?"}],
    "stream": false
  }'
```

### Dépannage

- **TypeError: Failed to fetch**
  - Servez la page via HTTP (pas `file://`) : `npx http-server -p 3000 .`
  - Assurez-vous que `OLLAMA_ORIGINS` inclut l’origine de votre page (ex. `http://localhost:3000`)
  - Vérifiez qu’Ollama répond : `curl -sS http://localhost:11434/api/version`
- **404/Modèle introuvable** : exécutez `ollama pull qwen3:4b` ou changez le champ “Modèle”.
- **Conflit de port 3000** : utilisez un autre port : `npx http-server -p 5173 .` et adaptez `OLLAMA_ORIGINS`.
- **App macOS** : pour (ré)appliquer `OLLAMA_ORIGINS`, utilisez `launchctl setenv …` puis `launchctl kickstart -k gui/$UID/ai.ollama`.
- **Pare-feu** : autorisez les connexions locales pour le port Ollama (11434) et votre serveur statique.

### Détails d’implémentation

- Fichiers :
  - `index.html` : interface minimale (sélection du modèle, prompt, affichage de la réponse).
  - `app.js` : envoi d’une requête POST à `http://localhost:11434/api/chat` avec `{ model, messages, stream: false }`.
- Aucun build requis, pas de dépendances front.
- Le modèle par défaut dans l’UI est `gemma3`, mais vous pouvez saisir `qwen3:4b`.

### Scripts (optionnels)

Si vous préférez un script npm pour servir le dossier, vous pouvez ajouter ceci à votre `package.json` :

```json
{
  "scripts": {
    "serve": "http-server -p 3000 ."
  }
}
```

Puis exécuter :

```bash
npm run serve
```

### Licence

Usage à des fins de démonstration. Adaptez selon vos besoins.
