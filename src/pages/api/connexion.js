import dbConnect from '@/database/dbConnect';
import bcrypt from "bcryptjs";
const { User } = require('@/database/models/userModel');

export default async function handler(req, resp) {
	
	// Methode POST
	const { method } = req
	if(method !== 'POST') resp.status(400).send({ success: false, error: "Erreur lors de l'envoie de la requête, changez de méthode" })

	const userInfo = JSON.parse(req.body)
    if(!userInfo.password || !userInfo.pseudo) return ({success: false, error: "Veuillez remplir tous les champs"});


	// Connexion à la DB
	await dbConnect().catch(err => resp.status(500).send({ success: false, error: "Erreur de connexion avec la base de données" }))

	// Compte inexistant
	const user = await User.findOne({pseudo: userInfo.pseudo});

	if(!user) return resp.status(405).send({ success: false, error: "Ce pseudo n'existe pas" })
    if(!bcrypt.compareSync(userInfo.password, user.password))  return resp.status(405).send({ success: false, error: "Le mot de passe est incorrect" })
	
    /* A voir si on veut ajouter des tokens ici */

	// Connexion du joueur

    let userObject = user.toObject();
    userObject.password = undefined;
	
	resp.status(201).send({ success: true, data: user })

}
