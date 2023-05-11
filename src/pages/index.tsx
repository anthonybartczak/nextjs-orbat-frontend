import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Navbar />
      <main className='flex align-middle h-screen'>
        <div className='flex flex-col m-auto text-gray-300 gap-y-2'>
          <h1 className='text-5xl'>Welcome to ORBAT creator!</h1>
          <p className='text-2xl'><Link className="underline" href={'/platoons'}>Here</Link> you can find a full list of all of the currently available structures.</p>
          <p className='text-2xl'>The site is still under heavy development but I hope you enjoy your stay :).</p>
          <p className='text-2xl'>You can always reach out to me via <a className='underline' href="mailto:contact@anteriam.live">contact@anteriam.live</a></p>
        </div>
      </main>
    </>
  )
}
