const {getRandomWallet}= require('./vanity_eoa.js');
const rlp = require("rlp");
const keccak = require("keccak");
const readlineSync = require('readline-sync');

async function generateVanityContractAddress(prefix){
    return new Promise(async(resolve, reject) => {
        try{
            //check only on the 0 nonce (i.e the first transaction)
            let nonce=0x00;
            let wallet;
            let address;
            let inputArr;
            let rlpEncoded;
            let contractAddressLong;
            let contractAddress;
            while(true){
                wallet = await getRandomWallet();
                address = wallet.address;

                inputArr = [address, nonce];
                rlpEncoded = rlp.encode(inputArr);
                contractAddressLong = keccak("keccak256")
                    .update(rlpEncoded)
                    .digest("hex");
                contractAddress = '0x'+contractAddressLong.substring(24);
                console.log(contractAddress);

                if(contractAddress.startsWith(prefix)){
                    resolve({address: address, contract_address: contractAddress, private_key: wallet.privateKey});
                    break;
                }
            }
        }catch(error){
            reject(error);
        }
    });
}

(async()=>{
    let prefix=readlineSync.question("Enter the prefix: ");
    let resp=await generateVanityContractAddress(prefix);
    console.log(resp);
})();