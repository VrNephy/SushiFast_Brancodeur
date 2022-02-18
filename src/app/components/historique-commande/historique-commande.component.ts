import { Component, OnInit } from '@angular/core';
import { CrudService } from "src/app/services/crud.service";

@Component({
  selector: 'app-historique-commande',
  templateUrl: './historique-commande.component.html',
  styleUrls: ['./historique-commande.component.css']
})
export class HistoriqueCommandeComponent implements OnInit {
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

}
