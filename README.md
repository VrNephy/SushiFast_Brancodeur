![img](https://cdn.discordapp.com/attachments/751070178472624208/917757760018452530/01_relax_dribble.gif) ![img](https://cdn.discordapp.com/attachments/917717231801098260/920265411877011546/sushifast-logo-github.png)
<h1 style={ text-align: center;}>SushiFast</h1>

 

SushiFast est une application web qui permet à l'utilisateur de passer commande. Ce projet comprend deux parties, la première est à rendre pour le 10 décembre et la seconde partie le 18 février.

 

C’est un projet de deuxième année de BTS SIO SLAM donné par Monsieur Chamillard et Monsieur Capuozzo.

 
![img](https://user-images.githubusercontent.com/77196492/146001011-f60909c0-0725-4270-a285-be744bb1bc07.png)

<h1>Groupe</h1>  

Brancodeurs 1 : Alexandre Alleaume et Lucas Pisano

Etroite collaboration avec l’équipe Brancodeurs 2 composée de Yannick Midey et Bryan Guillot.

 
![img](https://media.discordapp.net/attachments/917717231801098260/920295278328815646/1-removebg-preview.png)
<h1>Outils</h1>

Angular 13.0.1
 
Système d’exploitation : Windows 10

Angular 13.0.1

Visual studio 1.62.2

NodeJS v16.13.0

MongoDB v5.0.4
 

<h1>Lien GitHub</h1> 

 

https://github.com/VrNephy/SushiFast

 

<h1>Lien Projet</h1>

https://slam-vinci-melun.github.io/sio22/phase2/SP2-Angular-2021_22.pdf

 

<h1>Diagramme de cas d’utilisation</h1>

 

![img](https://media.discordapp.net/attachments/901086910083108927/917448206001008680/unknown.png)

<h1>Diagramme séquentiel : passer une commande</h1>

 

![img](https://media.discordapp.net/attachments/901086910083108927/917701431325257748/image.png)

 

 

<h1>Requête pour tous les plateaux</h1>

![img](https://media.discordapp.net/attachments/901086910083108927/917431932462170213/EnormePenisOversize.PNG)

<h1>Structure JSON</h1>

![Une img](https://cdn.discordapp.com/attachments/415449138747146250/942789195733270629/unknown.png)

 

 

<h1>RGPD</h1>

 

![Une img](https://cdn.discordapp.com/attachments/751070178472624208/920245300575219772/unknown.png)

 

 

 

 

<h1>Mise en place/ Commandes</h1>

 

Tout d’abord il faut créer le projet Angular. Pour cela nous exécutons la commande suivante : ng new SushiFast –routing=true

 

A l’emplacement voulu.

 

Après avoir testé que tout s’est bien déroulé, on essaie de lancer le serveur avec la commande : ng serve

 

Ensuite, nous allons créer plusieurs composants via la commande : ng g c « nom du composant »

Il y a donc le composant :boxs, footer, header, home, panier et rgpd.

<h1>Développement</h1>

Nous allons suivre une structure simple. Je vais d'abord vous présenter la vue html puis dans un second temps le backend (typescript lié à la vue en question). Le typescript contient des commentaires pour plus d'explications. Il est vivement recommandé de les lire.

L'application est liée à une api contenant les "plateaux" ou "boxes".

Lien API
```TypeScript
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

export interface boxes {
  id: number;
  name: string;
  pieces: number;
  composition: [
    {
      nom: string,
      quantite: number,
    }
  ];
  saveurs: [];
  prix: number;
  image: string
}


const urlrest = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  constructor(private http: HttpClient) { }

  //contient tout ce que le client ajoute à son panier de la commande
  public panierItemList: any = [];
  public boxList = new BehaviorSubject<any>([]);

  //historique des commandes, à chaque commande passée on ajoute son prix dans l'historique
  histoData: any = JSON.parse(localStorage.getItem('Historique') || '[]')

  bol_to_remove_one = false

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => 'Something bad happened; please try again later.');
  }
```

L'opérateur arrive d'abord sur la page d'accueil du site, le "home.component". Il n'y a pas grand chose sur cette page mis à part le header qui permet d'accéder aux autres pages, le footer qui permet d'accéder au RGPD ainsi qu'une bannière avec un slogan.
![img](https://media.discordapp.net/attachments/415449138747146250/943086884714848296/uihome.PNG)

Si l'opérateur veut prendre commande, il peut cliquer sur le bouton "Menu" du header, ce qui le redirigera sur une page présentant les différents plateaux qui sont proposés. L'opérateur peut cliquer sur "read more" afin d'en savoir plus sur chaque plateau. En effet, en cliquant sur "read more" un modal apparaît et donne la composition du plateau. Il y a également un bouton fermer ainsi qu'un bouton pour ajouter le plateau au panier. Le panier est à gauche de la page, ce qui permet de voir en temps réel le total de la commande et de facilement supprimer un plateau en trop par exemple.
voici à quoi ressemble le html permettant d'afficher les différents plateaux







Ici, à l'aide d'une boucle ngFor, on affiche les "box" avec une image, un nom, le nombre de pièces ainsi que son prix. Le boutton "Readmore" fait appel à la fonction "affModal()" ce qui comme son nom l'indique affiche le modal propre au plateau sélectionné.

![img](https://cdn.discordapp.com/attachments/415449138747146250/944252057232228352/unknown.png)


concernant l'affichage des boxes, on utilise la fonction fetchbox qui ressemble à ceci:

```TypeScript
//récupère tous les menus depuis le crudService
  fetchBoxes() {
    return this.crudService.getBoxes().subscribe((data: {}) => {
      this.Boxes = data;
    })
  }
```


Le modal du plateau "Amateur Mix"resemble à ceci. On affiche L'image du menu en question, son prix, sa composition, ses saveurs, un bouton pour ajouter le menu en question au panier et enfin, un bouton pour fermer le modal et revenir aux autres menus.
![img](https://media.discordapp.net/attachments/415449138747146250/943087401255972864/modalui.PNG)

Voici à quoi ressemble la fonction permettant d'afficher le modal pour chaque box.
```TypeScript
  //fonction d'affichage de la fenêtre de détails
  affModal(i: number) {
    if (this.showModal) {
      this.showModal = false;
    } else {
      this.boxmodal = this.Boxes[i];
      this.showModal = true;
    }
  }

```

Enfin concernant le panier affiché sur la gauche, à l'aide d'une boucle ngFor, on affiche l'image, le nom et le prix des plateaux ajoutés. Le prix total est par la suite calculé et affiché. Un bouton supprimer apparaît pour chaque plateau et le bouton payer tout en bas afin de finaliser la commande. Une fois finalisée, la commande est ajoutée à l'historique des commandes.

Les fonctions utilisées pour le panier sont 

```Typescript
  //ajout d'un menu à la commande
  addtocart(boxe: any) {
    this.crudService.addtoCart(boxe);
    this.box = []
    for (var i = 0; i < this.crudService.getpanierItemList().length; i++) {
      this.fetchBox(this.crudService.getpanierItemList()[i].id);
    }
    this.grandTotal = this.crudService.getTotalPrice();
  }

  //retirer un menu de la commande
  removeitem(boxe: any) {
    this.crudService.removeCartItem(boxe);
    this.box = []
    for (var i = 0; i < this.crudService.getpanierItemList().length; i++) {
      this.fetchBox(this.crudService.getpanierItemList()[i].id);
    }
  //permet de retirer tous les menus du panier
  emptycart() {
    this.crudService.removeAllCart();
    this.box = [];
    this.grandTotal = this.crudService.getTotalPrice(); console.log("prix total = " + this.grandTotal)
  }
```

Maintenant dans "historique-commande.component". Ce component a pour but de répertorier les commandes effectuées par l'opérateur. En effet, une fois la commande passée, l'opérateur peut consulter l'historique qui affiche l'ID, la date, le prix total ainsi que le statut (si oui ou non la commande est bien payée).

Voici à quoi ressemble le code concernant l'historique.
![img](https://media.discordapp.net/attachments/415449138747146250/943086884073132062/historyui.PNG?width=1381&height=670)
```TypeScript
  //variablec qui stocke l'historique
  histo: any = [];
  //variable qui stocke la date
  now: string = ""
  constructor(public crudService: CrudService) { }

  ngOnInit(): void {
    //on récupère l'historique (prix des commandes ainsi que leurs dates de payement) depuis le localstorage
    this.histo = JSON.parse(localStorage.getItem('Historique') || '[]').map((hist: any, index: Number) => {
      hist[2] = hist[2].reduce((prev: any, current: any, count: Number) => count ? prev + current.prix + " € -"
       + current.nom : current.prix + " € - " + current.nom, ""); return hist
    });

  }
  deleteHistorique() {
    if (confirm("Etes-vous sur de vouloir supprimer l'historique ?")) {
      localStorage.removeItem('Historique')
      location.reload();
    }
  }


```

Dans le box.component lors du paiement de la commande, cette dernière est ajoutée à l'historique grâce à la fonction "addToHistorique".
```TypeScript
//ajout de la commande a l'historique
  addToHistorique() {
    if (this.grandTotal != 0) {
      var date = new Date();
      const formatDate = (current_datetime: any) => {
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + "h" + current_datetime.getMinutes() + "m" + current_datetime.getSeconds() + "s";
        return formatted_date
      }
      this.crudService.histoData.push([this.crudService.getTotalPrice(), formatDate(date), this.box]);
      //   console.log(this.crudService.histoData);
      this.box = []
      this.crudService.panierItemList = []
      this.grandTotal = 0
      /* alert("Achat effectué avec succès") */
      let tabItems = JSON.stringify(this.crudService.histoData)
      localStorage.setItem('Historique', tabItems);
      alert("Payement effectué avec succès, bonne appétit 🍽")
    } else {
      alert("Veuillez choisir un plat avant de commander !!! ")
    }
  }
```

Enfin, voici la page RGPD mais cette fois en ligne comme demandé.
![img](https://media.discordapp.net/attachments/415449138747146250/943086883775348757/dataui.PNG?width=1247&height=670)

<h1>Tests unitaires</h1>

<h3>Show modal</h3>

![img](https://cdn.discordapp.com/attachments/901086910083108927/943067993053736980/TestUnitaireShowModal.PNG)

<h3>Test show modal</h3>

![img](https://cdn.discordapp.com/attachments/901086910083108927/943068046921183232/ShowModal.PNG)

<h3>Transform (arrondi)</h3>

![img](https://cdn.discordapp.com/attachments/901086910083108927/943077263283470356/Transform.PNG)

<h3>Réponses des tests unitaires </h3>

![img](https://cdn.discordapp.com/attachments/901086910083108927/944231052841476126/unknown.png)










<h1>Evil-User Story</h1>

<h2>Opérateur malveillant</h2>
Lors d'un achat, l'opérateur ne fait pas tout payer. Ce qui résulte en une perte de revenu pour l'entreprise.

En tant qu'opérateur malveillant, un client achète 1 box de sushis et je lui en donne 2.

En tant que développeur, je peux mettre en place un système d'identification. Ainsi chaque commande est retrouvable et peut être utilisée pour remonter jusqu'à l'opérateur malveillant.

identification d'employé (Code d'identification d'employé) dans le localstorage.

<h2>Opérateur malveillant</h2>
A l'inverse, lors d'un achat, l'opérateur peut faire payer plus que nécessaire. Ce qui résulte en un gain d'argent pour l'entreprise.

En tant qu'opérateur malveillant, un client achète 1 box de sushi mais je fais payer le prix de 2.

En tant que développeur, je peux mettre en place un système d'identification. Ainsi chaque commande est retrouvable et peut être utilisée pour remonter jusqu'à l'opérateur malveillant.

identification d'employé (Code d'identification d'employé) dans le localstorage.

<h2>Opérateur Client</h2>

Un client peut accéder à la borne/l'application qui est normalement uniquement accessible par l'opérateur.

En tant qu'opérateur malveillant, un client crée sa propre commande et ne paie pas.

En tant que développeur, je mets un place un système d'identification avec un mot de passe, code ou badge qui déverrouille la borne où l'application est accessible.
