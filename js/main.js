/**
 * Générateur de QR Code - Script principal
 * Permet de générer des QR codes personnalisés et de les télécharger
 * dans différents formats (PNG, JPG, JPEG, SVG, PDF).
 * Version Web classique avec support de logo et texte
 */

// Sélection des éléments DOM principaux
const qrContainer = document.getElementById("qr-container");
const generateBtn = document.getElementById("generate-btn");
const urlInput = document.getElementById("url-input");
const downloadOptions = document.getElementById("download-options");
const feedbackMessage = document.getElementById("feedback-message");
const loadingIndicator = document.getElementById("loading-indicator");
const downloadFeedback = document.getElementById("download-feedback");

// Sélection des onglets
const tabStyle = document.getElementById("tab-style");
const tabLogo = document.getElementById("tab-logo");
const tabText = document.getElementById("tab-text");
const styleOptions = document.getElementById("style-options");
const logoOptions = document.getElementById("logo-options");
const textOptions = document.getElementById("text-options");

// Sélection des éléments de personnalisation de style
const dotColor = document.getElementById("dot-color");
const bgColor = document.getElementById("bg-color");
const dotStyle = document.getElementById("dot-style");
const qrSize = document.getElementById("qr-size");
const cornerStyle = document.getElementById("corner-style");
const cornerDotStyle = document.getElementById("corner-dot-style");

// Sélection des éléments de personnalisation du logo
const logoUpload = document.getElementById("logo-upload");
const logoPreview = document.getElementById("logo-preview");
const logoSize = document.getElementById("logo-size");
const logoSizeValue = document.getElementById("logo-size-value");
const logoRemove = document.getElementById("logo-remove");

// Sélection des éléments de personnalisation du texte
const textContent = document.getElementById("text-content");
const textColor = document.getElementById("text-color");
const textSize = document.getElementById("text-size");
const textFont = document.getElementById("text-font");

// Modal À propos
const aboutBtn = document.getElementById("about-btn");
const aboutModal = document.getElementById("about-modal");
const closeModal = document.getElementById("close-modal");

let qrCode = null;
let currentUrl = "";
let logoImage = null;
let canvasWithText = null;

/**
 * Fonctions utilitaires
 */

// Validation d'URL
function isValidURL(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (e) {
    return false;
  }
}

// Affichage d'un message de feedback général
function showFeedback(msg, isError = true) {
  feedbackMessage.textContent = msg;
  feedbackMessage.style.display = msg ? "block" : "none";
  feedbackMessage.classList.toggle("text-red-500", isError);
  feedbackMessage.classList.toggle("text-green-600", !isError);
}

// Affichage d'un message de feedback pour le téléchargement
function showDownloadFeedback(msg) {
  if (!msg) {
    downloadFeedback.style.display = "none";
    return;
  }
  downloadFeedback.textContent = msg;
  downloadFeedback.style.display = "block";
  
  // Masquer le message après 3 secondes
  setTimeout(() => {
    downloadFeedback.style.display = "none";
  }, 3000);
}

// Afficher/masquer l'indicateur de chargement
function toggleLoading(show) {
  loadingIndicator.classList.toggle("hidden", !show);
}

// Gestion des onglets
function setupTabs() {
  // Fonction pour activer un onglet
  function activateTab(tab, content) {
    // Désactiver tous les onglets
    // Logo temporairement désactivé
    [tabStyle, tabText].forEach(t => t.classList.remove("active"));
    [styleOptions, textOptions].forEach(c => c.classList.remove("active"));
    
    // Activer l'onglet sélectionné
    tab.classList.add("active");
    content.classList.add("active");
  }
  
  // Écouteurs d'événements pour les onglets
  tabStyle.addEventListener("click", () => activateTab(tabStyle, styleOptions));
  // Logo temporairement désactivé
  // tabLogo.addEventListener("click", () => activateTab(tabLogo, logoOptions));
  tabText.addEventListener("click", () => activateTab(tabText, textOptions));
}

