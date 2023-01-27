const { exec } = require('child_process');
const prompts = require('prompts');
let readline = require('readline');
readline.emitKeypressEvents(process.stdin);

/**
 * @param {function} resolve - Resolves CLI's promise
 */ 
function detectExit(resolve) {
  process.stdin.on('keypress', (_, key) => {
    if (key && key.ctrl && key.name == 'p') {
        resolve("\nEnd of CLI\n");
    }
  });
}

/**
 * @param {string} user_input
 */ 
function execute(user_input){
  return new Promise((resolve, reject) => {
    command = user_input
    if (/(.py)$/.test(user_input)) {
      command = `python3 ${command}`
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
 * Waits for user's input command and executes it in a child process
 * @returns {Promise} - The CLI's promise
 */
function cli() {
  return new Promise( (resolve, reject) => {
    detectExit(resolve);
    
    /**
     * Gets user's input command until the CLI's promise is resolved or rejected (recursive function)
     */
    async function getCommand() {
      const onSubmit = async (_, command) => {
        
        if (/^\./.test(command) || /^\//.test(command)) {
          result = await execute(command)
          console.log(result);
          
        } else if (/^!/.test(command)) {
          result = execute(command.slice(1));
          result.then(value => console.log(value), reason => console.log("Captured an exception:\n", reason));
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

let cliPromise = cli();
cliPromise.then( (value) => quit(value), (err) => quit(err) );

