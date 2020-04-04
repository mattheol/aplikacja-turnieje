INSERT INTO users (id, first_name,last_name,gender,birthday,email,login,password)
VALUES (1,'Jan','Kowalski','M','2000-01-21','jk@wp.pl',null,null),
       (2,'Monika','Nowak','F','2001-03-01','mk@wp.pl',null,null),
       (3,'Kamil','Głuś','M','2001-03-01','kg@wp.pl',null,null);

INSERT INTO tournaments (id,name,tournament_type,is_private,is_for_teams,number_of_players,random_bracket,description)
VALUES (1,'Football tour','LEAGUE',true,false,10,false,null),
       (2,'CS tour','MIXED',true,true ,16,true,null);

INSERT INTO matches (id,comment,score,stage,tournament_id)
VALUES (1,'Mecz otwarcia',null ,null ,1),
       (2,'Mecz o wszystko',null ,null ,1),
       (3,'Mecz o honor',null ,null ,1);

INSERT INTO invitations (id,invitation_message, invitation_time,organizer_id,participant_id,tournament_id)
VALUES (1,'Cho zagrac',null,1,2,1 );

INSERT INTO tournaments_organizers (tournament_id,organizer_id)
VALUES (1,1);

INSERT INTO tournaments_participants (tournament_id,participant_id, team_name)
VALUES (1,2,null),
       (1,3,null),
       (2,1,"borsuki");
INSERT INTO matches_participants (match_id,participant_id)
VALUES (1,2),
       (1,3);