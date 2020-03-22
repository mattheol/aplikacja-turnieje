import { User } from './user';

export class Tournament {
    constructor(public id:number, public organizers:User[], public participants:User[],
        public matches:Match[], public name:string, public isPrivate:boolean, public numberOfPlayers:number,
        public description:string, public randomBracket:boolean, public tournamentType:string){}
}
