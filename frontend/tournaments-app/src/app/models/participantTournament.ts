import { User } from "./user";
import { Tournament } from "./tournament";
import { ParticipantTournamentID } from "./participantTournamentID";

export class ParticipantTournament {
  constructor(
    public participantTournamentID: ParticipantTournamentID,
    public teamName: String,
    public participant: User,
    public tournament: Tournament
  ) {}
}
