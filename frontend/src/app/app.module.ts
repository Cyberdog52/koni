import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {routes} from "./routes";
import {ToastrModule} from "ngx-toastr";
import {MatCardModule, MatDialogModule, MatIconModule} from "@angular/material";
import {MaterialModule} from "./material/material.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {MainComponent} from './main/main.component';
import {CocktailComponent} from './cocktail/cocktail.component';
import {CocktailRecipeComponent} from './cocktail/recipe/cocktail-recipe.component';
import {CocktailInstructionsComponent} from './cocktail/recipe/cocktail-instructions/cocktail-instructions.component';
import {SearchCocktailComponent} from './cocktail/search-cocktail/search-cocktail.component';
import {CompletelyRandomCocktailComponent} from './cocktail/completely-random-cocktail/completely-random-cocktail.component';
import {FilterCocktailComponent} from './cocktail/filter-cocktail/filter-cocktail.component';
import {CdkColumnDef} from "@angular/cdk/table";
import {FlurComponent} from "./flur/flur.component";
import {ChartsModule, MDBBootstrapModule} from "angular-bootstrap-md";
import { FlurTemperatureComponent } from './flur/flur-temperature/flur-temperature.component';
import { FlurLevelComponent } from './flur/flur-level/flur-level.component';
import { FlurDischargeComponent } from './flur/flur-discharge/flur-discharge.component';
import { FlurTabBaseComponent } from './flur/flur-tab-base/flur-tab-base.component';
import { WeatherTemperatureComponent } from './flur/weather-temperature/weather-temperature.component';
import { WeatherWindComponent } from './flur/weather-wind/weather-wind.component';
import { WeatherRainComponent } from './flur/weather-rain/weather-rain.component';
import { FlurOverviewComponent } from './flur/flur-overview/flur-overview.component';
import { RandomRelayComponent } from './random-relay/random-relay.component';
import {HousepointsComponent} from "./housepoints/housepoints.component";
import { HousepointsAdminComponent } from './housepoints/housepoints-admin/housepoints-admin.component';
import { HousepointsHistoryComponent } from './housepoints/housepoints-history/housepoints-history.component';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CocktailComponent,
    CocktailInstructionsComponent,
    SearchCocktailComponent,
    CompletelyRandomCocktailComponent,
    FilterCocktailComponent,
    CocktailRecipeComponent,
    FlurComponent,
    FlurTemperatureComponent,
    FlurLevelComponent,
    FlurDischargeComponent,
    FlurTabBaseComponent,
    WeatherTemperatureComponent,
    WeatherWindComponent,
    WeatherRainComponent,
    FlurOverviewComponent,
    RandomRelayComponent,
    HousepointsComponent,
    HousepointsAdminComponent,
    HousepointsHistoryComponent,
  ],
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
    ChartsModule,
    MDBBootstrapModule,
    NgbModule,
    NgbPaginationModule
  ],
  providers: [
    CdkColumnDef,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
