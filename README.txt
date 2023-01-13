PROJET : SHELL EN JAVASCRIPT

CAHIER DES CHARGES :
- Boucler à l'infini
- Pouvoir exécuter au premier plan un programme du système d'exploitation
  en indiquant son chemin d'accès (absolu ou relatif : / ou..), ou qu'il
  soit dans une variable PATH récupérée de l'environnement shell de
  l'utilisateur au démarrage.
- Lister les processus en cours (en numérotant à partir de 1 dans le shell)
  avec la commande 'lp'
- Pouvoir tuer, mettre en pause ou reprendre un processus avec une commande
  'bing [-k|-p|-c] <processId>
- Pouvoir exécuter en tâche de fond un programme avec le postfix '!'
- Sortir du shell sur Ctrl+p
- Détacher certains processus du CLIi avec la commande keep <processId>