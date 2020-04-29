import { Tournament } from './tournament';
import { User } from './user';

export class Invitation {
    constructor(public id:number, public organizer: User, public participant: User, public confirmType: string,
        public tournament: Tournament, public invitationTime: Date, public invitationMessage: string){}
}
