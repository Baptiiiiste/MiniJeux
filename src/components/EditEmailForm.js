import styles from "@/styles/Forms.module.css"
import { useRouter } from 'next/navigation';
import { useState } from "react";
import getUser from "@/utils/functions/getUser";


export default function EditEmailForm() {

    const [newEmail, setNewEmail] = useState('');
    const router = useRouter();

    const user = getUser();

    const editEmail = async (ev) => {
        ev.preventDefault();
        
        const user = getUser();

        let respSignIn = await user.editEmail(newEmail); 

        let errorDivPassword = document.getElementById("errorDiv");

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
                errorDivPassword.innerHTML = "Email modifiée";
            } else console.warn("errorDivPassword not found")
        }
        

    }

    return (
        <main className={styles.MainformEmailPassword}>
            <h2 className={styles.titlePassword}>Modifier mon email</h2>
            <div className={styles.form}>

                <div className={styles.inputs}>
                    <input className={styles.editInput} type="email" name="email" placeholder="EMAIL" value={newEmail} onChange={(ev) => {setNewEmail(ev.target.value)}}/>
                </div>

                <button className={styles.button} onClick={(ev) => editEmail(ev)} >VALIDER</button>
            </div>

            <div id="errorDiv"></div>

        </main>

    )
}