// Gestion du logo (temporairement désactivée)
/*
function setupLogoHandlers() {
  // Cette fonction est temporairement désactivée
  // La fonctionnalité d'ajout de logo sera implémentée ultérieurement
  console.log("Fonctionnalité d'ajout de logo désactivée");
}*/

// Fonction vide pour éviter les erreurs
function setupLogoHandlers() {
  // Fonctionnalité désactivée temporairement
}

// Gérer les options de texte
function setupTextHandlers() {
  [textContent, textColor, textSize, textFont].forEach(element => {
    element.addEventListener("input", () => {
      if (qrCode && currentUrl) {
        generateQRCode(currentUrl);
      }
    });
  });
}

// Générer le QR code avec les options actuelles
function generateQRCode(url) {
  // Nettoyage précédent
  qrContainer.innerHTML = "";
  currentUrl = url;
  
  // Récupération des options de personnalisation de style
  const size = parseInt(qrSize.value);
  const dotColorValue = dotColor.value;
  const bgColorValue = bgColor.value;
  const dotStyleValue = dotStyle.value;
  const cornerStyleValue = cornerStyle.value;
  const cornerDotStyleValue = cornerDotStyle.value;
  
  // Options pour le logo
  let logoOptions = {};
  if (logoImage) {
    try {
      logoOptions = {
        image: logoImage,
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 5,
          imageSize: parseFloat(logoSize.value) / 100
        }
      };
    } catch (logoErr) {
      console.error("Erreur lors de la configuration du logo:", logoErr);
      showFeedback("Erreur lors de l'ajout du logo au QR code.");
    }
  }
  
  // Génération du QR code avec les options personnalisées
  try {
    // Créer les options de base
    const qrOptions = {
      width: size,
      height: size,
      data: url,
      dotsOptions: {
        color: dotColorValue,
        type: dotStyleValue
      },
      cornersSquareOptions: {
        type: cornerStyleValue,
        color: dotColorValue
      },
      cornersDotOptions: {
        type: cornerDotStyleValue,
        color: dotColorValue
      },
      backgroundOptions: {
        color: bgColorValue,
      }
    };
    
    // Fonctionnalité d'ajout de logo temporairement désactivée
    // La section ci-dessous est commentée pour être implémentée ultérieurement
    /*
    if (window.logoDataUrl && logoImage) {
      try {
        const newLogoImage = new Image();
        newLogoImage.src = window.logoDataUrl;
        
        qrOptions.image = newLogoImage;
        qrOptions.imageOptions = {
          crossOrigin: "anonymous",
          margin: 5,
          imageSize: parseFloat(logoSize.value) / 100
        };
      } catch (logoErr) {
        console.error("Erreur lors de l'ajout du logo au QR code:", logoErr);
      }
    }
    */
    
    // Créer le QR code
    qrCode = new QRCodeStyling(qrOptions);
    
    // Ajouter le QR code au conteneur
    qrCode.append(qrContainer);
    
    // Ajouter le texte si nécessaire
    if (textContent.value.trim()) {
      addTextToQRCode();
    }
    
    return true;
  } catch (err) {
    console.error("Erreur lors de la génération du QR Code:", err);
    return false;
  }
}

