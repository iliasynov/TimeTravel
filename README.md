# TimeTravel Agency — Webapp de voyage temporel

## 1. Description du projet

**TimeTravel Agency** est une webapp moderne et interactive réalisée dans le cadre d’un projet d’école.
L’application met en scène une agence fictive spécialisée dans le voyage temporel. Elle présente trois destinations historiques ou préhistoriques :

- **Paris 1889** : voyage à l’époque de la Belle Époque et de l’Exposition Universelle.
- **Crétacé** : immersion dans l’âge des dinosaures.
- **Florence 1504** : découverte de la Renaissance italienne autour de Michel-Ange et du David.

L’objectif du projet est de proposer une expérience utilisateur immersive grâce à une page d’accueil animée, une galerie de destinations, des visuels générés par IA et un assistant conversationnel capable de conseiller l’utilisateur sur les voyages proposés.

---

## 2. Objectifs du projet

Le projet répond au besoin suivant :

> Développer une webapp moderne et interactive qui met en scène l’agence et ses trois destinations : Paris 1889, Crétacé et Florence 1504, avec des fonctionnalités alimentées par l’IA.

Les objectifs principaux sont :

- créer une interface attractive et responsive ;
- présenter clairement les trois destinations ;
- intégrer des interactions utilisateur simples et fluides ;
- utiliser des visuels générés par IA pour renforcer l’immersion ;
- intégrer un chatbot capable de répondre aux questions des utilisateurs ;
- assurer une transparence sur les outils IA utilisés.

---

## 3. Technologies utilisées

### Frontend

- **HTML5** : structure de la page, sections, cartes de destinations, modales et widget chatbot.
- **CSS3** : design responsive, animations, effets de transition, mise en page des cartes et du chatbot.
- **JavaScript vanilla** : interactions, ouverture/fermeture des modales, scroll fluide, chatbot, lazy loading des images et appels API.

### Intelligence artificielle

- **Mistral AI API** : utilisée pour alimenter le chatbot lorsque la clé API est configurée.
- **Réponses fallback locales** : utilisées si aucune clé API Mistral n’est configurée.
- **Génération d’images par IA** : les visuels des destinations ont été générés avec un outil d’IA générative d’images.

### Organisation des fichiers

```txt
TimeTravel Agency/
│
├── index.html          # Structure principale de la webapp
├── styles.css          # Styles, animations, responsive design
├── script.js           # Logique interactive et chatbot
├── mission.txt         # Cahier de mission du projet
│
└── photos/
    ├── paris.png       # Image générée IA pour Paris 1889
    ├── cretace.png     # Image générée IA pour le Crétacé
    └── florence.png    # Image générée IA pour Florence 1504
```

---

## 4. Features implémentées

### 4.1 Page d’accueil

La page d’accueil présente l’identité de l’agence **TimeTravel Agency** avec :

- une barre de navigation sticky ;
- un logo textuel ;
- une section hero pleine hauteur ;
- un titre d’accueil ;
- un slogan ;
- un bouton CTA permettant d’accéder directement aux destinations ;
- une animation de fond réalisée en CSS.

Le bouton principal **Explore Destinations** utilise un scroll fluide vers la section des destinations.

---

### 4.2 Présentation de l’agence

Une section **About Our Agency** explique le concept de l’agence :

- voyage temporel fictif ;
- expérience historique immersive ;
- accompagnement par une technologie avancée ;
- exploration de trois périodes majeures : Paris 1889, Crétacé et Florence 1504.

Cette section permet de contextualiser le projet et de rendre l’univers de la webapp plus crédible.

---

### 4.3 Galerie des destinations

La galerie contient trois cards interactives :

#### Paris 1889

Destination centrée sur :

- la Belle Époque ;
- la construction de la Tour Eiffel ;
- l’Exposition Universelle ;
- l’ambiance artistique et culturelle de Paris à la fin du XIXe siècle.

#### Crétacé

Destination centrée sur :

- les dinosaures ;
- les paysages préhistoriques ;
- les créatures géantes ;
- l’observation sécurisée de la faune ancienne.

#### Florence 1504

Destination centrée sur :

- la Renaissance italienne ;
- Michel-Ange ;
- le David ;
- l’art, l’architecture et la culture florentine.

Chaque destination possède :

- une image générée par IA ;
- un titre ;
- une courte description ;
- un bouton **Learn More** ;
- une modale contenant des informations détaillées.

---

### 4.4 Modales de détails

Chaque card de destination ouvre une modale dédiée :

- `Paris 1889`
- `Crétacé Period`
- `Florence 1504`

