import styles from "@/styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {

	function showMenu() {
		setOpen(!isOpen)
	}

	const [isOpen, setOpen] = useState(false);

	useEffect(() => {
		let x = document.getElementsByClassName(styles.menuHidden)[0];
		x.style.display = isOpen ? "flex":"none"
	}, [isOpen])

  return (
    <header className={styles.header}>

		{}
		<FontAwesomeIcon className={styles.navIcon} icon={faBars} onClick={showMenu}/>
		<nav className={styles.links}>
			<Link href="/allumettes">Allumettes</Link>
			<Link href="/blackjack">Blackjack</Link>
			<Link href="/tictactoe">Tic Tac Toe</Link>
			<Link href="/classement">Classement</Link>
		</nav>

		<div className={styles.menuHidden}>
			<FontAwesomeIcon className={styles.navIconHidden} icon={faBars} onClick={showMenu}/>
			<nav className={styles.linksHidden}>
				<Link href="/allumettes">Allumettes</Link>
				<Link href="/blackjack">Blackjack</Link>
				<Link href="/tictactoe">Tic Tac Toe</Link>
				<Link href="/classement">Classement</Link>
			</nav>
		</div>

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
