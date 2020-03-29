import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TournamentsListComponent } from "./components/tournaments-list/tournaments-list.component";
import { TournamentComponent } from "./components/tournament/tournament.component";

const routes: Routes = [
  { path: "turnieje", component: TournamentsListComponent },
  { path: "turnieje/:id", component: TournamentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
