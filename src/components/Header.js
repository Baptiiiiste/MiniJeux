import styles from "@/styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
		<label className={styles.navButton}>
			<FontAwesomeIcon className={styles.navIcon} icon={faBars}/>
		</label>
		<nav className={styles.links}>
			<Link href="/allumettes">Allumettes </Link>
			<Link href="/blackjack">Blackjack</Link>
			<Link href="/tictactoe">Tic Tac Toe</Link>
			<Link href="/classement">Classement</Link>
		</nav>

		<div className={styles.account}>
			
			<div className={styles.globalAcc}>
				
				<div className={styles.accountButton}>
					<span>MON COMPTE</span>
					<FontAwesomeIcon className={styles.accountIcon} icon={faCircleUser} />
				</div>

				
				<div className={styles.dropdown}>
					<Link href="/connexion">SE CONNECTER</Link>
					<Link href="/inscription">S&apos;INSCRIRE</Link>
				</div>

			</div>

		</div>
    </header>
  );
}
