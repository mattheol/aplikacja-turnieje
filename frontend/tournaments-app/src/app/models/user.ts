import { Tournament } from './tournament';
import { Match } from './match';

export class User {
    constructor(public id:number, public organizedTournaments:Tournament[], public participatedTournaments:Tournament[],
        public matches:Match[], public login:string, public password:string, public firstName:string,
        public lastName:string, public email:string, public birthday:Date,
        public gender:string){}
}
