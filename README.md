# AzeroSCA - Aleph Zero Smart Contract Account System

## Project Purpose

AzeroSCA aims to redefine blockchain account management on Aleph Zero by introducing a fully on-chain, decentralized smart contract account system. This project addresses the need for enhanced security, flexibility, and user accessibility in managing blockchain transactions and assets. Unlike traditional account models, AzeroSCA allows users to execute transactions using various signing schemes, including popular wallets like MetaMask, thus bridging the gap between security and convenience.

## Problem Solved

In the evolving landscape of blockchain technology, managing digital assets securely and efficiently remains a significant challenge. Traditional externally owned accounts (EOAs) offer limited security and flexibility, especially for complex operations or collaborative asset management. AzeroSCA solves this by:

- **Enhancing Security:** Utilizes multi-signature transactions and customizable security protocols, significantly reducing the risk of unauthorized access.
- **Increasing Flexibility:** Supports any signing scheme, allowing for seamless integration with existing wallets and tools.
- **Improving Accessibility:** Makes blockchain interactions more user-friendly, encouraging wider adoption and engagement.
- **Facilitating Decentralization:** Ensures that account management is fully decentralized, aligning with the core principles of blockchain technology.

## Key Ideas

AzeroSCA's core concepts revolve around:

- **Decentralized Account Registry:** A blockchain-based registry that records smart contract accounts, enabling complex and secure account management strategies.
- **Multi-Signature Support:** Allows accounts to require multiple signatures for transactions, enhancing security and collaborative governance.
- **Customizable Security Policies:** Users can define their security parameters, such as recovery mechanisms and transaction limits.
- **Interoperability with Existing Wallets:** Integration with widely used wallets like MetaMask, ensuring a familiar and accessible user experience.

## Architecture Overview

AzeroSCA's architecture is designed to be modular and scalable, comprising several key components:

- **Smart Contract Framework:** At the heart of AzeroSCA are two smart contracts deployed on Aleph Zero. These contracts handle account creation and registration, transaction processing, and security policy enforcement.
- **Account Registry:** A decentralized ledger that records all smart contract accounts and their associated policies, accessible on-chain for transparency and security.
- **User Interface (UI):** A web-based UI that interacts with the smart contracts, providing a user-friendly way to manage accounts, view transaction history, and configure security settings.

## Potential Future Roadmap

This project is close to our hearts as our team is navigating blockchain ecosystems both as developers and users. We want to continue building and ensuring that any Aleph Zero user will be able to benefit from secure, flexible, and intuitively accessible transactions.

- Enhance available smart contract operations beyond sending and receiving funds
- Expand possible signing schemes to hardware-based methods like iPhone's PassKey, essentially allowing anybody to sign transactions with their phone (wink wink, Telekom)
- Integrate token-bound accounts to enable free trade of user accounts inside registry

## Running the project Locally

This local setup is designed to run in conjunction with the Aleph Zero testnet.

### 📚 - Getting the Repository

1. Visit the [AzeroSCA](https://github.com/mauricewbr/azero-sca-ui) repo and fork the project.
2. Then clone your forked copy to your local machine and get to work.

```sh
git clone https://github.com/mauricewbr/azero-sca-ui
cd azero-sca-ui
```

### 📦 - Install Dependencies

```sh
pnpm install
```

### 💻 - Run Web App

Start a local development frontend. After running the below command you can open [http://localhost:3000](http://localhost:3000) in your browser to view the frontend.

```sh
pnpm run dev
```
