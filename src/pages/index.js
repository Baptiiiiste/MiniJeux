import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <body className={styles.body}>
        <Header/>
        <main className={styles.main}>
          <div className='presentation'>
            coucou
          </div>
          <div className='image'>
            coucou2
          </div>
        </main>
      </body>
    </>
  )
}
