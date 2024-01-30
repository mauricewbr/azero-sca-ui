'use client'

import { useState } from 'react'

export function CreateAccountCard() {
  const [masterCredentials, setMasterCredentials] = useState<string | null>(null)
  function handleInputChange(value: string | null) {
    setMasterCredentials(value)
  }
  function handleCreateAccount() {
    setMasterCredentials(null)
  }
  return (
    <div className="flex flex-col p-4">
      <p>Input master credentials:</p>
      <input value={masterCredentials || ''} onChange={(e) => handleInputChange(e.target.value)} />
      <button onClick={handleCreateAccount}>Create Account</button>
    </div>
  )
}
