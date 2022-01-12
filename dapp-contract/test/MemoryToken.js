const MemoryToken = artifacts.require("./contracts/MemoryToken.sol")

require("chai").use(require("chai-as-promised")).should()

contract("Memory Token", (accounts) => {
  let token

  describe("token deploy", async () => {
    it("deploys successfully", async () => {
      token = await MemoryToken.deployed()

      const address = token.address

      assert.notEqual(address, 0x0)
      assert.notEqual(address, "")
      assert.notEqual(address, null)
      assert.notEqual(address, false)
      assert.notEqual(address, undefined)
      assert.equal(typeof address, "string")
      assert(address.startsWith("0x"))
    })

    it("has name", async () => {
      const name = await token.name()
      assert.equal(name, "Memory Token")
    })

    it("has symbol", async () => {
      const symbol = await token.symbol()
      assert.equal(symbol, "MENTOK")
    })
  })
  describe("mint token", async () => {
    let result
    let balanceOf
    it("total supply", async () => {
      await token.mint(accounts[0], "http://outracoisa.co/nft")

      result = await token.totalSupply()
      assert.equal(result.toString(), "1", "total supply is correct")
    })
    it("balanceOf", async () => {
      balanceOf = await token.balanceOf(accounts[0])
      assert.equal(balanceOf.toString(), "1", "balanceOf is correct")
    })
    it("owner is correct", async () => {
      result = await token.ownerOf("0")
      assert.equal(result.toString(), accounts[0].toString(), "owner is correct")
    })
    it("tokens in the wallet", async () => {
      let tokensIds = []

      for (let i = 0; i < balanceOf; i++) {
        let tokenid = await token.tokenOfOwnerByIndex(accounts[0], i)
        tokensIds.push(tokenid.toString())
      }

      assert.equal(["0"].toString(), tokensIds.toString(), "owner is correct")
    })
    it("nft tokens has the uri", async () => {
      let tokenURI = await token.tokenURI("0")
      assert.equal(tokenURI, "http://outracoisa.co/nft")
    })
  })
})
