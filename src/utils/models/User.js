import { API_GET_MATCHES_STATS, API_SET_MATCHES_STATS, API_GET_BLACKJACK_STATS, API_SET_BLACKJACK_STATS, API_DELETE_ACCOUNT, API_EDIT_PASSWORD, API_EDIT_EMAIL } from "@/assets/variables";
import useFetch from "../hooks/useFetch";
import bcrypt from "bcryptjs";

export default class User {
    id;
    pseudo;
    email;

    constructor(id, pseudo, email) {
        this.id = id;
        this.pseudo = pseudo;
        this.email = email;
    }

    logout(){
        localStorage.removeItem('user');
    }

    async addAllumettesStats(userWon) {

        let resp = await useFetch.put(`${API_SET_MATCHES_STATS}`, {totalGames: 1, user: this.pseudo, totalWins: userWon ? 1 : 0});
        return resp;

    }

    async addBlackJackStats(userWon, diceThrown, blackjack, score, bust) {
        let resp = await useFetch.put(`${API_SET_BLACKJACK_STATS}`, {totalGames: 1, user: this.pseudo, totalWins: userWon ? 1 : 0, totalDiceThrownByUser: diceThrown, total21ByUser: blackjack, totalScore: score, totalBustByUser: bust});
        return resp;
    }

    async getAllumettesStats() {
        let resp = await useFetch.get(`${API_GET_MATCHES_STATS}/${this.pseudo}`);
        if(resp.success === false) return resp;

        const map = new Map();
        for(let elm in resp.data){
            if(elm === '_id') continue;
            map.set(elm, resp.data[elm])
        }
        return map;
    }

    async getBlackJackStats() {
        let resp = await useFetch.get(`${API_GET_BLACKJACK_STATS}/${this.pseudo}`);
        if(resp.success === false) return resp;

        const map = new Map();
        for(let elm in resp.data){
            if(elm === '_id') continue;
            map.set(elm, resp.data[elm])
        }
        return map;
    }

    async deleteAccount(){
        let resp = await useFetch.delete(`${API_DELETE_ACCOUNT}/${this.pseudo}`);
        return resp;
    }

    async editEmail(newEmail) {
        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(newEmail)){
            return ({success: false, error: "Format d'adresse e-mail invalide"});
        }
        let resp = await useFetch.put(`${API_EDIT_EMAIL}`, {user: this.pseudo, newEmail: newEmail.toLowerCase()});
        return resp;
    }


    async editPassword(oldPassword, newPassword) {
        if(newPassword.includes(" ")){
            return ({success: false, error:"Mot de passe incorrecte, ne pas utiliser d'espace"});
        }
        const newHashedPassword = await bcrypt.hashSync(newPassword, bcrypt.genSaltSync(parseInt(process.env.SALT)));

        let resp = await useFetch.put(`${API_EDIT_PASSWORD}`, {user: this.pseudo, oldPassword: oldPassword, newPassword: newHashedPassword});
        return resp;
    }

}