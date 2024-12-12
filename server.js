import app from './src/app.js';  // Importation du fichier app.js

const port = process.env.PORT || 3000;  // Récupération du port depuis les variables d'environnement ou utiliser le port 3000

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});