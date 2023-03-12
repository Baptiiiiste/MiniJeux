import styles from '@/styles/Profil.module.css'
import Header from '@/components/Header'
import AllumettesStatsBlock from '@/components/AllumettesStatsBlock'
import getUser from '@/utils/functions/getUser'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import BlackjackStatsBlock from '@/components/BlackjackStatsBlock'
import ProfilInfo from '@/components/ProfilInfo'

export default function Profil() {

    const router = useRouter();
    const user = getUser();

    useEffect(() => {
        if(!user) return router.push('/connexion');
    }, [])


    return (
        <div className={styles.container}>

            <Header />

            <main className={styles.content}>

                <AllumettesStatsBlock/>

                <BlackjackStatsBlock/>

                <ProfilInfo/>

            </main>

        </div>
    )
}
