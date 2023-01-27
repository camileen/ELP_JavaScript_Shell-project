# CLI in JavaScript
The project implements a very simple command-line interface (CLI). It is meant to learn the basics of JavaScript concepts.

## How to run the CLI ?
1. Open the directory of the project
2. Open a terminal from there and executes the following command:  
`node shell.js`

## Usage :
Only the following commands can be executed:  
1. `lp`: lists all processes status (i.e. executes the Unix command `ps a`)
2. `bing [-k|-p|-c] <processId>`: kills, pauses or awakes a process giving his process ID (`bing` **must have an only option**)
- option `-k` to kill
- option `-p` to pause
- option `-c` to awake
3. prefix `!`: executes a command on background
4. keyboard interruption with `Ctrl+p`: exits the CLI  
5. executes an executable file, shell or python script giving its relative or absolute path  
(**WARNING:** error if the given file is an infinite loop)  

## Things to improve :
- Unknown commands don't cause an error but don't inform the user that the command is unknown
- exiting the CLI after running an infinite loop in background won't kill the process running it

## Tests :
The *./tests* directory contains three files to test the CLI:
1. hello.py: just print *"hello from python file"*
2. infinite.py: infinite loop (can't be executed from the CLI)
3. sleep.sh: wait 2 seconds before printing *"I've sleep 2 seconds"*

## Contributors :
[Xinyi ZHAO](https://github.com/Xinyi25) et [Camille ROBINSON](https://github.com/camileen)

## Mentions:
This project was conducted as an exercise whose specifications can be found [here](https://github.com/sfrenot/javascript/blob/master/ProjectDesc.md).  
Special mention to [INSA Lyon](https://www.insa-lyon.fr) engineering school and its (fabulous) department of Telecommunications.