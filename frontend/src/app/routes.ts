import {Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {LoginScreenGuard} from "./login-screen.guard";
import {LobbyComponent} from "./lobby/lobby.component";
import {IsLoggedInGuard} from "./is-logged-in.guard";
import {GameComponent} from "./game/game.component";
import {MainComponent} from "./main/main.component";
import {CocktailComponent} from "./main/cocktail/cocktail.component";
import {MenuMainComponent} from "./menu/menu-main.component";
import {MenuOverviewComponent} from "./menu/menu/menu-overview/menu-overview.component";
import {RecipeOverviewComponent} from "./menu/recipe/recipe-overview/recipe-overview.component";
import {FlurComponent} from "./flur/flur.component";

export const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'flur', component: FlurComponent},
  {path: 'cocktail', component: CocktailComponent},
  {path: 'menu', component: MenuMainComponent},
  {path: 'menu/:id', component: MenuOverviewComponent },
  {path: 'recipe/:id', component: RecipeOverviewComponent },
  {path: 'login', component: LoginComponent, canActivate: [LoginScreenGuard]},
  {path: 'lobby', component: LobbyComponent, canActivate: [IsLoggedInGuard]},
  {path: 'game', component: GameComponent, canActivate: [IsLoggedInGuard]},
  {path: '', redirectTo: '/main', pathMatch: 'full'}
];
