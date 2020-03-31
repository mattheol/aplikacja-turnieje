import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { TestowyComponent } from "./components/testowy/testowy.component";
import { HttpClientModule } from "@angular/common/http";
import { TournamentsListComponent } from "./components/tournaments-list/tournaments-list.component";
import { MenuComponent } from "./components/menu/menu.component";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TournamentComponent } from "./components/tournament/tournament.component";
import { RegisterFormComponent } from './components/register-form/register-form.component';

import { MatFormFieldModule, MatInputModule, MatIconModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule,  MAT_DATE_LOCALE, MatButtonModule } from '@angular/material'

@NgModule({
  declarations: [
    AppComponent,
    TestowyComponent,
    TournamentsListComponent,
    MenuComponent,
    TournamentComponent,
    RegisterFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pl-pl'}],
  bootstrap: [AppComponent]
})
export class AppModule {}
