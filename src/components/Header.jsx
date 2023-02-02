import styles from '@/styles/Header.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
        <nav className={styles.links}>
            <Link href="/allumettes">Allumettes </Link>
            <Link href="/blackjack">Blackjack</Link>
            <Link href="/tictactoe">Tic Tac Toe</Link>
            <Link href="/classement">Classement</Link>
        </nav>


        <div className={styles.account}>
			<span>MON COMPTE</span>
          	<FontAwesomeIcon className={styles.accountIcon} icon={faCircleUser}/> 
        </div>

    </header>
  )
}
