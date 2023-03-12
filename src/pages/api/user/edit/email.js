const { User } = require("@/models/userModel");
import dbConnect from '@/utils/functions/dbConnect';

export default async function handler(req, resp) {
	
	// Methode PUT
	const { method } = req
	if(method !== 'PUT') resp.status(400).send({ success: false, error: "Erreur lors de l'envoie de la requête, changez de méthode" })

	const body = JSON.parse(req.body)
    if(!body.user) return ({success: false, error: "Veuillez renseigner un utilisateur"});

	// Connexion à la DB
	await dbConnect().catch(err => resp.status(500).send({ success: false, error: "Erreur de connexion avec la base de données" }))

	// Utilisateur inexistant
	const userExist = await User.findOne({pseudo: body.user});
	if(!userExist) return resp.status(405).send({ success: false, error: "Cet utilisateur n'existe pas" });

	// Email déjà existante ?
	const isEmailAlreadyTaken = await User.findOne({ email: body.newEmail });
	if(isEmailAlreadyTaken) return resp.status(405).send({ success: false, error: "Cette adresse e-mail est déjà utilisée" });

	const user = await User.updateOne({ pseudo: body.user }, { $set : { email: body.newEmail } });
	if(!user) return resp.status(500).send({ success: false, error: "Erreur lors de la modification de l'adresse e-mail" });
	
	resp.status(201).send({ success: true })

}
