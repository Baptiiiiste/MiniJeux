import dbConnect from '@/database/dbConnect'
const { User } = require('@/database/models/userModel');

export default async function handler(req, resp) {
	
	// Methode POST
	const { method } = req
	if(method !== 'POST') resp.status(400).send({ success: false, error: "Erreur lors de l'envoie de la requête, changez de méthode" })

	// Connexion à la DB
	await dbConnect().catch(err => resp.status(500).send({ success: false, error: "Erreur de connexion avec la base de données" }))

	// Compte inexistant
	const userInfo = JSON.parse(req.body)
	const isPseudoAlreadyTaken = await User.findOne({ pseudo: userInfo.pseudo })
	const isEmailAlreadyTaken = await User.findOne({ email: userInfo.email })

	if(isPseudoAlreadyTaken) return resp.status(405).send({ success: false, error: "Ce pseudo appartient déjà à un utilisateur" })
	if(isEmailAlreadyTaken) return resp.status(405).send({ success: false, error: "Cette adresse email appartient déjà à un utilisateur" })

	/* A voir si on veut ajouter des tokens ici */

	// Création du compte
	
	const user = await User.create({pseudo: userInfo.pseudo, email: userInfo.email, password: userInfo.password})
	resp.status(201).send({ success: true, data: user })

}