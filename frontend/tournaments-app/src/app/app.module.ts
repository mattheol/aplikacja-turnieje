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
import { TournamentFormComponent } from './components/tournament-form/tournament-form.component';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatOptionModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    TestowyComponent,
    TournamentsListComponent,
    MenuComponent,
    TournamentComponent,
    TournamentFormComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}