Les modales affichent :

- le nom de la destination ;
- la localisation ou la période ;
- une description détaillée ;
- une liste de highlights ;
- un bouton de fermeture.

Les modales peuvent être fermées :

- avec le bouton `×` ;
- avec le bouton `Close` ;
- en cliquant à l’extérieur de la modale.

---

### 4.5 Chatbot IA intégré

Un widget chatbot flottant est intégré en bas à droite de l’écran.

Il permet à l’utilisateur de poser des questions sur :

- les destinations ;
- les tarifs ;
- la sécurité ;
- la durée des voyages ;
- les recommandations personnalisées ;
- l’équipement à prévoir ;
- les informations générales sur l’agence.

Le chatbot contient :

- un bouton flottant ;
- une fenêtre de conversation ;
- une zone de messages ;
- des questions rapides ;
- un champ de saisie ;
- un bouton d’envoi ;
- un indicateur de saisie animé.

---

### 4.6 FAQ automatisée

Le chatbot propose plusieurs questions rapides :

- Paris 1889 ?
- Crétacé safety ?
- Florence duration ?
- What to pack ?
- Time travel safety ?

Lorsqu’un utilisateur clique sur une question rapide, la fenêtre du chatbot s’ouvre automatiquement, la question est insérée dans le champ de saisie, puis envoyée.

---

### 4.7 Réponses personnalisées

Le chatbot utilise deux modes de fonctionnement :

#### Mode API Mistral

Si une clé API est configurée, les messages sont envoyés à l’API Mistral.
Le chatbot utilise un system prompt pour adopter le rôle d’un assistant virtuel spécialisé dans les voyages temporels.

#### Mode fallback local

Si aucune clé API n’est configurée, le chatbot utilise des réponses locales prédéfinies.
Ce mode permet à l’application de rester fonctionnelle même sans connexion API.

Exemples de thèmes gérés par le fallback :

- Paris 1889 ;
- Crétacé ;
- Florence 1504 ;
- prix ;
- sécurité ;
- recommandations ;
- FAQ générale.

---

### 4.8 Lazy loading des images

Les images des destinations utilisent un chargement différé grâce à `IntersectionObserver`.

Objectif :

- améliorer les performances ;
- éviter de charger toutes les images dès l’ouverture de la page ;
- remplacer progressivement les placeholders par les vraies images.

Un fallback est prévu pour les navigateurs ne supportant pas `IntersectionObserver`.

---

### 4.9 Animations et transitions

Le projet utilise plusieurs animations CSS :

- apparition du hero ;
- animation de fond ;
- animation des cards ;
- hover effects ;
- animation des boutons ;
- animation d’ouverture des modales ;
- animation du widget chatbot ;
- indicateur de frappe du chatbot.

Ces animations améliorent l’expérience utilisateur et renforcent l’aspect moderne de l’application.

---

### 4.10 Responsive design

La webapp est adaptée aux écrans mobiles grâce aux media queries CSS.

Les éléments responsive incluent :

- la taille du titre hero ;
- la grille des destinations ;
- le widget chatbot ;
- la largeur de la fenêtre chatbot ;
- la taille des bulles de messages ;
- les espacements de navigation.

---

## 5. Outils IA utilisés — transparence

Ce projet utilise l’intelligence artificielle à deux niveaux.

### 5.1 Génération des visuels

Les images utilisées pour les destinations ont été générées avec un modèle d’IA générative d’images.

Images générées :

- `photos/paris.png` : visuel de Paris en 1889.
- `photos/cretace.png` : visuel du Crétacé.
- `photos/florence.png` : visuel de Florence en 1504.

Ces images servent uniquement à illustrer l’univers fictif de l’application dans le cadre d’un projet d’école.

### 5.2 Assistant conversationnel

Le chatbot peut utiliser l’API **Mistral AI** pour générer des réponses dynamiques.
Le fichier `script.js` contient une configuration prévue pour l’API Mistral :

```js
const MISTRAL_API_KEY = 'YOUR_API_KEY_HERE';
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';
```

Si la clé API n’est pas remplacée, l’application utilise automatiquement des réponses locales prédéfinies.

### 5.3 Aide à la documentation

Ce README a été rédigé avec l’aide d’un assistant IA à partir du code source et du cahier de mission du projet.

---

## 6. Instructions d’installation

### 6.1 Prérequis

Aucun framework n’est nécessaire.

Il faut simplement :

- un navigateur web moderne ;
- les fichiers du projet ;
- éventuellement une clé API Mistral si l’on veut activer le chatbot IA dynamique.

---

### 6.2 Lancer le projet en local

