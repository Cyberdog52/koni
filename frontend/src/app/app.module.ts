import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {routes} from "./routes";
import {NavigationComponent} from './shared/navigation/navigation.component';
import {LoginComponent} from './login/login.component';
import {LobbyComponent} from './lobby/lobby.component';
import {IsLoggedInGuard} from "./is-logged-in.guard";
import {LoginScreenGuard} from "./login-screen.guard";
import {ToastrModule} from "ngx-toastr";
import {MatCardModule, MatDialogModule, MatIconModule} from "@angular/material";
import {MaterialModule} from "./material/material.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PlayerListComponent} from './lobby/player-list/player-list.component';
import {GameSettingsComponent} from './lobby/game-settings/game-settings.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {GameComponent} from './game/game.component';
import {WerwoerterComponent} from './game/werwoerter/werwoerter.component';
import {SecretComponent} from './game/secret/secret.component';
import {ConfirmComponent} from './game/werwoerter/confirm/confirm.component';
import {RoleComponent} from './game/werwoerter/role/role.component';
import {ReadComponent} from './game/werwoerter/read/read.component';
import {AskComponent} from './game/werwoerter/ask/ask.component';
import {WerevoteComponent} from './game/werwoerter/werevote/werevote.component';
import {WerewolfswonComponent} from './game/werwoerter/werewolfswon/werewolfswon.component';
import {CitizenwonComponent} from './game/werwoerter/citizenwon/citizenwon.component';
import {CitizenvoteComponent} from './game/werwoerter/citizenvote/citizenvote.component';
import {MainComponent} from './main/main.component';
import {CocktailComponent} from './main/cocktail/cocktail.component';
import {CocktailRecipeComponent} from './main/cocktail/recipe/cocktail-recipe.component';
import {CocktailInstructionsComponent} from './main/cocktail/recipe/cocktail-instructions/cocktail-instructions.component';
import {SearchCocktailComponent} from './main/cocktail/search-cocktail/search-cocktail.component';
import {CompletelyRandomCocktailComponent} from './main/cocktail/completely-random-cocktail/completely-random-cocktail.component';
import {FilterCocktailComponent} from './main/cocktail/filter-cocktail/filter-cocktail.component';
import {WerwoelfleComponent} from './game/werwoelfle/werwoelfle.component';
import {DayPhaseComponent} from "./game/werwoelfle/dayphase/day-phase.component";
import {WerwoelfleRoleComponent} from "./game/werwoelfle/role/werwoelfle-role.component";
import {WerewolfPhaseComponent} from "./game/werwoelfle/werewolf-phase/werewolf-phase.component";
import {WerwoelfleConfirmComponent} from "./game/werwoelfle/werwoelfle-confirm/werwoelfle-confirm.component";
import {LeiterliComponent} from './game/leiterli/leiterli.component';
import {BoardComponent} from './game/leiterli/board/board.component';
import {FieldComponent} from './game/leiterli/field/field.component';
import {RankingComponent} from './game/leiterli/ranking/ranking.component';
import {StatsComponent} from './game/leiterli/stats/stats.component';
import {HistoryComponent} from './game/leiterli/history/history.component';
import {AvatarpickerComponent} from './game/leiterli/avatarpicker/avatarpicker.component';
import {TopbarComponent} from './game/leiterli/topbar/topbar.component';
import {MoveVisualisationComponent} from './game/leiterli/move-visualisation/move-visualisation.component';
import {TempelComponent} from './game/tempel/tempel.component';
import {DialogDeleteMenu, MenuTableComponent} from './menu/menu/menu-table/menu-table.component';
import {DialogDeleteRecipe, RecipeTableComponent} from "./menu/recipe/recipe-table/recipe-table.component";
import {RecipeOverviewComponent} from './menu/recipe/recipe-overview/recipe-overview.component';
import {MenuOverviewComponent} from './menu/menu/menu-overview/menu-overview.component';
import {MenuMainComponent} from './menu/menu-main.component';
import {IngredientTableComponent} from './menu/recipe/recipe-overview/ingredient-table/ingredient-table.component';
import {MenuIngredientTableComponent} from './menu/menu/menu-ingredient-table/menu-ingredient-table.component';
import {CdkColumnDef} from "@angular/cdk/table";
import {FlurComponent} from "./flur/flur.component";
import {ChartsModule} from "angular-bootstrap-md";
import { FlurTemperatureComponent } from './flur/flur-temperature/flur-temperature.component';
import { FlurLevelComponent } from './flur/flur-level/flur-level.component';
import { FlurDischargeComponent } from './flur/flur-discharge/flur-discharge.component';
import { FlurTabBaseComponent } from './flur/flur-tab-base/flur-tab-base.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    LobbyComponent,
    PlayerListComponent,
    GameSettingsComponent,
    GameComponent,
    WerwoerterComponent,
    SecretComponent,
    ConfirmComponent,
    RoleComponent,
    ReadComponent,
    AskComponent,
    WerevoteComponent,
    WerewolfswonComponent,
    CitizenwonComponent,
    CitizenvoteComponent,
    MainComponent,
    CocktailComponent,
    RecipeTableComponent,
    CocktailInstructionsComponent,
    SearchCocktailComponent,
    CompletelyRandomCocktailComponent,
    FilterCocktailComponent,
    WerwoelfleComponent,
    DayPhaseComponent,
    WerwoelfleRoleComponent,
    WerewolfPhaseComponent,
    WerwoelfleConfirmComponent,
    LeiterliComponent,
    BoardComponent,
    FieldComponent,
    RankingComponent,
    StatsComponent,
    HistoryComponent,
    AvatarpickerComponent,
    TopbarComponent,
    MoveVisualisationComponent,
    TempelComponent,
    MoveVisualisationComponent,
    MenuTableComponent,
    DialogDeleteMenu,
    CocktailRecipeComponent,
    DialogDeleteRecipe,
    RecipeOverviewComponent,
    MenuOverviewComponent,
    MenuMainComponent,
    IngredientTableComponent,
    MenuIngredientTableComponent,
    FlurComponent,
    FlurTemperatureComponent,
    FlurLevelComponent,
    FlurDischargeComponent,
    FlurTabBaseComponent
  ],
  entryComponents: [DialogDeleteMenu, DialogDeleteRecipe],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    MaterialModule,
    MatCardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [
    IsLoggedInGuard,
    LoginScreenGuard,
    CdkColumnDef,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
