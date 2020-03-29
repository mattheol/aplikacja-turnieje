import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TestowyComponent } from "./components/testowy/testowy.component";
import { HttpClientModule } from "@angular/common/http";
import { TournamentsListComponent } from "./components/tournaments-list/tournaments-list.component";
import { MenuComponent } from "./components/menu/menu.component";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TournamentComponent } from "./components/tournament/tournament.component";

@NgModule({
  declarations: [
    AppComponent,
    TestowyComponent,
    TournamentsListComponent,
    MenuComponent,
    TournamentComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
