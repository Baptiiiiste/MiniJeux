import styles from '@/styles/Profil.module.css'
import Header from '@/components/Header'
import ProfilStatsBlock from '@/components/profilStatsBlock'
import { useRouter } from 'next/router'
import getUser from '@/utils/functions/getUser'
import { useEffect, useState } from 'react'
import { API_GET_ALLUMETTES_STATS, API_SET_ALLUMETTES_STATS, API_GET_BLACKJACK_STATS, API_SET_BLACKJACK_STATS } from "@/assets/variables";
import { ST } from 'next/dist/shared/lib/utils'



export default function Profil() {

    const router = useRouter();
    const [matchesStats, setMatchesStats] = useState();

    async function getMatchesStats() {
        let StatsMap = new Map();
        const user = getUser();
        if(!user) return router.push('/connexion');

        // const resp = await user.getAllumettesStats();
        let resp = await fetch(`${API_GET_ALLUMETTES_STATS}/${user.pseudo}`, {method: 'GET'})
        resp = await resp.json()
        if(!resp)  {
            user.logout();
            return router.push('/connexion');
        }
        for(let elm in resp.data){
            if(elm === '_id') break;
            StatsMap.set(elm, resp.data[elm])
        }
        setMatchesStats(StatsMap)
    } 

    // useEffect(() => {
    //     getMatchesStats();
    //     console.log(matchesStats)
    // }, [])

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
