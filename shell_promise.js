const { exec } = require('child_process');
const prompts = require('prompts');
let readline = require('readline');
readline.emitKeypressEvents(process.stdin);

function detectExit(resolve) {
  process.stdin.on('keypress', (_, key) => {
    if (key && key.ctrl && key.name == 'p') {
        resolve("\nEnd of CLI\n");
    }
  });
}

function execute(command){
  return new Promise((resolve, reject) => {
    exec(command, callback=(err, result) =>{
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  })
}

function cli () {
  return new Promise( (resolve, reject) => {
    
    /* detectExit()
    * Detect end of CLI and exit it
    * NOTE : don't work properly during synchronous execution
    */
    detectExit(resolve);
    
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

function quit(message) {
  console.log(message);
  process.exit();
}

let cliPromise = cli();
cliPromise.then( (value) => quit(value), (err) => quit(err) );

