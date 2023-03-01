import getUser from '@/utils/functions/getUser';

export default class AllumettesGame{

    constructor(){
        this.userConnected = getUser();
        this.allumette_restante=20;
        this.joueur1 = this.userConnected ? this.userConnected.pseudo : "Joueur1"; //on recuperera le nom du premier joueur
        this.joueur2="Ordinateur";
        this.nb_allumette_prise=0;
        this.nom_joueur=""; //nom du joueur en cours
    }

    play(){
        this.nom_joueur=this.joueur1;
        const div = document.querySelector('#game_board');
        if(document.querySelector('#game_board img')===null){
            for(let i=0; i<this.allumette_restante; i++){
                let img = document.createElement("img");
                img.src = '/allumette.png';
                img.height=150;
                img.style.transform="rotate("+Math.floor(Math.random() * (15 - (-15) + 1) + (-15))+"deg)"; 
                div.appendChild(img);
                img.addEventListener("click", this.click_allumette());
            }
        }
        document.querySelector('#name_player_get').innerHTML="C'est à "+nom_joueur+" de jouer !";
    }

    click_allumette(){
        this.nb_allumette_prise=document.querySelectorAll('#game_board .check').length;
        
        if(this.getAttribute("class")=="check"){
            this.setAttribute("class","");
            this.style.background="#232427";
        }else{
            if(this.nb_allumette_prise<3 && this.nom_joueur===this.joueur1){
                this.setAttribute("class","check");
                this.style.background="#fff";
            }
        }	   
    }

    player_remove(){
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

    ia_remove(){
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
        verif_win();
    }

    verif_win(){
        if(allumette_restante<=0){
            document.querySelector('#name_player_get').innerHTML=nom_joueur+" a gagné !";
            document.querySelector('#goal').style.visibility="hidden";
            document.querySelector('#bt_remove').style.visibility="hidden";
            document.querySelector('#playButton').style.visibility="visible";
            return 1;
        }else{    
            document.querySelector('#name_player_get').innerHTML="C'est à "+nom_joueur+" de jouer !";
        }
    }

    log(){
        const divLog = document.querySelector('#logMes');
        let mess = document.createElement("message");
        mess.innerHTML = nom_joueur+' a enlevé '+nb_allumette_prise+' allumette(s)';    
        mess.style.display = "block";
        mess.style.marginTop = "10px";
        divLog.appendChild(mess);
    }
}