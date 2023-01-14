const { exec } = require('child_process')
const prompts = require('prompts');


async function cli() {
    const response = await prompts({
      type: 'text',
      name: 'command',
      message: '>'
    });
    
    if (response.command == 'lp') {
        exec('ps a', (err, output) => {
            if (err) {
                console.log("Couldn't list all running processes:", err);
            }
            console.log(output);
        });
    }

    if (/bing\s.*\s\d+$/.test(response.command)) {
        if (/-k/.test(response.command)) {
            exec(`kill ${response.command.match(/\d+/)}`, (err, output) => {
                if (err) {
                    console.log(`An error on "${response.command} command has occured."`);
                }
                console.log(output);
            });
        } else if (/-p/.test(response.command)) {
            exec(`kill -s STOP ${response.command.match(/\d+/)}`, (err, output) => {
                if (err) {
                    console.log(`An error on "${response.command}" command has occured.`);
                    console.log(err);
                }
                console.log(output)
            });
        } else if (/-c/.test(response.command)) {
            exec(`kill -s CONT ${response.command.match(/\d+/)}`, (err, output) => {
                if (err) {
                    console.log(`An error on "${response.command}" command has occured.`);
                    console.log(err);
                }
                console.log(output)
            });
        } else {
            console.log("Please use an option with bing (-k|-p|-c)");
        }
    }

    if (/^\./.test(response.command) || /\//.test(response.command)) {
        exec(response.command, (err, output) => {
            if (err) {
                console.log("Can't execute file:", err);
            }
            console.log(output);
        });
    }
}

(async () => {
    while (true) {
        await cli();
    }
})();
