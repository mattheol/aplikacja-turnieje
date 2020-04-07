import { User } from "./user";
import { Match } from "./match";
import { ParticipantTournament } from "./participantTournament";

export class Tournament {
  constructor(
    public id: number,
    public organizers: User[],
    public participants: ParticipantTournament[],
    public matches: Match[],
    public name: string,
    public isPrivate: boolean,
    public numberOfPlayers: number,
    public description: string,
    public randomBracket: boolean,
    public isForTeams:boolean,
    public tournamentType: string,
    public isActive: boolean,
    public enrollmentEnd: Date
  ) {}
}

export class TournamentDTO {
  constructor(
    public id: Number,
    public name: String,
    public isForTeam: boolean,
    public teamName: String
  ) {}
}
