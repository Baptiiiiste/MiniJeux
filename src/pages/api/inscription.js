import dbConnect from '@/utils/functions/dbConnect';
const { User } = require('@/models/userModel');
const { AllumettesStats } = require('@/models/allumettesModel');
const { BlackjackStats } = require('@/models/blackjackModel');

export default async function handler(req, resp) {
	
	// Methode POST
	const { method } = req
	if(method !== 'POST') resp.status(400).send({ success: false, error: "Erreur lors de l'envoie de la requête, changez de méthode" })

	const userInfo = JSON.parse(req.body)
    if(!userInfo.password || !userInfo.pseudo || !userInfo.email) return ({success: false, error: "Veuillez remplir tous les champs"});

	// Connexion à la DB
	console.log("AVANT CONNEXION")
	await dbConnect().catch(err => resp.status(500).send({ success: false, error: "Erreur de connexion avec la base de données" }))

	// Compte inexistant
	const isPseudoAlreadyTaken = await User.findOne({ pseudo: userInfo.pseudo })
	const isEmailAlreadyTaken = await User.findOne({ email: userInfo.email })

	if(isPseudoAlreadyTaken) return resp.status(405).send({ success: false, error: "Ce pseudo appartient déjà à un utilisateur" })
	if(isEmailAlreadyTaken) return resp.status(405).send({ success: false, error: "Cette adresse email appartient déjà à un utilisateur" })

	/* A voir si on veut ajouter des tokens ici */

	// Création du compte
	console.log("AVANT INSCRIPTION")
	const user = await User.create({pseudo: userInfo.pseudo, email: userInfo.email, password: userInfo.password})
	// await AllumettesStats.create({user: user._id})
	// await BlackjackStats.create({user: user._id})

	console.log("APRES INSCRIPTION")

	let userObject = user.toObject();
	userObject.password = undefined;
	resp.status(201).send({ success: true, data: userObject })

}
