'use client'

import { useEffect, useState } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center">
        <p>Genesis Hash:</p>
        <p>{apiOutput}</p>
      </div>
    </main>
  )
}
