import { Tournament } from './tournament';
import { User } from './user';

export class Invitation {
    constructor(public id:number, public organiser: User, public participant: User,
        public tournament: Tournament, public invitationTime: Date, public invitationMessage: string){}
}
