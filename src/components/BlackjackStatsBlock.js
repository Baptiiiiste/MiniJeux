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
                        key = 'Dé lancés par le joueur';
                        break;
                    case 'totalDiceThrownByAI':
                        key = 'Dé lancés par l\'IA';
                        break;
                    case 'sumDiceThrownByAI':
                        key = 'Somme des dés lancés par l\'IA';
                        break;
                    case 'sumDiceThrownByUser':
                        key = 'Somme des dés lancés par le joueur';
                        break;
                    case 'total21ByUser':
                        key = 'Nombre de 21 fait par le joueur';
                        break;
                    case 'total21ByAI':
                        key = 'Nombre de 21 fait par l\'IA';
                        break;
                    case 'totalBustByUser':
                        key = 'Nombre de bust fait par le joueur';
                        break;
                    case 'totalBustByAI':
                        key = 'Nombre de bust fait par l\'IA';
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