const fs = require('fs');
const readline = require('readline');
const fileName = './data.txt';

async function generateData() {
    if (fs.existsSync(fileName)) {
        console.log("File already exists | skip generation");
        return;
    }

    console.log ("Generating data...");

    const writeStream = fs.createWriteStream(fileName);

    for(let i = 1; i <= 100000; i++) {
        writeStream.write(`Line ${i}: \n`);
    }
    writeStream.end();

    await new Promise(resolve => writeStream.once('finish', resolve));
}

async function* dataProducer(data){
    const fileStream = fs.createReadStream(data, { encoding: 'utf8' });

    fileStream.on('errpr', (err) => {
        fileStream.destroy();
        throw new Error(`Error while creating data stream: ${err}`);
    });

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    try {
        for await (const line of rl) {
            yield line;
        }
    }
    catch(err) {
        console.error(err);
        throw err;
    }
}