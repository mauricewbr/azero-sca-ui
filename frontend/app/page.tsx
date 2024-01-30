'use client'

import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { ethers, verifyMessage } from 'ethers'
import { useEffect, useState } from 'react'
import { Account } from 'ui/Account'

type CreateAccountType = { credentials: string }
type InjectedExtension = Awaited<ReturnType<typeof web3Enable>>[number]

export default function Home() {
  const [loadingAccounts, setLoadingAccounts] = useState<boolean>(false)
  const [connectedAccounts, setConnectedAccounts] = useState<Record<string, string[]>>({})

  const [extensions, setExtensions] = useState<InjectedExtension[]>([])

  const loadAccountsFromExtensions = async () => {
    const injectedExtensions = await web3Enable('azero_sca')

    setExtensions(injectedExtensions)
    console.log(injectedExtensions)
  }

  useEffect(() => {
    async function isMetaMaskConnected() {
      // Check if MetaMask's Ethereum provider is injected
      if (window.ethereum) {
        try {
          // Request the currently connected accounts
          const accounts: string[] = await window.ethereum.request({ method: 'eth_accounts' })

          // If accounts are returned, MetaMask is connected
          if (accounts.length > 0) {
            setConnectedAccounts((prevState) => ({ ...prevState, ['metamask']: accounts }))

            return true
          } else {
            console.log('MetaMask is not connected')
            return false
          }
        } catch (error) {
          console.error('An error occurred checking MetaMask connection:', error)
          return false
        }
      } else {
        console.log('Ethereum object not found, MetaMask is not available')
        return false
      }
    }

    async function isAlephZeroSignerConnect() {
      await web3Enable('azero_sca')
      const accounts = await web3Accounts({ extensions: ['aleph-zero-signer'] })

      setConnectedAccounts((prevState) => ({
        ...prevState,
        ['aleph-zero-signer']: accounts.map((account) => account.address),
      }))
    }

    setLoadingAccounts(true)
    isMetaMaskConnected()
    isAlephZeroSignerConnect()
    setLoadingAccounts(false)
  }, [])

  // useEffect(() => {
  //   async function connectToBlockchain() {
  //     const wsProvider = new WsProvider('wss://ws.test.azero.dev')
  //     const api = await ApiPromise.create({ provider: wsProvider })
  //     const chain = (await api.rpc.system.chain())?.toString() || ''

  //     setApiOutput(chain)
  //   }

  //   connectToBlockchain()
  // }, [])

  // useEffect(() => {
  //   async function getCurrentGreeting() {
  //     const wsProvider = new WsProvider('wss://ws.test.azero.dev')
  //     const api = await ApiPromise.create({ provider: wsProvider })

  //     const abi = await import('@azero-sca-ui/contracts/deployments/greeter/greeter.json')
  //     const { address } = await import(
  //       '@azero-sca-ui/contracts/deployments/greeter/alephzero-testnet'
  //     )

  //     const contract = new ContractPromise(api, abi, address)

  //     try {
  //       const gasLimit = getMaxGasLimit(api)
  //       const { result, output } = await contract.query.greet(address, {
  //         gasLimit,
  //       })
  //       console.log(result.toHuman())
  //       if (result.isOk) {
  //         console.log(output?.toHuman())
  //       }
  //     } catch {}
  //   }

  //   getCurrentGreeting()
  // }, [])

  async function handleCreateMetaMaskAccount() {
    let signer = null

    let provider
    if (window.ethereum == null) {
      // If MetaMask is not installed, we use the default provider,
      // which is backed by a variety of third-party services (such
      // as INFURA). They do not have private keys installed,
      // so they only have read-only access
      console.log('MetaMask not installed; using read-only defaults')
      provider = ethers.getDefaultProvider('infura')
    } else {
      // Connect to the MetaMask EIP-1193 object. This is a standard
      // protocol that allows Ethers access to make all read-only
      // requests through MetaMask.
      provider = new ethers.BrowserProvider(window.ethereum)

      // It also provides an opportunity to request access to write
      // operations, which will be performed by the private key
      // that MetaMask manages for the user.
      signer = await provider.getSigner()
      const message = 'sign into ethers.org?'
      const sig = await signer.signMessage(message)
      const verifyResult = verifyMessage(message, sig)
      console.log(sig)
      console.log(verifyResult)
    }
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {/** SEE CONNECTED ACCOUNTS */}
      <div className="col-span-2 flex flex-col w-full p-4 rounded-xl bg-white">
        <p>Connected accounts</p>
        <div className="flex flex-col gap-2 pt-4">
          {!loadingAccounts &&
            Object.keys(connectedAccounts).map((key) =>
              connectedAccounts[key].map((account) => (
                <Account key={`${key}-${account}`}>{account}</Account>
              )),
            )}
        </div>
      </div>
      {/** CREATE NEW ACCOUNTS */}
      <div className="flex flex-col w-full p-4 rounded-xl bg-white">
        <p>Add new account</p>
        <div className="flex flex-col gap-2 whitespace-nowrap">
          <button
            onClick={handleCreateMetaMaskAccount}
            className="flex w-full justify-center px-3 py-2 bg-blue-200 text-blue-700 font-semibold rounded-xl hover:bg-blue-300 hover:text-blue-800"
          >
            Connect MetaMask
          </button>
          <button
            onClick={loadAccountsFromExtensions}
            className="flex w-full justify-center px-3 py-2 bg-blue-200 text-blue-700 font-semibold rounded-xl hover:bg-blue-300 hover:text-blue-800"
          >
            Connect Azero Signer
          </button>
        </div>
      </div>
    </div>
  )
}
