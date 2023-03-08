import styles from "@/styles/ProfilStatsBlock.module.css"
import { useRouter } from "next/router"
import { useEffect } from "react";
import getUser from "@/utils/functions/getUser";

export default function AllumettesStatsBlock() {

    const router = useRouter();

    useEffect((router) => {

        async function getMatchesStats(router) {
            const user = getUser();
            let resp = await user.getAllumettesStats();

            if(!resp)  {
                user.logout();
                return router.push('/connexion');
            }
            
    
            resp.set('totalLoses', resp.get('totalGames') - resp.get('totalWins'));
            resp.set('percentage', resp.get('totalWins') / (resp.get('totalGames') == 0 ? 1 : resp.get('totalGames')) * 100);
           
    
            resp.forEach((value, key) => {

                switch (key) {
                    case 'totalGames':
                        key = 'Parties jouées';
                        break;
                    case 'totalWins':
                        key = 'Parties gagnées';
                        break;
                    case 'totalLoses':
                        key = 'Parties perdues';
                        break;
                    case 'percentage':
                        key = 'Pourcentage de victoires';
                        if(value == 1) value = 0;
                        value += "%";
                        break;
                    default:
                        break;
                }

                let parent = document.querySelector(`.${styles.parentAllumettes}`)

                let uniqueStatsDiv = document.createElement('div');
                uniqueStatsDiv.setAttribute("class", styles.statsContent)
                

                let uniqueStatsP = document.createElement('span');
                uniqueStatsP.setAttribute("class", styles.statsValue);
                uniqueStatsP.innerHTML = `<strong>${key}:</strong> ${value}`;

                uniqueStatsDiv.appendChild(uniqueStatsP);
                parent.appendChild(uniqueStatsDiv);

            });

        
        } 
        getMatchesStats(router);
    }, [])


    return (
        <section className={styles.container}>

            <div className={styles.upperBlock}>
                <h1 className={styles.title}>Allumettes</h1>
            </div>

            <div className={styles.parentAllumettes}>

            </div>

        </section>
    )
}