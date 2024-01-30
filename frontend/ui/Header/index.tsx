'use client'
import Image from 'next/image'
import Link from 'next/link'

function Header() {
  return (
    <header className="sticky top-0 z-40 flex w-full drop-shadow-1">
      <div className="flex flex-grow items-center justify-between px-4 py-6 shadow-2 md:px-6 2xl:px-10">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image width={32} height={32} src={'/images/logo/logo-icon.svg'} alt="Logo" />
          </Link>
        </div>

        <div className="hidden sm:block">
          <p className="font-bold text-3xl">Good afternoon, Ser</p>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* <button className="flex justify-center px-5 py-2 bg-blue-200 text-blue-700 font-semibold rounded-xl hover:bg-blue-300 hover:text-blue-800">
            Create Account
          </button> */}
          {/* <Link
            className="flex justify-center px-5 py-2 bg-blue-200 text-blue-700 font-semibold rounded-xl hover:bg-blue-300 hover:text-blue-800"
            href={'/create-account'}
            passHref
          >
            Create Account
          </Link> */}
        </div>
      </div>
    </header>
  )
}

export default Header
