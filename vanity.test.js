const { generateVanityAddress } = require("./vanity_eoa");
const assert = require("assert");

describe("Vanity Address Generator", async function () {
  it("should create a vanity address with the given prefix", async function () {
    const prefix = "0x00";
    const wallet = await generateVanityAddress(prefix);
    assert(wallet.address.toLowerCase().startsWith(prefix.toLowerCase()));
  });
});
