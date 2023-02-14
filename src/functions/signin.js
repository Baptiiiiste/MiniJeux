import bcrypt from "bcryptjs"

export default async function signin(pseudo, email, password, event) {

    event.preventDefault();

    if(!email || !password || !pseudo) return ({success: false, error: "Veuillez remplir tous les champs"});

    if(!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)){
        return ({success: false, error: "Format d'adresse e-mail invalide"});
    }

    if(password.includes(" ")){
        return ({success: false, error:"Mot de passe incorrecte, ne pas utiliser d'espace"});
    }

    if(!/^[a-zA-Z0-9_.-]*$/.test(pseudo) || pseudo.includes(" ") || pseudo.length > 15 ){
        return ({success: false, error:"Pseudo incorrect, n'utiliser que des lettres et des chiffres, l'underscore: _, le point et le tiret et une taille inférieure ou égale à 15 caractères"});
    }

    password = bcrypt.hashSync(password, bcrypt.genSaltSync(process.env.SALT));

    let response = await fetch("http://localhost:3000/api/inscription", {
        method: "POST",
        body: JSON.stringify({pseudo, email, password})
    })
    response = await response.json();

    if(response.success === false) return ({success: false, error: response.error});
    else {
        response.data.password = undefined;
        localStorage.setItem("user", JSON.stringify(response.data));
        return ({success: true, data: response.data});
    }

}