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
    if (/lp */.test(user_command)) {
      command = "ps -a";
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
      command = (user_command[0] == '!') ? user_command.slice(1) : user_command
    } 

    subProcess = exec(command)

    subProcess.stdout.on('data', (data) => {
      console.log(data);
    });
    subProcess.stderr.on('data', (data) => {
      console.log(data);
    });
    subProcess.on('close', (code) => {
      if (user_command[0] == '!') {
        console.log(`Child process exits with code ${code}`)
      }
      resolve();
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
        if (/^!/.test(command)) {
          execute(command);
        } else if (command != '') {
          try {
            await execute(command);
          } catch (error) {
            console.log(error)
          }
        }
        getCommand();
      }

      const onCancel = getCommand;

      await prompts(
        {
          type: 'text', 
          name: 'command',
          message: '>'
        },
        { onSubmit, onCancel }
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

