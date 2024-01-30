'use client'

import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { Account } from 'ui/Account'

type InjectedExtension = Awaited<ReturnType<typeof web3Enable>>[number]

export default function Home() {
  const [loadingAccounts, setLoadingAccounts] = useState<boolean>(false)
  const [connectedAccounts, setConnectedAccounts] = useState<Record<string, string[]>>({})

  const loadAccountsFromExtensions = async () => {
    await web3Enable('azero_sca')
  }

  useEffect(() => {
    async function isMetaMaskConnected() {
      if (window.ethereum) {
        try {
          const accounts: string[] = await window.ethereum.request({ method: 'eth_accounts' })

          if (accounts.length > 0) {
            // This should call getAccounts on backend
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

    async function isAlephZeroSignerConnected() {
      await web3Enable('azero_sca')
      const accounts = await web3Accounts({ extensions: ['aleph-zero-signer'] })

      // This should call getAccounts on backend
      setConnectedAccounts((prevState) => ({
        ...prevState,
        ['aleph-zero-signer']: accounts.map((account) => account.address),
      }))
    }

    async function isKeplrConnected() {
      if (!window.keplr) {
        alert('Please install keplr extension')
      } else {
        const chainId = 'cosmoshub-4'

        await window.keplr.enable(chainId)

        const offlineSigner = window.keplr.getOfflineSigner(chainId)

        const accounts = await offlineSigner.getAccounts()
        console.log(accounts)

        // This should call getAccounts on backend
        setConnectedAccounts((prevState) => ({
          ...prevState,
          ['cosm']: accounts.map((account) => account.address),
        }))
      }
    }

    setLoadingAccounts(true)
    isMetaMaskConnected()
    isAlephZeroSignerConnected()
    isKeplrConnected()
    setLoadingAccounts(false)
  }, [])

  async function handleCreateMetaMaskAccount() {
    let signer = null

    let provider
    if (window.ethereum == null) {
      console.log('MetaMask not installed; using read-only defaults')
      provider = ethers.getDefaultProvider('infura')
    } else {
      provider = new ethers.BrowserProvider(window.ethereum)

      signer = await provider.getSigner()
      const message = 'SAMPLE_MESSAGE'
      const signature = await signer.signMessage(message)

      console.log(signer)

      const keplrPayload = {
        message,
        signature,
        signer: signer.address,
      }

      // Call createAccount contract, then refetch connected accounts
    }
  }

  async function handleCreateKeplrAccount() {
    if (!window.keplr) {
      alert('Please install keplr extension')
    } else {
      const chainId = 'cosmoshub-4'

      await window.keplr.enable(chainId)

      const offlineSigner = window.keplr.getOfflineSigner(chainId)
      const accounts = await offlineSigner.getAccounts()

      const message = 'SOME_MESSAGE'
      const res = await window.keplr.signArbitrary(chainId, accounts[0].address, message)

      const keplrPayload = {
        message,
        signature: res.signature,
        pubkey: res.pub_key.value,
        hrp: 'cosmos',
      }

      // Call createAccount contract, then refetch connected accounts
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
          <button
            onClick={handleCreateKeplrAccount}
            className="flex w-full justify-center px-3 py-2 bg-blue-200 text-blue-700 font-semibold rounded-xl hover:bg-blue-300 hover:text-blue-800"
          >
            Connect Keplr
          </button>
        </div>
      </div>
    </div>
  )
}
