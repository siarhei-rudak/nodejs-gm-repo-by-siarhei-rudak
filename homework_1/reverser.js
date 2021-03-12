import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

console.info('Type text that you would like to reverse (to exit program type "exit")');

rl.on('line', function(line){
    if (line === 'exit') return  process.exit();
    console.log(line.split('').reverse().join(''));
})