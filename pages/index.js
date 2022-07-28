import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (<>
    <div className='flex h-screen'>
      <div className='mx-auto my-auto text-center'>
        <img src='http://assets.stickpng.com/images/61d183263a856e0004c6334a.png' width={100} className='mx-auto' />
        <h1 className='font-bold text-6xl text-red-600'>Among Us</h1>
        <Link href='/play'>
          <a className='text-3xl p-2 mt-4 rounded-lg font-medium flex bg-red-500'>
            Play a match <span className='ml-auto text-red-300'>P</span>
          </a>
        </Link>
      </div>
    </div>
  </>)
}
