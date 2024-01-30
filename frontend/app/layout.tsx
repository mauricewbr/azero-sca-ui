import type { Metadata } from 'next'
import 'styles/globals.css'
import Header from 'ui/Header'
import { Sidebar } from 'ui/Sidebar'

export const metadata: Metadata = {
  title: {
    default: 'Azero Hack - SCA Project',
    template: '%s | Azero Hack - SCA Project',
  },
  description:
    'A 2024 Aleph Zero hackathon project, building smart contract account-based identity infrastructure.',
  openGraph: {
    title: 'Azero Hackathon SCA Project',
    description:
      'A 2024 Aleph Zero hackathon project, building smart contract account-based identity infrastructure.',
    images: [`/api/og?title=Next.js App Router`],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout(props: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-blue-50">
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <Header />

              <main className="px-4 py-4 shadow-2 md:px-6 2xl:px-10">
                {props.children} {props.modal}
                {/* <div id="modal-root" /> */}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
