import dbConnect from '@/utils/functions/dbConnect';
const { BlackjackStats } = require('@/models/blackjackModel');

export default async function handler(req, resp) {
	
	// Methode GET
	const { method } = req
	if(method !== 'GET') resp.status(400).send({ success: false, error: "Erreur lors de l'envoie de la requête, changez de méthode" })

	// Connexion à la DB
	await dbConnect().catch(err => resp.status(500).send({ success: false, error: "Erreur de connexion avec la base de données" }))

	// Compte inexistant
	const usersStats = await BlackjackStats.find({}, ['user', 'totalWins'], { 
        skip: 0,
        limit: 10,
        sort: { totalWins: -1 },
     });
	if(!usersStats) return resp.status(405).send({ success: false, error: "Erreur lors de la récupération des données" })
		
	resp.status(201).send({ success: true, data: usersStats })

}
