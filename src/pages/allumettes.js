import Header from '@/components/Header'
import { useEffect } from 'react'
import styles from '@/styles/Allumettes.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import getUser from '@/utils/functions/getUser';

export default function Home() {

    const userConnected = getUser()

    useEffect(() => {

    document.querySelector('#bt_remove').addEventListener("click", player_remove);
    document.querySelector('#playButton').addEventListener("click", function(){
        location.reload(); // Ne pas faire de reload, mais réinitialiser les variables et les éléments du DOM
    });

    let allumette_restante=20;
    let joueur1 = userConnected ? userConnected.pseudo : "Joueur1"; //on recuperera le nom du premier joueur
    let joueur2="Ordinateur";
    let nb_allumette_prise=0;
    let nom_joueur=""; //nom du joueur en cours

    play();

    function play(){
        nom_joueur=joueur1;
        const div = document.querySelector('#game_board');
        if(document.querySelector('#game_board img')===null){
            for(let i=0; i<allumette_restante; i++){
                let img = document.createElement("img");
                img.src = '/allumette.png';
                img.height=150;
                img.style.transform="rotate("+Math.floor(Math.random() * (15 - (-15) + 1) + (-15))+"deg)"; 
                div.appendChild(img);
                img.addEventListener("click", click_allumette);
            }
        }
        document.querySelector('#name_player_get').innerHTML="C'est à "+nom_joueur+" de jouer !";
    }

    function click_allumette(){
        nb_allumette_prise=document.querySelectorAll('#game_board .check').length;
        
        if(this.getAttribute("class")=="check"){
            this.setAttribute("class","");
            this.style.background="none";
        }else{
            if(nb_allumette_prise<3 && nom_joueur===joueur1){
                this.setAttribute("class","check");
                this.style.background="#5f6166";
            }
        }	   
    }

    async function player_remove(){
        let check_allumette=document.querySelectorAll('#game_board .check');
        if(check_allumette.length==0){
            return null;
        }
        nb_allumette_prise=check_allumette.length;

        for(const element of check_allumette){
            element.remove();
        }
        
        allumette_restante=allumette_restante-nb_allumette_prise; 
        log();

        nom_joueur=joueur2;
        document.querySelector('#bt_remove').style.visibility="hidden";
        await verif_win() ? null : setTimeout(async function(){ await ia_remove() },2000);		
    }

    async function ia_remove(){
        let allumette=Array.from(document.querySelectorAll('#game_board img'));

        let nb_allu=(allumette_restante%4)-1;
        if(nb_allu==0){
            nb_allu=Math.floor(Math.random()*3)+1;
        }
        else if (nb_allu<0){
            nb_allu=3;
        }
         
        let ia_allumette=allumette.slice(0,nb_allu);
        nb_allumette_prise=ia_allumette.length;

        for(const element of ia_allumette){
            element.remove();
        }

        allumette_restante=allumette_restante-nb_allumette_prise;
        log();
        
        nom_joueur=joueur1;
        document.querySelector('#bt_remove').style.visibility="visible";
        await verif_win();
    }

    async function verif_win(){
        if(allumette_restante<=0){
            document.querySelector('#name_player_get').innerHTML=nom_joueur+" a gagné !";
            
            if(nom_joueur === userConnected.pseudo) await addWin(true);
            else await addWin(false);

            document.querySelector('#goal').style.visibility="hidden";
            document.querySelector('#bt_remove').style.visibility="hidden";
            document.querySelector('#playButton').style.visibility="visible";
            return 1;
        }else{    
            document.querySelector('#name_player_get').innerHTML="C'est à "+nom_joueur+" de jouer !";
        }
    }

    function log(){
        const divLog = document.querySelector('#logMes');
        let mess = document.createElement("message");
        mess.innerHTML = nom_joueur+' a enlevé '+nb_allumette_prise+' allumette(s)';    
        mess.style.display = "block";
        mess.style.marginTop = "10px";
        divLog.appendChild(mess);
    }


    async function addWin(isPlayer1Winning){
        if(userConnected) {
            const resp = await userConnected.addAllumettesStats(isPlayer1Winning)
            if(resp.success === true) console.log('Stats ajoutées');
            else console.log(resp.error);
        }

    }

}, []);

  return (

    <div id="container" className={styles.container}>
        <Header/>
        <main id="content" className={styles.content}>
            <div id="main" className={styles.main}>
                <div id="name_player_get" className={styles.name_player_get}></div>
                <div id="board" className={styles.board}>
                    <div id="game_board" className={styles.game_board}></div>
                    <div id="game_validation" className={styles.game_validation}>
                        <input type="button" id="bt_remove" className={styles.bt_remove} value="Valider"/>
                        <p id="goal" className={styles.goal}> Objectif : ne pas avoir la dernière allumette</p>
                    </div>
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