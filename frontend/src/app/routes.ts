import {Routes} from "@angular/router";
import {MainComponent} from "./main/main.component";
import {CocktailComponent} from "./cocktail/cocktail.component";
import {FlurComponent} from "./flur/flur.component";
import {RandomRelayComponent} from "./random-relay/random-relay.component";
import {HousepointsComponent} from "./housepoints/housepoints.component";
import {HousepointsAdminComponent} from "./housepoints/housepoints-admin/housepoints-admin.component";

export const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'flur', component: FlurComponent},
  {path: 'random', component: RandomRelayComponent},
  {path: 'cocktail', component: CocktailComponent},
  {path: 'housepoints', component: HousepointsComponent},
  {path: 'adminhousepoints', component: HousepointsAdminComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'}
];
