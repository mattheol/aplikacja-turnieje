import { Tournament } from "./tournament";
import { Match } from "./match";
import { ParticipantTournament } from "./participantTournament";

export class User {
  constructor(
    public id: number,
    public organizedTournaments: Tournament[],
    public participatedTournaments: ParticipantTournament[],
    public matches: Match[],
    public login: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public birthday: Date,
    public gender: string
  ) {}
}
