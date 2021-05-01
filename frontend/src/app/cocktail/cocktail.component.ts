import { Component, OnInit } from '@angular/core';
import {margarita} from "./drinks-mock";
import {CocktailService} from "./cocktail.service";
import {Cocktail} from "../shared/model/cocktail-dtos";

@Component({
  selector: 'cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.scss']
})
export class CocktailComponent implements OnInit {

  constructor(private cocktailService: CocktailService) { }

  ngOnInit() {
  }

}
