const { exec, execSync } = require('child_process');
const prompts = require('prompts');
let readline = require('readline');
readline.emitKeypressEvents(process.stdin);


function execute_sync(command) {
    let buffer;

    if (command == 'lp') {
        buffer = execSync('ps a');
    }

    if (/bing\s.*\s\d+$/.test(command)) {
        if (/-k/.test(command)) {
            buffer = execSync(`kill ${command.match(/\d+/)}`);
        } else if (/-p/.test(command)) {
            buffer = execSync(`kill -s STOP ${command.match(/\d+/)}`);
        } else if (/-c/.test(command)) {
            buffer = execSync(`kill -s CONT ${command.match(/\d+/)}`);
        }
    }

    if (/^\./.test(command) || /^\//.test(command)) {
        buffer = execSync(command);
    }
    
    console.log(buffer.toString('utf8'));
}

async function execute(command) {

    if (command.slice(1) == 'lp') {
        exec('ps a', (err, output) => {
            if (err) {
                console.log("Couldn't list all running processes:", err);
                return;
            }
            console.log(output);
        });
    }

    if (/bing\s.*\s\d+$/.test(command.slice(1))) {
        if (/-k/.test(command)) {
            exec(`kill ${command.match(/\d+/)}`, (err, output) => {
                if (err) {
                    console.log(`An error on "${command} command has occured."`);
                }
                console.log(output);
            });
        } else if (/-p/.test(command)) {
            exec(`kill -s STOP ${command.match(/\d+/)}`, (err, output) => {
                if (err) {
                    console.log(`An error on "${command}" command has occured.`);
                    console.log(err);
                }
                console.log(output)
            });
        } else if (/-c/.test(command)) {
            exec(`kill -s CONT ${command.match(/\d+/)}`, (err, output) => {
                if (err) {
                    console.log(`An error on "${command}" command has occured.`);
                    console.log(err);
                }
                console.log(output)
            });
        }
    }

    if (/^\./.test(command.slice(1)) || /^\//.test(command.slice(1))) {
        exec(command.slice(1), (err, output) => {
            if (err) {
                console.log("Can't execute file:", err);
            }
            console.log(output);
        });
    }

}

async function cli() {

    const onSubmit = (_, command) => {
        
        process.stdin.on('keypress', (_, key) => {
            if (key && key.ctrl && key.name == 'p') {
                console.log('\n');
                process.exit();
            }
        });
        
        if (/^!/.test(command)) {
            execute(command);
        } else {
            execute_sync(command);
        }
        
    }
    
    await prompts(
        {
            type: 'text',
            name: 'command',
            message: '>'
        }, 
        { 
            onSubmit 
        }
    );

}



(async () => {
    while (true) {
        await cli();
    }
})();