// Ajouter du texte sous le QR code
function addTextToQRCode() {
  // Attendre que le QR code soit généré
  setTimeout(() => {
    const canvas = qrContainer.querySelector("canvas");
    if (!canvas) return;
    
    // Créer un nouveau canvas pour le texte
    canvasWithText = document.createElement("canvas");
    const ctx = canvasWithText.getContext("2d");
    
    // Déterminer la taille du texte
    let fontSize = 16; // Par défaut
    switch(textSize.value) {
      case "small":
        fontSize = 14;
        break;
      case "medium":
        fontSize = 18;
        break;
      case "large":
        fontSize = 24;
        break;
    }
    
    // Configurer le texte
    const text = textContent.value.trim();
    ctx.font = `${fontSize}px ${textFont.value}`;
    ctx.fillStyle = textColor.value;
    ctx.textAlign = "center";
    
    // Calculer les dimensions du canvas
    const textWidth = ctx.measureText(text).width;
    const qrWidth = canvas.width;
    const qrHeight = canvas.height;
    const padding = 20;
    const totalWidth = Math.max(qrWidth, textWidth + padding * 2);
    const totalHeight = qrHeight + fontSize + padding * 2;
    
    // Configurer le canvas
    canvasWithText.width = totalWidth;
    canvasWithText.height = totalHeight;
    
    // Dessiner le fond
    ctx.fillStyle = bgColor.value;
    ctx.fillRect(0, 0, totalWidth, totalHeight);
    
    // Dessiner le QR code
    ctx.drawImage(canvas, (totalWidth - qrWidth) / 2, padding, qrWidth, qrHeight);
    
    // Dessiner le texte
    ctx.fillStyle = textColor.value;
    ctx.fillText(text, totalWidth / 2, qrHeight + padding + fontSize / 2);
    
    // Remplacer le canvas original
    canvas.replaceWith(canvasWithText);
  }, 100);
}

/**
 * Gestionnaires d'événements
 */

// Génération du QR code
generateBtn.addEventListener("click", () => {
  const url = urlInput.value.trim();
  showFeedback("");
  showDownloadFeedback("");

  // Validation de l'URL
  if (!url) {
    showFeedback("Veuillez entrer une URL.");
    urlInput.focus();
    return;
  }
  if (!isValidURL(url)) {
    showFeedback("L'URL n'est pas valide. Elle doit commencer par http:// ou https://");
    urlInput.focus();
    return;
  }

  // Afficher l'indicateur de chargement
  toggleLoading(true);
  
  // Simuler un délai pour montrer le chargement (peut être retiré en production)
  setTimeout(() => {
    // Générer le QR code
    const success = generateQRCode(url);
    
    // Masquer l'indicateur de chargement
    toggleLoading(false);
    
    if (success) {
      downloadOptions.classList.remove("hidden");
      showFeedback("QR Code généré avec succès !", false);
    } else {
      showFeedback("Erreur lors de la génération du QR Code.");
      downloadOptions.classList.add("hidden");
    }
  }, 800); // 800ms de délai pour l'effet visuel
});

// Mise à jour en temps réel du QR code lors de la modification des options de style
[dotColor, bgColor, dotStyle, qrSize, cornerStyle, cornerDotStyle].forEach(element => {
  element.addEventListener("input", () => {
    if (currentUrl && qrCode) {
      generateQRCode(currentUrl);
    }
  });
});

// Mise à jour en temps réel du QR code lors de la modification des options
[dotColor, bgColor, dotStyle, qrSize].forEach(element => {
  element.addEventListener("input", () => {
    if (currentUrl && qrCode) {
      generateQRCode(currentUrl);
    }
  });
});

