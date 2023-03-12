import dbConnect from '@/utils/functions/dbConnect';
const { BlackjackStats } = require('@/models/blackjackModel');
const { AllumettesStats } = require('@/models/allumettesModel');
const { User } = require('@/models/userModel');

export default async function handler(req, resp) {
	
	// Methode DELETE
	const { method } = req
	if(method !== 'DELETE') resp.status(400).send({ success: false, error: "Erreur lors de l'envoie de la requête, changez de méthode" })

	const { userQuery } = req.query
    if(!userQuery) return ({success: false, error: "Veuillez renseigner un utilisateur"});

	// Connexion à la DB
	await dbConnect().catch(err => resp.status(500).send({ success: false, error: "Erreur de connexion avec la base de données" }))

	// Utilisateur inexistant
	const userExist = await User.findOne({pseudo: userQuery});
	if(!userExist) return resp.status(405).send({ success: false, error: "Cet utilisateur n'existe pas" });

	// Suppression
    const blackjackStats = await BlackjackStats.deleteOne({ user: userQuery }).catch(err => resp.status(500).send({ success: false, error: "Erreur lors de la suppression des statistiques de blackjack" }));
    const allumettesStats = await AllumettesStats.deleteOne({ user: userQuery }).catch(err => resp.status(500).send({ success: false, error: "Erreur lors de la suppression des statistiques d'allumettes" }));
    const user = await User.deleteOne({ pseudo: userQuery }).catch(err => resp.status(500).send({ success: false, error: "Erreur lors de la suppression de l'utilisateur" }));
	
	resp.status(201).send({ success: true })

}
