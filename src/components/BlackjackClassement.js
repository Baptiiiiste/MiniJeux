import styles from "@/styles/ProfilStatsBlock.module.css"
import { useRouter } from "next/router"
import { useEffect } from "react";
import getUser from "@/utils/functions/getUser";
import useFetch from "@/utils/hooks/useFetch";

export default function AllumettesStatsBlock() {

    const router = useRouter();

    useEffect((router) => {

        async function getMatchesStats(router) {


            let resp = await useFetch.get('/api/stats/blackjack/get');
            
            
            if(!resp)  {
                return document.body.innerHTML = 'No blackjack stats found';
            }
            const winners = new Map()
            resp.data.forEach((stats) => {
                winners.set(stats.user, stats.totalWins + ` victoire${stats.totalWins > 1 ? 's' : ''}`);
            });



            let i = 1;     
            winners.forEach((value, key) => {

            
                let parent = document.querySelector(`.${styles.parentBlackjack}`)

                let uniqueStatsDiv = document.createElement('div');
                uniqueStatsDiv.setAttribute("class", styles.statsContent)
                

                let uniqueStatsP = document.createElement('span');
                uniqueStatsP.setAttribute("class", styles.statsValue);
                uniqueStatsP.innerHTML = `<strong>${i}. ${key}:</strong> ${value}`;

                uniqueStatsDiv.appendChild(uniqueStatsP);
                parent.appendChild(uniqueStatsDiv);

                i++;

            });

            for(let j = winners.size ; j < 10; j++) {
                let parent = document.querySelector(`.${styles.parentBlackjack}`)

                let uniqueStatsDiv = document.createElement('div');
                uniqueStatsDiv.setAttribute("class", styles.statsContent)
                

                let uniqueStatsP = document.createElement('span');
                uniqueStatsP.setAttribute("class", styles.statsValue);
                uniqueStatsP.innerHTML = `<strong>${i}. ???????? :</strong> ????????`;

                uniqueStatsDiv.appendChild(uniqueStatsP);
                parent.appendChild(uniqueStatsDiv);

                i++;
            }

        } 
        getMatchesStats(router);
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