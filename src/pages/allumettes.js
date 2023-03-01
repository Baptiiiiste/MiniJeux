import Header from '@/components/Header'
import { useEffect } from 'react'
import styles from '@/styles/Allumettes.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import AllumettesGame from '@/utils/models/AllumettesGame';


export default function Home() {

    let game = new AllumettesGame();
    game.play();

    useEffect(() => {
        document.querySelector('#bt_remove').addEventListener("click", game.player_remove());
        document.querySelector('#playButton').addEventListener("click", function(){
            location.reload(); // Ne pas faire de reload, mais réinitialiser les variables et les éléments du DOM
        });
    }, [])

  return (

    <div id="container" className={styles.container}>
        <Header/>
        <main id="content" className={styles.content}>
            <div id="main" className={styles.main}>
                <div id="name_player_get" className={styles.name_player_get}></div>
                <div id="board" className={styles.board}>
                    <div id="game_board" className={styles.game_board}></div>
                    <input type="button" id="bt_remove" className={styles.bt_remove} value="Valider"/>
                    <p id="goal" className={styles.goal}> Objectif : ne pas avoir la dernière allumette</p>
                </div>
			</div>
            <div id="log" className={styles.log}>
                <h3 className={styles.logTitle}>LOGS</h3><hr/>
                <div id="logMes" className={styles.logMes}></div>
                <button id="playButton" className={styles.playButton}> <FontAwesomeIcon className={styles.arrowIcon} icon={faCircleArrowRight} /> <span className={styles.spanButton}>Relancer la partie</span></button> 
            </div>
        </main>
    </div>
 
  )
}