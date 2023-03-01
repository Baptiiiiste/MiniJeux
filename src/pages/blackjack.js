import Header from '@/components/Header'
import styles from '@/styles/Blackjack.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import de1 from '@/assets/images/1.png';
import Image from 'next/image'

export default function Blackjack() {

return (
    <div id="container" className={styles.container}>
        <Header/>
        <main id="content" className={styles.content}>
            <div id="main" className={styles.main}>
                <div id="name_player_get" className={styles.name_player_get}></div>
                <div id="board" className={styles.board}>
                    <div id="game_board" className={styles.game_board}>
                        <Image id="dice1" className={styles.dice} src={de1}></Image>
                        <Image id="dice1" className={styles.dice} src={de1}></Image>
                        <Image id="dice1" className={styles.dice} src={de1}></Image>
                    </div>
                    <input type="button" id="validButton" className={styles.validButton} value="Lancer les dés selectionnés"/>
                    <p id="goal" className={styles.goal}> Objectif : Avoir un plus grand score que son adversaire sans dépasser 21</p>
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