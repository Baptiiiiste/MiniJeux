// create an array with 6 0
//fill the array with 6 0

const ONE_DICE_PROBS = new Array(6).fill(0)
const TWO_DICE_PROBS = new Array(11).fill(0)
const THREE_DICE_PROBS = new Array(17).fill(0)

const DICE = [1, 2, 3, 4, 5, 6]

for (let i = 1; i <= DICE.length; i++) {
    ONE_DICE_PROBS[i-1] += (1 / DICE.length);
}

for (let i = 1; i <= DICE.length; i++) {
    for (let j = 1; j <= DICE.length; j++) {
        TWO_DICE_PROBS[i+j-2] += (1 / 36);
    }
}

for (let i = 1; i <= DICE.length; i++) {
    for (let j = 1; j <= DICE.length; j++) {
        for (let k = 1; k <= DICE.length; k++) {
            THREE_DICE_PROBS[i+j+k-3] += (1 / 216);
        }
    }
}

function rollDice(n){
    dice = []
    for (let i = 0; i < n; i++) {
        dice.push(Math.floor(Math.random() * 6) + 1);
    }
    return dice.reduce((a, b) => a + b, 0);
}


function getLowerOver21WithOneDice(score){
    let inf = 0;
    let supp = 0;
    for (let i = 0; i < ONE_DICE_PROBS.length; i++) {
        if ((score + (i+1)) <= 21) {
            inf += ONE_DICE_PROBS[i];
        } else {
            supp += ONE_DICE_PROBS[i];
        }
    }
    return { inf, supp };
}

function getLowerOver21WithTwoDices(score){
    let inf = 0;
    let supp = 0;
    for (let i = 0; i < TWO_DICE_PROBS.length; i++) {
        if ((score + (i+2)) <= 21) {
            inf += TWO_DICE_PROBS[i];
        } else {
            supp += TWO_DICE_PROBS[i];
        }
    }
    return { inf, supp };
}

function getLowerOver21WithThreeDices(score){
    let inf = 0;
    let supp = 0;
    for (let i = 0; i < THREE_DICE_PROBS.length; i++) {
        if ((score + (i+3)) <= 21) {
            inf += THREE_DICE_PROBS[i];
        } else {
            supp += THREE_DICE_PROBS[i];
        }
    }
    return { inf, supp };
}

function ordiTurn(score){
    let { inf3, supp3 } = getLowerOver21WithThreeDices(score);
    if(!supp3 > inf3) return 3;

    let { inf2, supp2 } = getLowerOver21WithTwoDices(score);
    if(!supp2 > inf2) return 2;

    let { inf1, supp1 } = getLowerOver21WithOneDice(score);
    if(!supp1 > inf1) return 1;

    return 0;

}

function playerDefeat(jetons_p1, jetons_ordi, cagnotte){
    console.log("PLAYER DEFEAT");
    jetons_p1 -= 1;
    jetons_ordi += 1 + cagnotte;
    cagnotte = 0;
    return { jetons_p1, jetons_ordi, cagnotte };
}

function ordiDefeat(jetons_p1, jetons_ordi, cagnotte){
    console.log("ORDI DEFEAT");
    jetons_ordi -= 1;
    jetons_p1 += 1 + cagnotte;
    cagnotte = 0;
    return { jetons_p1, jetons_ordi, cagnotte };
}

function over21(jeton, cagnotte, depassementBool){
    jeton -= 1;
    cagnotte += 1;
    depassementBool = true;
    return { jeton, cagnotte, depassementBool };
}

function play(){
    let jetons_p1 = 6;
    let jetons_ordi = 6;
    let cagnotte = 0;

    let depassement_p1 = false;
    let depassement_ordi = false;

    let score_p1 = rollDice(3);
    let score_ordi = rollDice(3);
    
    console.log("Score joueur : " + score_p1);
    console.log("Score ordi : " + score_ordi);

    while(jetons_p1 > 0 && jetons_ordi > 0){
        let rejouer = prompt("Rejouer ? (o/n)");
        if(rejouer == "o"){
            let nb_dices = prompt("Nombre de dés (1, 2 ou 3) ?");
            score_p1 += rollDice(parseInt(nb_dices));
        }
        console.log("Score joueur : " + score_p1);

        let nb_dices = ordiTurn(score_ordi);
        if(nb_dices == 0){
            console.log("ORDI PASSE SON TOUR");
        } else {
            score_ordi += rollDice(nb_dices);
        }
        console.log("Score ordi : " + score_ordi);

        if(score_p1 > 21){
            console.log("DEPASSEMENT JOUEUR");
            let { jetons_p1, cagnotte, depassement_p1 } = over21(jetons_p1, cagnotte, depassement_p1);
        } 
        if(score_ordi > 21){
            console.log("DEPASSEMENT ORDI");
            let { jetons_ordi, cagnotte, depassement_ordi } = over21(jetons_ordi, cagnotte, depassement_ordi);
        }

        if(depassement_p1 && !depassement_ordi) {
            let { jetons_p1, jetons_ordi, cagnotte } = playerDefeat(jetons_p1, jetons_ordi, cagnotte);
        }else if(!depassement_p1 && depassement_ordi) {
            let { jetons_p1, jetons_ordi, cagnotte } = ordiDefeat(jetons_p1, jetons_ordi, cagnotte);
        }else if(score_p1 > score_ordi){
            let { jetons_p1, jetons_ordi, cagnotte } = playerDefeat(jetons_p1, jetons_ordi, cagnotte);  
        }else if(score_p1 < score_ordi){
            let { jetons_p1, jetons_ordi, cagnotte } = ordiDefeat(jetons_p1, jetons_ordi, cagnotte);
        }else{
            console.log("EGALITE");
        }

        console.log("Jetons joueur : " + jetons_p1);
        console.log("Jetons ordi : " + jetons_ordi);
        console.log("Cagnotte : " + cagnotte);
        console.log("--------------------")

        depassement_ordi = false;
        depassement_p1 = false;

        score_p1 = rollDice(3);
        score_ordi = rollDice(3);
        console.log("Score joueur : " + score_p1);
        console.log("Score ordi : " + score_ordi);

        if(jetons_p1 == 0){
            console.log("ORDI GAGNE");
        }else if(jetons_ordi == 0){
            console.log("JOUEUR GAGNE");
        }

    }
}

play();