const { exec } = require('child_process');
const prompts = require('prompts');
let readline = require('readline');
readline.emitKeypressEvents(process.stdin);

/**
 * Detects "Ctrl+p" keystroke and resolves the CLI's promise
 * @param {function} resolve - Resolves CLI's promise
 */ 
function detectExit(resolve) {
  process.stdin.on('keypress', (_, key) => {
    if (key && key.ctrl && key.name == 'p') {
        resolve("\n************ END OF CLI ************\n");
    }
  });
}

/**
 * Executes a given command in a Bourne shell (sh) in a child process
 * @param {string} user_command
 * @return {Promise} - The promise of the child process that executes the command
 */ 
function execute(user_command) {
  return new Promise((resolve, reject) => {
    let command;
    if (/^\./.test(user_command) || /^\//.test(user_command)) {
      if (/(.py)$/.test(user_command)) {
        command = `python3 ${user_command}`;
      } else if (/(.sh)$/.test(user_command) || /(.+)$/.test(user_command)) {
        command = user_command;
      } else {
        reject("ERROR: Unknown command.");
      }
    } else if (user_command == 'lp') {
      command = "ps a";
    } else if (/bing/.test(user_command)) {
      let process_id = user_command.match(/\d+/);
      if (process_id != null) {
        if (/-k/.test(user_command)) {
          command = `kill ${user_command.match(/\d+/)}`;
        } else if (/-p/.test(user_command)) {
          command = `kill -s STOP ${user_command.match(/\d+/)}`
        } else if (/-c/.test(user_command)) {
          command =`kill -s CONT ${user_command.match(/\d+/)}`
        } else {
          reject("ERROR: Unknown or missing bing option.");
        }
      } else {
        reject("ERROR: Missing process ID.");
      }
    } else {
      command = user_command
    } 

    exec(command, callback=(err, result) =>{
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  })
}



/**
 * Waits for user's input command and executes it in a child process.
 * Runs until the returned promise is either resolved or rejected
 * @returns {Promise} - The main CLI's promise
 */
function cli() {
  return new Promise( (resolve, reject) => {
    detectExit(resolve);
    
    /**
     * Gets user's input command until the CLI's promise is resolved or rejected (recursive function)
     */
    async function getCommand() {
      const onSubmit = async (_, command) => {
        let result;
        if (/^!/.test(command)) {
          result = execute(command.slice(1));
          result.then((value) => console.log(value), (reason) => console.log(reason));
        } else {
          try {
            result = await execute(command);
            console.log(result);
          } catch (error) {
            console.log(error);
          }
        }
        getCommand();
      }
      await prompts(
        {
          type: 'text', 
          name: 'command',
          message: '>'
        },
        { onSubmit }
      );
    }

    getCommand();
  })
}

/**
 * @param {string} message - Displayed message before exiting the CLI
 */
function quit(message) {
  console.log(message);
  process.exit();
}


//**************************** START OF EXECUTION *****************************
let cliPromise = cli();
cliPromise.then( (value) => quit(value), (reason) =>  quit(reason) );

