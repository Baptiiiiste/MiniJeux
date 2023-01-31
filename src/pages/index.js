import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'

import gameboy from '../assets/images/gameboy.png'
import fleche from '../assets/images/fleche.svg'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.home}>
        <Header/>
        <div className={styles.main}>
          <div className={styles.presentation}>
            <p className={styles.titre}>MINI JEUX</p>
            <p className={styles.text_presentation}>Jouez et découvrez nos nombreux mini-jeux</p>
            <button className={styles.button_jouer} type="submit">
              <Image className={styles.img_button} src={fleche} alt='/'/>
              <p className={styles.text_button}>Jouez</p>
            </button>
          </div>
          <div className={styles.image}>
            <Image className={styles.img} src={gameboy} alt='/'/>
          </div>
        </div>
    </div>
  )
}
