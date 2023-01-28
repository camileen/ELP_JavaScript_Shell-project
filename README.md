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
- option `-k` to kill a process
- option `-p` to pause a process
- option `-c` to awake a process
3. prefix `!`: executes a command on background
4. keyboard interruption with `Ctrl+p`: exits the CLI  
5. executes an executable file, shell or python script giving its relative or absolute path  

**WARNINGS:** 
- Prevent using VSCode integrated terminal or you will not be able to use `Ctrl+p` to exit the CLI (it corresponds to a default keyboard shortcut of VSCode)  

## Critics :
- Created child processes continue to run after exiting the CLI
- Can't stop a process running in foreground before its end
- Press Enter is interpreted as an unknown command

## Tests :
The *./tests* directory contains three files to test the CLI:
1. hello.py: just print *"hello from python file"*
2. infinite.py: infinite loop
3. sleep.sh: wait 5 seconds before printing *"I've sleep 5 seconds"*

## Contributors :
[Xinyi ZHAO](https://github.com/Xinyi25) et [Camille ROBINSON](https://github.com/camileen)

## Mentions:
This project was conducted as an exercise whose specifications can be found [here](https://github.com/sfrenot/javascript/blob/master/ProjectDesc.md).  
Special mention to [INSA Lyon](https://www.insa-lyon.fr) engineering school and its (fabulous) department of Telecommunications.