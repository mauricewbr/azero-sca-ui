import { Window as KeplrWindow } from '@keplr-wallet/types'

// Declare a module augmentation for the global 'Window' interface
declare global {
  // Extend the global 'Window' interface
  interface Window extends KeplrWindow {
    ethereum?: {
      isMetaMask?: boolean
      request: (...args: any[]) => Promise<any>
      // Add other properties and methods you need here
    }
  }
}

// Now you can use 'window.keplr' and 'window.ethereum' in your code
