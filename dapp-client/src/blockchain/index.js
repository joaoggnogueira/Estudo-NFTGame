import React, { createContext, useContext, useState } from "react"
import MemoryToken from "./contracts/MemoryToken.json"
import Web3 from 'web3'

const BlockchainContext = createContext()

export const BlockchainProvider = ({ children }) => {
  const [account, setAccount] = useState()
  const [balance, setBalance] = useState()
  const [token, setToken] = useState()
  const [isAuthenticated, setAuthenticated] = useState()

  const [myTokens, setMyTokens] = useState()

  const loadWeb3 = async () => {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        return true
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        return true
      } else {
        window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!")
        return false
      }
    } catch (err) {
      window.alert("Error on login into your Wallet", err)
      return false
    }
  }

  const loadBlockchainData = async () => {
    const { web3 } = window
    const accounts = await web3.eth.getAccounts()

    setAccount(accounts[0])

    const networkId = await web3.eth.net.getId()
    const networkData = MemoryToken.networks[networkId]
    if (networkData) {
      const abi = MemoryToken.abi
      const address = networkData.address

      const balance = web3.utils.fromWei(await web3.eth.getBalance(address), "ether")
      const _token = new web3.eth.Contract(abi, address)

      setToken(_token)
      setBalance(balance)

      await getMyTokensFromBlockchain(_token, accounts[0]) //que porra é essa aqui
    } else {
      window.alert("Falha ao obter contrato na rede")
    }
  }

  const getMyTokensFromBlockchain = async (token, account) => {
    let balanceOf = await token.methods.balanceOf(account).call()

    const blockchainTokens = []
    for (let i = 0; i < balanceOf; i++) {
      const id = await token.methods.tokenOfOwnerByIndex(account, i).call()
      const tokenURI = await token.methods.tokenURI(id).call()
      blockchainTokens.push(tokenURI)
    }

    setMyTokens(blockchainTokens)
  }
  const doMint = async (tokenURI, events) => {
    const { onRegistered, onConfirmation, onError, onReceipt } = events
    token.methods
      .mint(account, tokenURI)
      .send({ from: account })
      .on("receipt", async (tokenURI) => {
        await onReceipt(tokenURI)
        await getMyTokensFromBlockchain(token, account)
      })
      .on("error", async (err) => {
        await onError(err)
        await getMyTokensFromBlockchain(token, account)
      })
      .on("transactionHash", async (hash) => {
        console.log("Seu NFT foi registrado com sucesso")
        await onRegistered(hash)
        await getMyTokensFromBlockchain(token, account)
      })
      .on("confirmation", async (confirmationNumber, receipt) => {
        await onConfirmation(confirmationNumber, receipt)
        await getMyTokensFromBlockchain(token, account)
      })
  }

  const doLogin = async () => {
    if (await loadWeb3()) {
      await loadBlockchainData()
      setAuthenticated(true)
    }
  }

  return (
    <BlockchainContext.Provider
      value={{
        isLogged: isAuthenticated,
        account,
        balance,
        myTokens,
        getMyTokensFromBlockchain,
        doLogin,
        doMint,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  )
}

export default BlockchainContext

export function useBlockchain() {
  return useContext(BlockchainContext)
}
