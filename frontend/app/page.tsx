'use client'

import { ApiPromise, WsProvider } from '@polkadot/api'
import { ContractPromise } from '@polkadot/api-contract'
import { contractTx } from 'helpers/contractCall'
import { getMaxGasLimit } from 'helpers/gas'
import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'

type CreateAccountType = { credentials: string }

export default function Home() {
  const [apiOutput, setApiOutput] = useState<string>()

  const { register, reset, handleSubmit } = useForm<CreateAccountType>()

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

  async function handleCreateAccount({ credentials }: CreateAccountType) {
    const wsProvider = new WsProvider('wss://ws.test.azero.dev')
    const api = await ApiPromise.create({ provider: wsProvider })

    const abi = await import('@azero-sca-ui/contracts/deployments/greeter/greeter.json')
    const { address } = await import(
      '@azero-sca-ui/contracts/deployments/greeter/alephzero-testnet'
    )

    const contract = new ContractPromise(api, abi, address)

    try {
      // await contractTx(api, address, contract, 'createAccount', [credentials])
      await contractTx()
      console.log(credentials)
      reset()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col w-full p-4 rounded-xl bg-white">
        <p>Connected chain</p>
        <p className="pt-4 font-semibold">{apiOutput}</p>
      </div>
      {/** CREATE ACCOUNT FORM */}
      <div className="flex flex-col w-full p-4 rounded-xl bg-white">
        <form
          onSubmit={handleSubmit(handleCreateAccount)}
          className="flex flex-col justify-end gap-2"
        >
          <p>Insert Master Credentials</p>
          <div className="flex gap-2">
            <input
              {...register('credentials')}
              className="flex w-full rounded-xl border border-input px-3"
            />
            <button
              type="submit"
              className="flex whitespace-nowrap justify-center px-3 py-2 bg-blue-200 text-blue-700 font-semibold rounded-xl hover:bg-blue-300 hover:text-blue-800"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
