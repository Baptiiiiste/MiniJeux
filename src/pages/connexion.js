import Image from 'next/image'
import styles from '@/styles/InscriptionConnexion.module.css'
import Header from '@/components/Header'
import gameboy from '@/assets/images/gameboy.png'
import FormulaireConnexion from '@/components/FormulaireConnexion'


export default function Inscription() {
    return (
        <div className={styles.container}>

            <Header />

            <main className={styles.content}>

                <section className={styles.inscriptionBlock}>

                    <FormulaireConnexion/>

                </section>

                <section className={styles.imageBlock}>
                    <Image className={styles.image} src={gameboy} alt="index.js (Home) | imageBlock | image not displaying"></Image>
                </section>

            </main>

        </div>
    )
}
