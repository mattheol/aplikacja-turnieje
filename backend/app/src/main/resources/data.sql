# drop table invitations;
# drop table tournaments_organizers;
# drop table matches_participants;
# drop table tournaments_participants;
# drop table users;
# drop table matches;
# drop table tournaments;

INSERT INTO users (id, first_name,last_name,gender,birthday,email,login,password)
       VALUES (1,'Jan','Kowalski','M','2000-01-21','jk@wp.pl',null,null),
              (2,'Monika','Nowak','F','2001-03-01','mk@wp.pl',null,null),
              (3,'Kamil','Głuś','M','2001-03-01','kg@wp.pl',null,null),
              (4,'Kamil','Slimak','M','2001-03-01','user@user.pl','user','$2a$10$pBJu/WLMmrnVm7hxK2imAeLoZ0H43oL26G9jY3yc0Dm0ksRGHr4/q');

INSERT INTO tournaments (id,name,tournament_type,is_private,is_for_teams,number_of_players,random_bracket, enrollment_end,description)
       VALUES (1,'Turniej 1','LEAGUE',false,false,10,false, '2020-03-29', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec metus eros, tempor et tempor vel, pharetra lacinia ex.'),
              (2,'Turniej 2','MIXED',false,true,16,true,'2020-04-01','Quisque fermentum tortor nec nibh mollis egestas nec non risus.'),
              (3,'Turniej 3','LEAGUE',false,false,10,false, '2020-03-29', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec metus eros, tempor et tempor vel, pharetra lacinia ex.'),
              (4,'Turniej 4','MIXED',false,false,16,true,'2020-04-01','Quisque fermentum tortor nec nibh mollis egestas nec non risus.');

INSERT INTO matches (id,comment,score,stage,start_time,tournament_id)
       VALUES (1,'Mecz otwarcia',null ,null , '2020-05-04 17:00', 1),
              (2,'Mecz o wszystko',null,null ,'2020-05-05 20:00' ,1),
              (3,'Mecz o honor',null,null ,'2020-04-07 9:30' ,1);

INSERT INTO invitations (id,invitation_message, invitation_time,organizer_id,participant_id,tournament_id)
       VALUES (1,'Zapraszam cię na turniej.',null,1,2,1 );

INSERT INTO tournaments_organizers (tournament_id,organizer_id)
       VALUES (1,1),(2,2);

INSERT INTO tournaments_participants (tournament_id,participant_id, team_name)
VALUES (1,2,null),
       (1,3,null),
       (2,1,"borsuki"),
       (2,2,"niedźwiedzie");
              