// Gestion des téléchargements
document.querySelectorAll(".download-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const format = btn.dataset.format;
    if (!qrCode) return;
    
    // Afficher un message de chargement
    showDownloadFeedback("Téléchargement en cours...");
    
    try {
      // Si nous avons un canvas avec texte, nous devons le gérer différemment
      if (canvasWithText && textContent.value.trim()) {
        if (format === "pdf") {
          // Générer un PDF avec le canvas contenant le texte
          const imgData = canvasWithText.toDataURL("image/png");
          try {
            // S'assurer que jsPDF est correctement initialisé
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 15, 15, 180, 180);
            pdf.save(`qr-code-${Date.now()}.pdf`);
            showDownloadFeedback("PDF téléchargé avec succès !");
          } catch (pdfErr) {
            console.error("Erreur lors de la génération du PDF:", pdfErr);
            showDownloadFeedback("Erreur lors de la génération du PDF.");
          }
        } else if (format === "svg") {
          // Pour SVG, on utilise la méthode de la bibliothèque QR code
          qrCode.download({
            name: `qr-code-${Date.now()}`,
            extension: "svg"
          }).then(() => {
            showDownloadFeedback("SVG téléchargé avec succès !");
          }).catch(err => {
            console.error("Erreur lors du téléchargement en SVG:", err);
            showDownloadFeedback("Erreur lors du téléchargement.");
          });
        } else {
          // Télécharger l'image directement depuis le canvas pour les autres formats
          const link = document.createElement("a");
          link.download = `qr-code-${Date.now()}.${format}`;
          link.href = canvasWithText.toDataURL(`image/${format}`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          showDownloadFeedback(`${format.toUpperCase()} téléchargé avec succès !`);
        }
      } else {
        // Utiliser la méthode standard pour le QR code sans texte
        if (format === "pdf") {
          qrCode.getRawData("png").then(blob => {
            const reader = new FileReader();
            reader.onloadend = function () {
              try {
                // S'assurer que jsPDF est correctement initialisé
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF();
                const imgData = reader.result;
                pdf.addImage(imgData, "PNG", 15, 15, 180, 180);
                pdf.save(`qr-code-${Date.now()}.pdf`);
                showDownloadFeedback("PDF téléchargé avec succès !");
              } catch (err) {
                console.error("Erreur lors de la génération du PDF:", err);
                showDownloadFeedback("Erreur lors de la génération du PDF.");
              }
            };
            reader.readAsDataURL(blob);
          }).catch(err => {
            console.error("Erreur lors de la récupération des données du QR code:", err);
            showDownloadFeedback("Erreur lors du téléchargement.");
          });
        } else {
          qrCode.download({ 
            name: `qr-code-${Date.now()}`, 
            extension: format 
          }).then(() => {
            showDownloadFeedback(`${format.toUpperCase()} téléchargé avec succès !`);
          }).catch(err => {
            console.error(`Erreur lors du téléchargement en ${format}:`, err);
            showDownloadFeedback("Erreur lors du téléchargement.");
          });
        }
      }
    } catch (err) {
      console.error("Erreur lors du téléchargement:", err);
      showDownloadFeedback("Erreur lors du téléchargement.");
    }
  });
});

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  // Placer le focus sur le champ URL au chargement
  urlInput.focus();
  
  // Initialiser les onglets
  setupTabs();
  
  // Initialiser les gestionnaires pour le logo
  setupLogoHandlers();
  
  // Initialiser les gestionnaires pour le texte
  setupTextHandlers();
  
  // Initialiser la modal À propos
  setupAboutModal();
});

/**
 * Configuration de la modal À propos
 */
function setupAboutModal() {
  const aboutBtn = document.getElementById("about-btn");
  const aboutModal = document.getElementById("about-modal");
  const closeModal = document.getElementById("close-modal");
  
  if (!aboutBtn || !aboutModal || !closeModal) {
    console.warn("Certains éléments de la modal À propos sont manquants");
    return;
  }
  
  // Ouvrir la modal
  aboutBtn.addEventListener("click", () => {
    aboutModal.classList.remove("hidden");
    // Ajouter la classe active après un court délai pour permettre l'animation
    setTimeout(() => {
      aboutModal.classList.add("active");
    }, 10);
  });
  
  // Fermer la modal avec le bouton de fermeture
  closeModal.addEventListener("click", () => {
    aboutModal.classList.remove("active");
    // Attendre la fin de l'animation avant de cacher la modal
    setTimeout(() => {
      aboutModal.classList.add("hidden");
    }, 300);
  });
  
  // Fermer la modal en cliquant en dehors du contenu
  aboutModal.addEventListener("click", (e) => {
    if (e.target === aboutModal) {
      aboutModal.classList.remove("active");
      setTimeout(() => {
        aboutModal.classList.add("hidden");
      }, 300);
    }
  });
}
