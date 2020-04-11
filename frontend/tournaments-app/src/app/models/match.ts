import { Tournament } from "./tournament";
import { User } from "./user";
export class Match {
  constructor(
    public id: number,
    public matchParticipants: User[],
    public tournament: Tournament,
    public winnerId: number,
    public teamName: string,
    public opponentTeamName: string,
    public score: string,
    public comment: string,
    public stage: string,
    public startTime: Date
  ) {}
}
