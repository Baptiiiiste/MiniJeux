import Link from "next/link";
import styles from "@/styles/FormulaireInscription.module.css"

export default function FormulaireConnexion() {
    return (
        <main className={styles.Mainform}>
            <h1>CONNEXION</h1>
            <div className={styles.form}>
                <div className={styles.inputs}>
                    <input className={styles.editInput} type="text" name="login" placeholder="IDENTIFIANT" />
                    <input className={styles.editInput} type="password" name="passwd" placeholder="MOT DE PASSE" />

                </div>

                <button className={styles.button}>SE CONNECTER </button>
            </div>
            <div className={styles.signinParent}>
                Pas encore inscrit ?
                <Link className={styles.signin} href="/inscription">S&apos;inscrire</Link>
            </div>

        </main>

    )
}