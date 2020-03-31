import { TournamentFormComponent } from "./components/tournament-form/tournament-form.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TournamentsListComponent } from "./components/tournaments-list/tournaments-list.component";
import { TournamentComponent } from "./components/tournament/tournament.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";

const routes: Routes = [
  { path: "turnieje", component: TournamentsListComponent },
  { path: "turnieje/:id", component: TournamentComponent },
  { path: "stworz-turniej", component: TournamentFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
