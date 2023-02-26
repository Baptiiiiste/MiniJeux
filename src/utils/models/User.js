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

    async getAllumettesStats() {}

    async getBlackJackStats() {}

    async deleteAccount(){}

    async editAccount() {}

}