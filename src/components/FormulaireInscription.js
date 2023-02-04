import Link from "next/link";
import styles from "@/styles/FormulaireInscription.module.css"

export default function FormulaireInscription() {
    return (
        <main className={styles.Mainform}>
            <h1>INSCRIPTION</h1>
            <div className={styles.form}>
                <div className={styles.inputs}>
                    <input className={styles.editInput} type="text" name="login" placeholder="IDENTIFIANT" />
                    <input className={styles.editInput} type="email" name="email" placeholder="E-MAIL" />
                    <input className={styles.editInput} type="password" name="passwd" placeholder="MOT DE PASSE" />

                </div>

                <button className={styles.button}>S&apos;INSCRIRE </button>
            </div>
            <div className={styles.signinParent}>
                Déja inscrit ?
                <Link className={styles.signin} href="/connexion">Se connecter</Link>
            </div>

        </main>

    )
}