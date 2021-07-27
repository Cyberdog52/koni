import {Routes} from "@angular/router";
import {MainComponent} from "./main/main.component";
import {CocktailComponent} from "./cocktail/cocktail.component";
import {FlurComponent} from "./flur/flur.component";
import {RandomRelayComponent} from "./random-relay/random-relay.component";

export const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'flur', component: FlurComponent},
  {path: 'random', component: RandomRelayComponent},
  {path: 'cocktail', component: CocktailComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'}
];
