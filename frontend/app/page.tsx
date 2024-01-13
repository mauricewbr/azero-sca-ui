'use client'

import { useEffect, useState } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { getDeploymentData } from '@/utils/getDeploymentData'
import { CodePromise, ContractPromise } from '@polkadot/api-contract'
import { getMaxGasLimit } from 'helpers/gas'

export default function Home() {
  const [apiOutput, setApiOutput] = useState<string>()
  useEffect(() => {
    async function connectToBlockchain() {
      const wsProvider = new WsProvider('wss://ws.test.azero.dev')
      const api = await ApiPromise.create({ provider: wsProvider })
      const chain = (await api.rpc.system.chain())?.toString() || ''

      setApiOutput(chain)
    }

    connectToBlockchain()
  }, [])

  useEffect(() => {
    async function getCurrentGreeting() {
      const wsProvider = new WsProvider('wss://ws.test.azero.dev')
      const api = await ApiPromise.create({ provider: wsProvider })

      const abi = await import('@azero-sca-ui/contracts/deployments/greeter/greeter.json')
      const { address } = await import(
        '@azero-sca-ui/contracts/deployments/greeter/alephzero-testnet'
      )

      const contract = new ContractPromise(api, abi, address)

      try {
        const gasLimit = getMaxGasLimit(api)
        const { result, output } = await contract.query.greet(address, {
          gasLimit,
        })
        console.log(result.toHuman())
        if (result.isOk) {
          console.log(output?.toHuman())
        }
      } catch {}
    }

    getCurrentGreeting()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center">
        <p>Genesis Hash:</p>
        <p>{apiOutput}</p>
      </div>
    </main>
  )
}
