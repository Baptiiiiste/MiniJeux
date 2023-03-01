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
            resp.set('totalMatchesTakenByUserOnLose', resp.get('totalMatchesTakenByUser') - resp.get('totalMatchesTakenByUserOnWin'));
            resp.set('totalMatchesTakenByAIOnLose', resp.get('totalMatchesTakenByAI') - resp.get('totalMatchesTakenByAIOnWin'));
            
    
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
                    case 'totalMatchesTakenByUser':
                        key = 'Allumettes prises par le joueur';
                        break;
                    case 'totalMatchesTakenByAI':
                        key = 'Allumettes prises par l\'IA';
                        break;
                    case 'totalMatchesTakenByUserOnWin':
                        key = 'Allumettes prises par le joueur sur les parties gagnées';
                        break;
                    case 'totalMatchesTakenByAIOnWin':
                        key = 'Allumettes prises par l\'IA sur les parties gagnées';
                        break;
                    case 'totalMatchesTakenByUserOnLose':
                        key = 'Allumettes prises par le joueur sur les parties perdues';
                        break;
                    case 'totalMatchesTakenByAIOnLose':
                        key = 'Allumettes prises par l\'IA sur les parties perdues';
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