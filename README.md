# Révision Bac Pro ASSP

Application web personnelle (PWA) pour réviser le Bac Pro ASSP, de la seconde à la terminale, sur iPhone.

- **En ligne** : https://dallxba.github.io/revision-assp/
- **Installer sur iPhone** : ouvrir le lien dans Safari, *Partager* → *Sur l'écran d'accueil*.

## Ce que fait l'appli

- Fiches de cours rangées selon le référentiel (blocs de compétences), filtrées par classe.
- Cartes mémoire avec répétition espacée (algorithme FSRS via `ts-fsrs`).
- Quiz avec explications.
- Révision du jour : cartes dues + nouvelles cartes des fiches déjà lues.
- Fonctionne hors connexion. La progression reste sur le téléphone (sauvegarde / restauration dans Réglages).

## Contenu

Le contenu est dans `src/content/`. Chaque fiche porte ses sources et un champ `verifiee` : il reste à `false`
tant qu'une élève ne l'a pas comparée à son cours. Ne jamais changer l'`id` d'une fiche ou d'une carte publiée :
la progression y est rattachée.

Aucun texte de manuel ni PDF d'annales n'est copié dans le dépôt (qui est public).

## Développement

```bash
npm install
npm run dev     # serveur local
npm run build   # vérification des types + build + service worker
```

Chaque push sur `main` met le site en ligne via GitHub Pages (`.github/workflows/deploy.yml`).
