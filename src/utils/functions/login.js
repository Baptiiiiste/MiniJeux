import { API_LOGIN } from "@/assets/variables";
import useFetch from "../hooks/useFetch";


export default async function login(pseudo, password) {

    if(!password || !pseudo) return ({success: false, error: "Veuillez remplir tous les champs"});

    if(password.includes(" ")){
        return ({success: false, error:"Le mot de passe ne peut pas contenir d'espace"});
    }

    if(!/^[a-zA-Z0-9_.-]*$/.test(pseudo) || pseudo.includes(" ") || pseudo.length > 15 ){
        return ({success: false, error:"Le format du pseudo est incorrect, n'utilisez que des lettres et des chiffres, l'underscore: _, le point et le tiret et une taille inférieure ou égale à 15 caractères"});
    }

    let response = await useFetch.post(API_LOGIN, {pseudo, password})

    if(response.success === false) return ({success: false, error: response.error});
    else {
        response.data.password = undefined;
        localStorage.setItem("user", JSON.stringify(response.data));
        return ({success: true, data: response.data});
    }

}