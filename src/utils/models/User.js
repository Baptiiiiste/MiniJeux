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

    async addAllumettesStats(userWon) {

        let resp = await useFetch.put(`${API_SET_ALLUMETTES_STATS}`, {totalGames: 1, user: this.pseudo, totalWins: userWon ? 1 : 0});
        return resp;

    }

    async addBlackJackStats(userWon, diceThrown, blackjack, score, bust) {
        let resp = await useFetch.put(`${API_SET_ALLUMETTES_STATS}`, {totalGames: 1, user: this.pseudo, totalWins: userWon ? 1 : 0, totalDiceThrownByUser: diceThrown, total21ByUser: blackjack, totalScore: score, totalBustByUser: bust});
        return resp;
    }

    async getAllumettesStats() {
        let resp = await useFetch.get(`${API_GET_ALLUMETTES_STATS}/${this.pseudo}`);
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

    async deleteAccount(){}

    async editAccount() {}

}