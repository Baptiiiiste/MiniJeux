import styles from "@/styles/ProfilStatsBlock.module.css"
import { useRouter } from "next/router"
import { useEffect } from "react";
import getUser from "@/utils/functions/getUser";

export default function BlackjackStatsBlock() {

    const router = useRouter();

    useEffect((router) => {

        async function getBlackjackStats(router) {
            const user = getUser();
            let resp = await user.getBlackJackStats();

            if(!resp)  {
                user.logout();
                return router.push('/connexion');
            }
    
    
            resp.set('totalLoses', resp.get('totalGames') - resp.get('totalWins'));
            resp.set('percentage', resp.get('totalWins') / (resp.get('totalGames') == 0 ? 1 : resp.get('totalGames')) * 100);
            resp.set('averageScoreOfDiceThrownByUser', resp.get('totalScore') / resp.get('totalDiceThrownByUser') == 0 ? 1 : resp.get('totalDiceThrownByUser'));
            resp.set('averageDiceThrownPerGameByUser', resp.get('totalDiceThrownByUser') / resp.get('totalGames') == 0 ? 1 : resp.get('totalGames'));
            resp.delete('totalScore');
            
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
                    case 'totalDiceThrownByUser':
                        key = 'Nombre de dés lancés';
                        break;
                    case 'total21ByUser':
                        key = 'Nombre de 21 fait';
                        break;
                    case 'totalBustByUser':
                        key = 'Nombre de bust fait';
                        break;
                    case "averageScoreOfDiceThrownByUser":
                        key = "Moyenne des dés lancés";
                        break;
                    case "averageDiceThrownPerGameByUser":
                        key = "Moyenne du nombre de dés lancés par partie";
                        break;
                    case 'percentage':
                        key = 'Pourcentage de victoires';
                        value += "%"
                        break;
                    default:
                        break;

                }

                let parent = document.querySelector(`.${styles.parentBlackjack}`)

                let uniqueStatsDiv = document.createElement('div');
                uniqueStatsDiv.setAttribute("class", styles.statsContent)
                

                let uniqueStatsP = document.createElement('span');
                uniqueStatsP.setAttribute("class", styles.statsValue);
                uniqueStatsP.innerHTML = `<strong>${key}:</strong> ${value}`;

                uniqueStatsDiv.appendChild(uniqueStatsP);
                parent.appendChild(uniqueStatsDiv);

            });

        
        } 
        getBlackjackStats(router);
    }, [])


    return (
        <section className={styles.container}>

            <div className={styles.upperBlock}>
                <h1 className={styles.title}>Blackjack</h1>
            </div>

            <div className={styles.parentBlackjack}>

            </div>

        </section>
    )
}