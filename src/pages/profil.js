import styles from '@/styles/Profil.module.css'
import Header from '@/components/Header'
import ProfilStatsBlock from '@/components/profilStatsBlock'
import { useRouter } from 'next/router'
import getUser from '@/utils/functions/getUser'
import { useEffect } from 'react'


export default function Profil() {

    //const router = useRouter();

    //if(!user) return router.push('/');

    async function getStats() {
        const user = getUser();
        const resp = await user.getAllumettesStats().then(resp =>{ return resp});
        //if(!stats)  return router.push('/');
        console.log(resp);
    } 
    
    useEffect(() => {
        console.log(getStats());        
    }, [])
    

        


    return (
        <div className={styles.container}>

            <Header />

            <main className={styles.content}>

                <ProfilStatsBlock
                    title={"Allumettes"}
                    //statsArray={stats}
                    
                />
                <ProfilStatsBlock
                    title={"Blackjack"}
                    //statsArray={stats}
                
                />

                {/* pour changer ses infos perso */}
                <ProfilStatsBlock
                    title={"INFORMATIONS"}
                    //statsArray={stats}
                    
                />

            </main>

        </div>
    )
}
