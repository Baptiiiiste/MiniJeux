import styles from "@/styles/Forms.module.css"
import { useRouter } from 'next/navigation';
import { useState } from "react";
import getUser from "@/utils/functions/getUser";



export default function EditPasswordForm() {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const router = useRouter();

    const editPassword = async (ev) => {
        ev.preventDefault();
        
        const user = getUser();

        let respSignIn = await user.editPassword(oldPassword, newPassword); 

        let errorDivPassword = document.getElementById("errorDivPassword");

        if(!respSignIn.success){
            if(errorDivPassword){
                errorDivPassword.style.marginTop = "50px";
                errorDivPassword.style.marginBottom = "-75px";
                errorDivPassword.innerHTML = respSignIn.error;
            } else console.warn("errorDivPassword not found")
        }else{
            if(errorDivPassword){
                errorDivPassword.style.marginTop = "50px";
                errorDivPassword.style.marginBottom = "-75px";
                errorDivPassword.innerHTML = "Mot de passe modifié";
            } else console.warn("errorDivPassword not found")
        }
        

    }

    return (
        <main className={styles.MainformEmailPassword}>
            <h2 className={styles.titlePassword}>Modifier mon mot de passe</h2>
            <div className={styles.form}>

                <div className={styles.inputs}>
                    <input className={styles.editInput} type="password" name="oldPassword" placeholder="ANCIEN MOT DE PASSE" value={oldPassword} onChange={(ev) => {setOldPassword(ev.target.value)}}/>
                    <input className={styles.editInput} type="password" name="newPassword" placeholder="NOUVEAU MOT DE PASSE" value={newPassword} onChange={(ev) => {setNewPassword(ev.target.value)}}/>
                </div>

                <button className={styles.button} onClick={(ev) => editPassword(ev)} >VALIDER</button>
            </div>

            <div id="errorDivPassword"></div>

        </main>

    )
}