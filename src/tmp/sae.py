import random
 
# Les probabilités de chaque somme :
# Pour un dé
ONE_DICE_PROBS = [1/6] * 6
 
# Pour deux dés
TWO_DICES_PROBS = [0] * 11
for i in range(1, 7):
    for j in range(1, 7):
        TWO_DICES_PROBS[i+j-2] += 1/36


 
# Pour trois dés
THREE_DICES_PROBS = [0] * 17
for i in range(1, 7):
    for j in range(1, 7):
        for k in range(1, 7):
            THREE_DICES_PROBS[i+j+k-3] += 1/216


 
# Fonction pour lancer n dé
def rollDice(n):
    dice = [random.randint(1, 6) for i in range(n)]
    return sum(dice)



# Fonction pour faire le premier jet de dés
def firstThrow():
    return rollDice(3), rollDice(3)
 
# Fonction pour savoir les probabilités de dépasser 21 ou non avec un dé
def getLowerOver21WithOneDice(score):
    inf, supp = 0, 0
    for i in range(len(ONE_DICE_PROBS)):
        if (score + (i+1)) <= 21:
            inf += ONE_DICE_PROBS[i]
        else:
            supp += ONE_DICE_PROBS[i]
    return inf, supp


# Fonction pour savoir les probabilités de dépasser 21 ou non avec deux dés
def getLowerOver21WithTwoDices(score):
    inf, supp = 0, 0
    for i in range(len(TWO_DICES_PROBS)):
        if (score + (i+2)) <= 21:
            inf += TWO_DICES_PROBS[i]
        else:
            supp += TWO_DICES_PROBS[i]
    return inf, supp
 
# Fonction pour savoir les probabilités de dépasser 21 ou non avec trois dés
def getLowerOver21WithThreeDices(score):
    inf, supp = 0, 0
    for i in range(len(THREE_DICES_PROBS)):
        if (score + (i+3)) <= 21:
            inf += THREE_DICES_PROBS[i]
        else:
            supp += THREE_DICES_PROBS[i]
    return inf, supp
 
# Fonction qui retourne le nombre de dés à lancer selon les probabilités de faire plus ou moins de 21
def ordiTurn(score):
    inf, supp = getLowerOver21WithThreeDices(score)
    if supp > inf:
        inf, supp = getLowerOver21WithTwoDices(score)
        if supp > inf:
            inf, supp = getLowerOver21WithOneDice(score)
            if supp > inf:
                return 0
            else:
                return 1
        else:
            return 2
    else:
        return 3
 
# Fonction défaite du joueur
def playerDefeat(jetons_p1, jetons_ordi, cagnotte):
    print("Vous avez perdu, l'ordinateur gagne 1 jeton et récupère la cagnotte !")
 
    jetons_p1 -= 1
    jetons_ordi += 1 + cagnotte
    cagnotte = 0
 
    return jetons_p1, jetons_ordi, cagnotte
 
# Fonction défaite de l'ordi
def ordiDefeat(jetons_p1, jetons_ordi, cagnotte):
    print("Vous avez gagnez, vous gagnez 1 jeton et récupérez la cagnotte !")
 
    jetons_ordi -= 1
    jetons_p1 += 1 + cagnotte
    cagnotte = 0
 
    return jetons_p1, jetons_ordi, cagnotte
 
# Fonction lorsque qu'un joueur dépasse 21
def over21(jeton, cagnotte, depassementBool):
    jeton -= 1
    cagnotte += 1
    depassementBool = True
 
    return jeton, cagnotte, depassementBool
 
# Fonction pour jouer
def play():
    jetons_p1, jetons_ordi = 6, 6
    cagnotte = 0
 
    depassement_p1, depassement_ordi = False, False
 
    # Première phase : tout le monde jète 3 dés
    score_p1, score_ordi = firstThrow()
 
    print("Score joueur 1 : ", score_p1)
    print("Score ordinateur : ", score_ordi)
 
    # Déroulement de la partie
    while jetons_p1 > 0 and jetons_ordi > 0:
        # Deuxième phase : chacun choisi de rejouer ou non
        rejouer = input("Voulez-vous rejouer ? (o/n) ")
        if rejouer == "o":
            nb_dices = int(input("Combien de dés voulez-vous jeter ? (1, 2 ou 3) "))
            if nb_dices == 3:
                score_p1 += rollDice(3)
            elif nb_dices == 2:
                score_p1 += rollDice(2)
            else:
                score_p1 += rollDice(1)
 
            print("Score joueur 1 : ", score_p1)
 
        nb_dices = ordiTurn(score_ordi)
        if nb_dices == 0:
            print("L'ordinateur ne rejoue pas")
        elif nb_dices == 1:
            score_ordi += rollDice(1)
        elif nb_dices == 2:
            score_ordi += rollDice(2)
        else:
            score_ordi += rollDice(3)                
        print("Score ordinateur : ", score_ordi)
 
        if(score_p1 > 21):
            print("Vous dépassez 21, vous devez déposer 1 jeton dans la cagnotte")
            jetons_p1, cagnotte, depassement_p1 = over21(jetons_p1, cagnotte, depassement_p1)
 
        if(score_ordi > 21):
            print("L'ordinateur dépasse 21, il doit déposer 1 jeton dans la cagnotte")
            jetons_ordi, cagnotte, depassement_ordi = over21(jetons_ordi, cagnotte, depassement_ordi)
 
        # Troisième phase : on compare les scores
        if depassement_p1 and not depassement_ordi:
            jetons_p1, jetons_ordi, cagnotte = playerDefeat(jetons_p1, jetons_ordi, cagnotte)
        elif not depassement_p1 and depassement_ordi:
            jetons_p1, jetons_ordi, cagnotte = ordiDefeat(jetons_p1, jetons_ordi, cagnotte)
        elif score_p1 > score_ordi:
            jetons_p1, jetons_ordi, cagnotte = ordiDefeat(jetons_p1, jetons_ordi, cagnotte)
        elif score_ordi > score_p1:
            jetons_p1, jetons_ordi, cagnotte = playerDefeat(jetons_p1, jetons_ordi, cagnotte)
        else:
            print("Egalité les jetons de la cagnotte reste en jeu !")
 
        print("Jetons joueur 1 : ", jetons_p1)
        print("Jetons ordinateur : ", jetons_ordi)
        print("Cagnotte : ", cagnotte)
        print("\n----------------------\n")
 
        depassement_p1, depassement_ordi = False, False
 
        # On relance la première phase
        score_p1, score_ordi = firstThrow()
        print("Score joueur 1 : ", score_p1)
        print("Score ordinateur : ", score_ordi)
 
    if jetons_p1 == 0:
        print("L'ordinateur a gagné !")
    else:
        print("Vous avez gagné !")
 
 
 
play()