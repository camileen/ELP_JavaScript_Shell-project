PROJET : SHELL EN JAVASCRIPT

CAHIER DES CHARGES :
- Boucler à l'infini => OK

- Pouvoir exécuter au premier plan un programme du système d'exploitation
  en indiquant son chemin d'accès (absolu ou relatif : / ou..), ou qu'il
  soit dans une variable PATH récupérée de l'environnement shell de
  l'utilisateur au démarrage. => OK

- Lister les processus en cours (en numérotant à partir de 1 dans le shell)
  avec la commande 'lp' => OK

- Pouvoir tuer, mettre en pause ou reprendre un processus avec une commande
  'bing [-k|-p|-c] <processId>' => OK

- Pouvoir exécuter en tâche de fond un programme avec le postfix '!'

- Sortir du shell sur Ctrl+p

- Détacher certains processus du CLIi avec la commande keep <processId>


INTERESTING MODULES :
- prompts
- events
- child_process