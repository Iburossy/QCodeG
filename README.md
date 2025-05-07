# 🎯 Générateur de QR Code

Une application web moderne et professionnelle, sans backend, permettant de générer un QR Code personnalisé à partir d'une URL et de le télécharger en différents formats (PNG, JPG, JPEG, SVG, PDF).

![Aperçu de l'application](https://via.placeholder.com/800x450.png?text=QcodeG+-+G%C3%A9n%C3%A9rateur+de+QR+Code)

## ✅ Fonctionnalités

- Génération instantanée de QR Code
- Personnalisation complète :
  - Couleur des points
  - Couleur de fond
  - Style des points (arrondi, carré, points)
  - Taille du QR code
- Support des formats de téléchargement : PNG, JPG, JPEG, SVG, PDF
- Validation d'URL et gestion des erreurs
- Interface utilisateur intuitive avec feedback visuel
- Design responsive et moderne avec Tailwind CSS
- Accessibilité optimisée (attributs ARIA, labels, etc.)

## 💻 Installation

### Prérequis

Aucune dépendance à installer. L'application fonctionne entièrement dans le navigateur.

### Méthode 1 : Téléchargement direct

1. Téléchargez ou clonez ce dépôt
2. Ouvrez le fichier `index.html` dans votre navigateur

### Méthode 2 : Serveur local

Pour un développement local avec rechargement automatique, vous pouvez utiliser un serveur local comme [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) pour VS Code.

```bash
# Avec Python
python -m http.server

# Avec Node.js et npx
npx serve
```

## 📝 Guide d'utilisation

1. Entrez une URL valide dans le champ de saisie (doit commencer par http:// ou https://)
2. (Optionnel) Personnalisez votre QR code avec les options disponibles
3. Cliquez sur "Générer le QR Code"
4. Une fois généré, choisissez le format de téléchargement souhaité

## 🚀 Technologies utilisées

- **Frontend** : HTML5, CSS3, JavaScript (ES6+)
- **Frameworks/Librairies** :
  - [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
  - [QR Code Styling](https://github.com/kozakdenys/qr-code-styling) - Génération de QR codes personnalisés
  - [jsPDF](https://github.com/parallax/jsPDF) - Génération de PDF côté client

## 🧱 Structure du projet

```
/
├── assets/         # Ressources statiques (images, etc.)
├── css/            # Styles CSS
│   └── styles.css   # Styles personnalisés
│   └── tailwind.css # Styles Tailwind (si compilé localement)
├── js/             # Scripts JavaScript
│   ├── libs/        # Librairies externes
│   └── main.js      # Script principal
├── favicon.ico     # Favicon du site
├── index.html      # Page principale
└── README.md       # Documentation
```

## 💬 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou soumettre une pull request.

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 🔒 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

## 👨‍💻 Auteur

- Votre Nom - [Votre Site Web](https://votresite.com) - [GitHub](https://github.com/username)

---

Créé avec ❤️ et JavaScript.
