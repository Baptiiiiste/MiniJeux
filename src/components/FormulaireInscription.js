import Link from "next/link";
import styles from "@/styles/Forms.module.css"
import signin from "@/utils/functions/signin"
import { useRouter } from 'next/navigation';
import { useState } from "react";


export default function FormulaireInscription() {

    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const signinButton = async (ev) => {
        ev.preventDefault();

        let respSignIn = await signin(pseudo, email, password); 

        if(respSignIn.success) return router.push('/');
        let errorDiv = document.getElementById("errorDiv");
        if(errorDiv){
            errorDiv.style.marginTop = "22px";
            errorDiv.style.marginBottom = "-37px";
            errorDiv.innerHTML = respSignIn.error;
        } else console.warn("errorDiv not found")

        
    }

    return (
        <main className={styles.Mainform}>
            <h1>INSCRIPTION</h1>
            <div className={styles.form}>

                <div className={styles.inputs}>
                    <input className={styles.editInput} type="text" name="PSEUDO" placeholder="PSEUDO" value={pseudo} onChange={(ev) => {setPseudo(ev.target.value)}}/>
                    <input className={styles.editInput} type="email" name="email" placeholder="E-MAIL" value={email} onChange={(ev) => {setEmail(ev.target.value)}}/>
                    <input className={styles.editInput} type="password" name="password" placeholder="MOT DE PASSE" value={password} onChange={(ev) => {setPassword(ev.target.value)}}/>
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