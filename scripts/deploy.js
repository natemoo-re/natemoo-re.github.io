const util = require('util');
const exec = require('await-exec');
const inquirer = require('inquirer');

async function add() {
    return await exec('git add .');
}

async function commit() {
    const { message } = await inquirer.prompt([{
        type: 'input',
        name: 'message',
        message: 'Enter a commit message',
        default: 'auto-deploy'
    }]);
    
    return await exec(`git commit -m "${message}"`);
}

async function push() {
    return await exec('git push origin master');
}

async function deploy() {
    await add();
    console.log('Adding files');
    await commit();
    console.log('Commiting...');
    await push();
    console.log('Pushed to master');
}

deploy();