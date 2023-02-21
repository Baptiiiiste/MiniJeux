import Header from '@/components/Header'
import React, { useEffect } from 'react'
import styles from '@/styles/Allumettes.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {

    useEffect(() => {

    document.querySelector('#bt_remove').addEventListener("click", player_remove);
    document.querySelector('#playButton').addEventListener("click", function(){
        location.reload();
    });

    let allumette_restante=20;
    let joueur1="Joueur1"; //on recuperera le nom du premier joueur
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
            this.style.background="#232427";
        }else{
            if(nb_allumette_prise<3 && nom_joueur===joueur1){
                this.setAttribute("class","check");
                this.style.background="#fff";
            }
        }	   
    }

    function player_remove(){
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
        verif_win()?null:setTimeout(function(){ia_remove()},2000);		
    }

    function ia_remove(){
        let allumette=Array.from(document.querySelectorAll('#game_board img'));

        let nb_allu/*=Math.floor(Math.random()*3)+1;*/
        nb_allu=(allumette_restante%4)-1;
        if (nb_allu<1){
            nb_allu=3;
        }

        let ia_allumette=allumette.slice(0,nb_allu); //Pour l'instant prend un nombre aléatoire entre 1 et 3
        nb_allumette_prise=ia_allumette.length;

        for(const element of ia_allumette){
            element.remove();
        }

        allumette_restante=allumette_restante-nb_allumette_prise;
        log();
        
        nom_joueur=joueur1;
        document.querySelector('#bt_remove').style.visibility="visible";
        verif_win();
    }

    function verif_win(){
        if(allumette_restante<=0){
            document.querySelector('#name_player_get').innerHTML=nom_joueur+" a gagné !";
            document.querySelector('#main').style.visibility="hidden";
            document.querySelector('#bt_remove').style.visibility="hidden";
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

}, []);

  return (

    <div id="container" className={styles.container}>
        <Header/>
        <main id="content" className={styles.content}>
            <div id="name_player_get" className={styles.name_player_get}></div>
            <div id="main" className={styles.main}>
				<div id="game_board" className={styles.game_board}></div>
				<input type="button" id="bt_remove" className={styles.bt_remove} value="Valider"/>
                <p className={styles.goal}> Objectif : ne pas avoir la dernière allumette</p>
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