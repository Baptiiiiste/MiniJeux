import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'

import gameboy from '../assets/images/gameboy.png'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className={styles.container}>

        <Header/>

        <main className={styles.content}>

          <section className={styles.textBlock}>
            <div className={styles.texts}>
              <h1 className={styles.textsTitle}>MINI JEUX</h1>
              <span className={styles.textsDescription}>Jouez et découvrez nos nombreux mini-jeux contre une IA !</span>
            </div>

            <button className={styles.playButton}> <FontAwesomeIcon className={styles.arrowIcon} icon={faCircleArrowRight} /> <span className={styles.spanButton}>Jouer</span></button> 
          </section>

          <section className={styles.imageBlock}>
            <Image className={styles.image} src={gameboy} alt="index.js (Home) | imageBlock | image not displaying"></Image>
          </section>

        </main>

    </div>
  )
}
