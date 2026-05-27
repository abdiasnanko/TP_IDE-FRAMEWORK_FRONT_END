# PolyQuiz

PolyQuiz est une application Web développée avec React et Vite dans le cadre du cours de développement Front-End avancé.

L’application permet à un utilisateur de :

- saisir un pseudo,
- accéder à un quiz interactif,
- répondre à plusieurs questions,
- obtenir un score final,
- voir son ratio de réussite.

Le projet respecte les contraintes d’ingénierie imposées dans le sujet du projet.

---

# Technologies utilisées

- React
- Vite
- React Router DOM
- Context API
- Hooks React
- useReducer
- useMemo
- useRef
- JSON
- JavaScript ES6

---

# Architecture du projet

```bash
src/
│
├── components/
├── context/
├── hooks/
├── pages/
├── reducers/
├── routes/
```

---

# Fonctionnalités implémentées

## Authentification utilisateur

L’utilisateur doit saisir un pseudo avant d’accéder au quiz.

---

## Protected Routes

Les routes du quiz et des résultats sont protégées grâce à :

```jsx
ProtectedRoute.jsx
```

Un utilisateur non authentifié est automatiquement redirigé.

---

## Chargement dynamique des questions

Les questions sont chargées depuis :

```bash
public/questions.json
```

grâce à un Hook personnalisé :

```jsx
useFetch.js
```

---

## Gestion globale avec Context API

Les informations utilisateur sont centralisées dans :

```jsx
UserContext.jsx
```

---

## Gestion complexe d’état avec useReducer

Le moteur du quiz utilise :

```jsx
quizReducer.js
```

pour :

- gérer les réponses,
- calculer le score,
- suivre la progression du quiz,
- terminer automatiquement le quiz.

---

## Timer avec useRef

Le quiz possède un chronomètre utilisant :

```jsx
useRef
```

et :

```jsx
setInterval
```

---

## Optimisation avec useMemo

Le calcul du ratio de réussite est optimisé avec :

```jsx
useMemo
```

---

# Installation du projet

```bash
npm install
```

---

# Lancement du projet

```bash
npm run dev
```

---

# Dépendances importantes

Installation de React Router DOM :

```bash
npm install react-router-dom
```

---

# Auteur

Projet réalisé par :

Nom : NANKO TCHAMO ABDIAS

Filière : Informatique et Télécommunications

Option : Sécurité et Cryptographie

Niveau :  3