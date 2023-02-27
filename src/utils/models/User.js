import { API_GET_ALLUMETTES_STATS, API_SET_ALLUMETTES_STATS, API_GET_BLACKJACK_STATS, API_SET_BLACKJACK_STATS } from "@/assets/variables";
import useFetch from "../hooks/useFetch";

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

    async addAllumettesStats(userWon, matchesTakenByUser, matchesTakenByAI) {

        

    }

    async addBlackJackStats() {}

    async getAllumettesStats() {
        const resp = await useFetch.get(`${API_GET_ALLUMETTES_STATS}/${this.pseudo}`);
        if(resp.success === false) return resp;
        else return resp.data;
    }

    async getBlackJackStats() {}

    async deleteAccount(){}

    async editAccount() {}

}