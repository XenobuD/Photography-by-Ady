from abc import ABC, abstractmethod

# 🔹 Classe abstraite Personne
class Personne(ABC):
    def __init__(self, nom, prenom, adresse):
        self._nom = nom
        self._prenom = prenom
        self._adresse = adresse

    @abstractmethod
    def __str__(self):
        pass

# 🔹 Classe Employe
class Employe(Personne):
    def __init__(self, nom, prenom, adresse, fonction):
        super().__init__(nom, prenom, adresse)
        self._fonction = fonction

    def __str__(self):
        return (
            f"[Employé]\nNom : {self._nom}\nPrénom : {self._prenom}\nAdresse : {self._adresse}\nFonction : {self._fonction}"
        )

# 🔹 Classe Etudiant
class Etudiant(Personne):
    def __init__(self, nom, prenom, adresse, matricule):
        super().__init__(nom, prenom, adresse)
        self._matricule = matricule
        self._cours = []

    def ajouter_cours(self, cours):
        self._cours.append(cours)

    def __str__(self):
        cours_str = ", ".join(self._cours) if self._cours else "Aucun cours"
        return (
            f"[Étudiant]\nNom : {self._nom}\nPrénom : {self._prenom}\nAdresse : {self._adresse}\nMatricule : {self._matricule}\nCours : {cours_str}"
        )


def generer_matricule(prenom, nom):
    import random
    lettres = prenom[:2].upper() + nom[:2].upper()
    chiffres = str(random.randint(1000, 9999))
    return lettres + chiffres

def demander_entier(message, valeurs_valides):
    while True:
        try:
            choix = int(input(message))
            if choix in valeurs_valides:
                return choix
            else:
                print("Choix invalide. Réessayez.")
        except ValueError:
            print("Veuillez entrer un nombre valide.")

def main():
    personnes = []

    while True:
        print("\nQue souhaitez-vous faire ?")
        print("1 - Encoder un employé")
        print("2 - Encoder un étudiant")
        print("0 - Quitter et afficher les données")
        choix = demander_entier("Votre choix : ", [0, 1, 2])

        if choix == 0:
            print("\n--- Résumé des personnes encodées ---")
            for p in personnes:
                print(p)
                print("-" * 40)
            break

        nom = input("Nom : ")
        prenom = input("Prénom : ")
        adresse = input("Adresse : ")

        if choix == 1:
            fonction = input("Fonction : ")
            employe = Employe(nom, prenom, adresse, fonction)
            personnes.append(employe)

        elif choix == 2:
            matricule = generer_matricule(prenom, nom)
            etudiant = Etudiant(nom, prenom, adresse, matricule)

            while True:
                ajout = input("Souhaitez-vous ajouter un cours ? (o/n) : ").lower()
                if ajout == "o":
                    cours = input("Nom du cours : ")
                    etudiant.ajouter_cours(cours)
                elif ajout == "n":
                    break
                else:
                    print("Réponse invalide. Tapez 'o' ou 'n'.")
            personnes.append(etudiant)

if __name__ == "__main__":
    main()
