const { randomBytes } = require("node:crypto");
const privateKeyToAddress = require("ethereum-private-key-to-address");
const readlineSync = require("readline-sync");

// Generate a random wallet containing a private key and address
async function getRandomWallet() {
  return new Promise(async (resolve, reject) => {
    try {
      let privateKey = randomBytes(32).toString("hex");
      let address = privateKeyToAddress(privateKey);

      resolve({ privateKey, address });
    } catch (error) {
      reject(error);
    }
  });
}

// Generate a wallet with a specific prefix
async function generateVanityEoaAddress(prefix) {
  return new Promise(async (resolve, reject) => {
    try {
      let count = 0;
      let wallet = await getRandomWallet();
      while (!wallet.address.toLowerCase().startsWith(prefix.toLowerCase())) {
        wallet = await getRandomWallet();
        console.log(`Tried ${count} times`);
        count++;
      }
      resolve(wallet);
    } catch (error) {
      reject(error);
    }
  });
}


module.exports={
  generateVanityEoaAddress: generateVanityEoaAddress,
  getRandomWallet: getRandomWallet
}
