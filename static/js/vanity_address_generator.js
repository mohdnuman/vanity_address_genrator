const { randomBytes } = require("node:crypto");
const privateKeyToAddress = require("ethereum-private-key-to-address");

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
async function generateVanityAddress(prefix) {
  return new Promise(async (resolve, reject) => {
    try {
      let count = 0;
      let wallet = await getRandomWallet();
      while (!wallet.address.toLowerCase().startsWith(prefix.toLowerCase())) {
        console.log(JSON.stringify({ count, address: wallet.address }));
        wallet = await getRandomWallet();
        count++;
      }
      resolve(wallet);
    } catch (error) {
      reject(error);
    }
  });
}

generateVanityAddress("0xabcdef").then((wallet) => console.log(wallet));