#### Option 1 — Ouverture directe

Ouvrir le fichier suivant dans un navigateur :

```txt
index.html
```

Cette méthode fonctionne pour tester rapidement la page.

---

#### Option 2 — Serveur local simple

Pour éviter certains problèmes de chargement de fichiers locaux, il est recommandé d’utiliser un petit serveur local.

Avec Python :

```bash
python -m http.server 8000
```

Puis ouvrir dans le navigateur :

```txt
http://localhost:8000
```

---

### 6.3 Vérifier les images

Les images doivent être placées dans le dossier `photos/` :

```txt
photos/paris.png
photos/cretace.png
photos/florence.png
```

Dans `index.html`, les images sont appelées avec les chemins suivants :

```html
data-src="photos/paris.png"
data-src="photos/cretace.png"
data-src="photos/florence.png"
```

Si les images ne s’affichent pas, vérifier :

- que le dossier `photos` existe ;
- que les noms des fichiers sont corrects ;
- que les extensions sont bien `.png` ;
- que le serveur local est lancé depuis le dossier racine du projet.

---

### 6.4 Configurer l’API Mistral

Pour activer les réponses dynamiques du chatbot :

1. Créer ou récupérer une clé API Mistral.
2. Ouvrir le fichier `script.js`.
3. Remplacer :

```js
const MISTRAL_API_KEY = 'YOUR_API_KEY_HERE';
```

par :

```js
const MISTRAL_API_KEY = 'votre_cle_api_mistral';
```

4. Relancer la page.

> Important : pour un vrai projet en production, il ne faut pas exposer une clé API directement dans un fichier JavaScript côté frontend.
> Une meilleure solution serait d’utiliser un backend qui protège la clé API et fait l’appel à Mistral côté serveur.

---

## 7. Utilisation de l’application

### Navigation

La barre de navigation permet d’accéder rapidement à :

- Home ;
- Destinations ;
- Chat with AI.

### Explorer les destinations

Cliquer sur **Explore Destinations** pour accéder à la galerie.
Cliquer sur **Learn More** pour ouvrir les détails d’une destination.

### Utiliser le chatbot

Cliquer sur le bouton flottant 💬 en bas à droite.
L’utilisateur peut :

- écrire une question ;
- appuyer sur Entrée ;
- cliquer sur le bouton d’envoi ;
- utiliser les questions rapides.

---

## 8. Crédits

### APIs

- **Mistral AI API** : utilisée pour le chatbot IA lorsque la clé API est configurée.

### Modèles IA

- Modèle de génération d’images IA utilisé pour créer les visuels des destinations.
- Modèle de langage IA utilisé pour aider à rédiger la documentation du projet.

### Assets

- Images de destinations générées par IA :
  - Paris 1889 ;
  - Crétacé ;
  - Florence 1504.

### Code

Le projet est développé avec :

- HTML ;
- CSS ;
- JavaScript vanilla.

Aucun framework externe n’est requis pour lancer la webapp.

---

## 9. Limites actuelles

Le projet est fonctionnel pour une démonstration scolaire, mais certaines améliorations pourraient être ajoutées :

- ajouter une vraie vidéo de fond dans la hero section ;
- sécuriser l’appel à l’API IA avec un backend ;
- ajouter une page de réservation ;
- ajouter un système de favoris ;
- améliorer l’accessibilité ;
- ajouter des tests automatisés ;
- ajouter une gestion plus avancée des erreurs API ;
- ajouter une vraie base de données pour stocker les demandes utilisateur.

---

## 10. Améliorations possibles

### Backend sécurisé

Créer un backend Node.js, Python FastAPI ou Express pour :

- protéger la clé API Mistral ;
- gérer les requêtes du chatbot ;
- enregistrer les demandes utilisateur ;
- ajouter une logique de réservation.

### Expérience utilisateur

Améliorer l’interface avec :

- un carousel de destinations ;
- une animation vidéo dans la section hero ;
- des filtres par type de voyage ;
- une page de détail par destination ;
- un système de notation ou d’avis.

### IA avancée

Ajouter :

- un assistant de recommandation personnalisé ;
- une génération automatique d’itinéraire ;
- un résumé de voyage ;
- une estimation du budget ;
- un quiz interactif pour choisir la meilleure destination.

---

## 11. Auteur

Projet réalisé dans le cadre d’un projet d’école.

**Nom du projet :** TimeTravel Agency
**Type :** Webapp interactive avec fonctionnalités IA
**Thème :** Agence de voyage temporel fictive
**Destinations :** Paris 1889, Crétacé, Florence 1504
