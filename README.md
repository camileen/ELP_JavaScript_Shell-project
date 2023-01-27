# CLI in JavaScript
The project implements a very simple command-line interface (CLI). It is meant to learn the basics of JavaScript concepts.

## Usage :
Only the following commands can be executed:  
1. `lp`: lists all processes status (i.e. executes the Unix command `ps a`)
2. `bing [-k|-p|-c] <processId>`: kills, pauses or awakes a process giving his process ID
- option `-k` to kill
- option `-p` to pause
- option `-c` to awake
3. prefix `!`: executes a command on background
4. keyboard interruption with `Ctrl+p`: exits the CLI  
5. executes an executable file, shell or python script giving its relative or absolute path  
(**WARNING:** error if the given file is an infinite loop)


## Contributors :
[Xinyi ZHAO](https://github.com/Xinyi25) et [Camille ROBINSON](https://github.com/camileen)

## Mentions:
This project was conducted as an exercise whose specifications can be found [here](https://github.com/sfrenot/javascript/blob/master/ProjectDesc.md).  
Special mention to [INSA Lyon](https://www.insa-lyon.fr) engineering school and its (fabulous) departmnt of Telecommunications.