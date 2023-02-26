import dbConnect from '@/utils/functions/dbConnect';
const { BlackjackStats } = require('@/models/blackjackModel');

export default async function handler(req, resp) {
	
	// Methode GET
	const { method } = req
	if(method !== 'GET') resp.status(400).send({ success: false, error: "Erreur lors de l'envoie de la requête, changez de méthode" })

	const { userQuery } = req.query
    if(!userQuery) return ({success: false, error: "Veuillez renseigner un utilisateur"});

	// Connexion à la DB
	await dbConnect().catch(err => resp.status(500).send({ success: false, error: "Erreur de connexion avec la base de données" }))

	// Compte inexistant
	const userStats = await BlackjackStats.findOne({user: userQuery});

	if(!userStats) return resp.status(405).send({ success: false, error: "Ce pseudo n'existe pas" })
	
    userStats.__v = undefined;
    userStats.user = undefined;
	
	resp.status(201).send({ success: true, data: userStats })

}
