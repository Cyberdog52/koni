import {Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {LoginScreenGuard} from "./login-screen.guard";
import {LobbyComponent} from "./lobby/lobby.component";
import {IsLoggedInGuard} from "./is-logged-in.guard";
import {GameComponent} from "./game/game.component";
import {MainComponent} from "./main/main.component";
import {CocktailComponent} from "./main/cocktail/cocktail.component";

export const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'cocktail', component: CocktailComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoginScreenGuard]},
  {path: 'lobby', component: LobbyComponent, canActivate: [IsLoggedInGuard]},
  {path: 'game', component: GameComponent, canActivate: [IsLoggedInGuard]},
  {path: '', redirectTo: '/main', pathMatch: 'full'}
];
