const fs = require('fs');
const readline = require('readline');
const filename = './data.txt';

async function generateData() {
    if (fs.existsSync(filename)) {
        console.log("File already exists | skip generation");
        return;
    }

    console.log ("Generating data...");
}