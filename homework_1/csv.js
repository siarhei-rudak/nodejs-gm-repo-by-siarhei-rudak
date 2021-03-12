import csv from 'csvtojson';
import path from 'path';
import fs from 'fs';
import { pipeline } from'stream';

const csvPath = path.resolve(__dirname, 'csv', 'nodejs-hw1-ex1.csv');
const txtPath = path.resolve(__dirname, 'csv', 'nodejs-hw1-ex1.txt');

pipeline(
    fs.createReadStream(csvPath),
    csv(),
    fs.createWriteStream(txtPath),
    (err) => {
        if (err) return console.error('Pipeline error:', err);
        console.log('Pipeline success!')
    }
);
