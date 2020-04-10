import { Tournament } from "./tournament";
import { User } from "./user";
export class Match {
  constructor(
    public id: number,
    public matchParticipants: User[],
    public tournament: Tournament,
    public score: string,
    public comment: string,
    public stage: string,
    public startTime: Date
  ) {}
}
