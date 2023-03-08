import styles from '@/styles/Profil.module.css'
import Header from '@/components/Header'
import AllumettesClassement from '@/components/AllumettesClassement'
import BlackjackClassement from '@/components/BlackjackClassement'



export default function Profil() {


    return (
        <div className={styles.container}>

            <Header />

            <main className={styles.content}>

                <AllumettesClassement/>
                <BlackjackClassement/>

            </main>

        </div>
    )
}
