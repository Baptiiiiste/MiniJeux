import Link from "next/link";
import styles from "@/styles/FormulaireInscription.module.css"
import login from "@/functions/login"
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function FormulaireConnexion() {

    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const loginButton = async (ev) => {
        ev.preventDefault();
        let respLogIn = await login(pseudo, password); 

        if(!respLogIn.success){
            let errorDiv = document.getElementById("errorDiv");
            if(errorDiv){
                errorDiv.style.marginTop = "22px";
                errorDiv.style.marginBottom = "-37px";
                errorDiv.innerHTML = respLogIn.error;
            } else console.warn("errorDiv not found")
        } else router.push('/')
        
    }

    return (
        <main className={styles.Mainform}>
            <h1>CONNEXION</h1>
            <div className={styles.form}>

                <div className={styles.inputs}>
                    <input className={styles.editInput} type="text" name="pseudo" placeholder="PSEUDO" value={pseudo} onChange={(ev) => {setPseudo(ev.target.value)}}/>
                    <input className={styles.editInput} type="password" name="password" placeholder="MOT DE PASSE" value={password} onChange={(ev) => {setPassword(ev.target.value)}}/>
                </div>

                <button className={styles.button} onClick={(ev) => loginButton(ev)} >SE CONNECTER </button>
            </div>

            <div id="errorDiv"></div>

            <div className={styles.signinParent}>
                Pas encore inscrit ?
                <Link className={styles.signin} href="/inscription">S&apos;inscrire</Link>
            </div>

        </main>

    )
}