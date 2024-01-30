interface Window {
  ethereum?: {
    isMetaMask?: boolean
    request: (...args: any[]) => Promise<any>
    // Add other properties and methods you need here
  }
}
