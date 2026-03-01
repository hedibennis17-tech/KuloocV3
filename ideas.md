# Kulooc V3 — Brainstorming Design

## Approche 1 — "Canadian Edge" (Modernisme Industriel Canadien)
<response>
<text>
**Design Movement:** Modernisme industriel canadien — brutalisme doux avec chaleur nordique.
**Core Principles:** Contraste fort noir/rouge/blanc, typographie display massive, asymétrie structurée, espace négatif agressif.
**Color Philosophy:** Rouge Canada (#D52B1E) comme couleur d'action pure, noir profond (#0A0A0A) pour l'autorité, blanc cassé (#F5F5F0) pour la respiration. Le rouge est réservé aux CTA et aux éléments actifs — jamais décoratif.
**Layout Paradigm:** Grille asymétrique avec des blocs décalés. La page d'accueil utilise un layout en "L" avec une grande zone hero à gauche et des blocs de services empilés à droite.
**Signature Elements:** Ligne rouge verticale comme séparateur de section, typographie condensée en majuscules pour les titres, icônes minimalistes monochromes.
**Interaction Philosophy:** Transitions rapides et directes (200ms), hover avec glissement rouge, focus states très visibles pour l'accessibilité.
**Animation:** Entrées par translation verticale (Y+20px → Y0), stagger de 50ms entre les éléments, pas d'animations superflues.
**Typography System:** Bebas Neue (display/titres) + Inter (corps de texte). Hiérarchie stricte : 72px/48px/32px/18px/14px.
</text>
<probability>0.08</probability>
</response>

## Approche 2 — "Kulooc Dark Precision" (Techno-Premium Sombre)
<response>
<text>
**Design Movement:** Tech-premium sombre — inspiré des interfaces de Tesla et Uber Eats Pro.
**Core Principles:** Interface sombre avec accents rouge vif, précision typographique, densité d'information élevée, hiérarchie visuelle claire.
**Color Philosophy:** Fond noir (#0D0D0D), surfaces en gris très foncé (#1A1A1A et #242424), rouge Kulooc (#E31837) pour tous les éléments interactifs. Le blanc est utilisé uniquement pour le texte principal.
**Layout Paradigm:** Sidebar fixe pour les dashboards, top navigation pour les pages publiques. Cards avec bordures subtiles (1px #2A2A2A).
**Signature Elements:** Badge rouge animé pour les statuts en ligne, barre de progression rouge pour les courses en cours, avatar circulaire avec anneau de statut coloré.
**Interaction Philosophy:** Micro-animations sur chaque interaction, feedback visuel immédiat, états de chargement skeleton.
**Animation:** Framer Motion pour les transitions de page, spring animations pour les modales, pulse animation pour les statuts actifs.
**Typography System:** Space Grotesk (titres) + DM Sans (corps). Poids 700/500/400.
</text>
<probability>0.09</probability>
</response>

## Approche 3 — "Kulooc Blanc Signature" (Élégance Canadienne Claire)
<response>
<text>
**Design Movement:** Élégance fonctionnelle canadienne — Apple Maps rencontre Air Canada.
**Core Principles:** Fond blanc dominant, rouge comme couleur signature forte, noir pour la typographie, espace aéré et généreux.
**Color Philosophy:** Blanc pur (#FFFFFF) comme fond principal, rouge Kulooc (#D52B1E) pour l'identité et les actions, noir (#111111) pour le texte. Gris très léger (#F8F8F8) pour les zones de fond secondaires.
**Layout Paradigm:** Navigation horizontale fixe noire avec logo rouge, contenu centré avec max-width 1280px, sections alternant blanc et gris très clair.
**Signature Elements:** Bouton CTA rouge avec coins légèrement arrondis, carte Google Maps intégrée pleine largeur, icônes de service dans des cercles noirs.
**Interaction Philosophy:** Hover states subtils (ombre portée légère), transitions fluides 300ms ease-out, focus rings rouges pour l'accessibilité.
**Animation:** Fade-in au scroll pour les sections, slide-in pour les modales, bounce léger pour les confirmations.
**Typography System:** Syne (titres display) + Outfit (corps). Titres en noir gras, corps en gris foncé.
</text>
<probability>0.07</probability>
</response>

---

## Choix Retenu : Approche 2 — "Kulooc Dark Precision"

Cette approche est la plus cohérente avec le screenshot fourni (interface sombre, rouge vif, noir profond) et avec l'identité visuelle de Kulooc Canada. Elle offre également la meilleure lisibilité pour les interfaces de conduite (Driver) et de dispatch, qui sont utilisées en conditions de faible luminosité.
