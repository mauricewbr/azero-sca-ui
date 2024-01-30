import Image from 'next/image'

export function Account(props: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <Image src="/images/metamask.png" width={25} height={25} alt="Picture of the author" />
      {props.children}
    </div>
  )
}
