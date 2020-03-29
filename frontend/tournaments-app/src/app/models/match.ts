import { Tournament } from "./tournament";
export class Match {
  constructor(
    public id: number,
    public tournament: Tournament,
    public score: string,
    public comment: string,
    public stage: string,
    public startTime: Date
  ) {}
}
