import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RechercheService {

  constructor() { }

  recherche! : string;

  maisonRech:any;
  selectedItem ="maison";
}
