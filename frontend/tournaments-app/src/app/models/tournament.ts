import { User } from "./user";
import { Match } from "./match";

export class Tournament {
  constructor(
    public id: number,
    public organizers: User[],
    public participants: User[],
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
