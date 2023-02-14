import Link from "next/link";
import styles from "@/styles/FormulaireInscription.module.css"
import { useState } from "react";
import signin from "@/functions/signin"
import { useRouter } from 'next/navigation';

export default function FormulaireInscription() {

    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const signinButton = async (ev) => {
        let respError = await signin(pseudo, email, password, ev); 

        if(!respError.success){
            let errorDiv = document.getElementById("errorDiv");
            if(errorDiv){
                errorDiv.style.marginTop = "22px";
                errorDiv.style.marginBottom = "-37px";
                errorDiv.innerHTML = respError.error;
            }else{
                console.log("errorDiv not found")
            }
        }else{
            let errorDiv = document.getElementById("errorDiv");
            if(errorDiv){
                errorDiv.style.marginTop = "22px";
                errorDiv.style.marginBottom = "-37px";
                errorDiv.innerHTML = "Inscription réussie";
                router.push('/')
            }else{
                console.log("errorDiv not found")
            }
        }

        console.log(respError)
    }

    return (
        <main className={styles.Mainform}>
            <h1>INSCRIPTION</h1>
            <div className={styles.form}>

                <div className={styles.inputs}>
                    <input className={styles.editInput} type="text" name="login" placeholder="IDENTIFIANT" value={pseudo} onChange={(ev) => {setPseudo(ev.target.value)}}/>
                    <input className={styles.editInput} type="email" name="email" placeholder="E-MAIL" value={email} onChange={(ev) => {setEmail(ev.target.value)}}/>
                    <input className={styles.editInput} type="password" name="passwd" placeholder="MOT DE PASSE" value={password} onChange={(ev) => {setPassword(ev.target.value)}}/>
                </div>

                <button className={styles.button} onClick={(ev) => signinButton(ev)} >S&apos;INSCRIRE </button>
            </div>

            <div id="errorDiv"></div>

            <div className={styles.signinParent}>
                Déja inscrit ?
                <Link className={styles.signin} href="/connexion">Se connecter</Link>
            </div>

        </main>

    )
}