import '@/styles/globals.css'
import UserContext from '@/context/userContext'

export default function App({ Component, pageProps }) {
	return (
		<>
			<UserContext>
				<Component {...pageProps} />
			</UserContext>
		</>
	)

}
