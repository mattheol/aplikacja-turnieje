drop table invitations;
drop table tournaments_organizers;
drop table matches_participants;
drop table tournaments_participants;
drop table users;
drop table matches;
drop table tournaments;

INSERT INTO users (id, first_name,last_name,gender,birthday,email,login,password)
       VALUES (1,'Jan','Kowalski','M','2000-01-21','jk@wp.pl','black',null),
              (2,'Monika','Nowak','F','2001-03-01','mk@wp.pl','white',null),
              (3,'Kamil','Głuś','M','2001-03-01','kg@wp.pl','brown',null),
              (4,'Adam','Ozdoba','M',null,null,'yellow',null),
              (5,'Patryk','Wierzba','M','2001-03-01','kgvfd@wp.pl','orange',null),
              (6,'Magdalena','Powszek','F',null,null,'gray',null),
              (7,'Mateusz','Rogowski','M','2001-03-01','kgqweq@wp.pl','blue',null),
              (8,'Witold','Kędziora','M',null,null,'pink',null),
              (9,'Jan','Kędziora','M',null,'user@user','user123','$2a$10$MhgGojF79oksaGBt8BRoBuqOYDeiqcAzhL8zDPSTRvhhUnp4GFtuy');

INSERT INTO tournaments (id,name,tournament_type,is_private,is_for_teams,number_of_players,random_bracket, enrollment_end,description,is_active)
       VALUES (1,'Turniej 1','LEAGUE',false,false,8,false, '2020-03-29', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec metus eros, tempor et tempor vel, pharetra lacinia ex.', true),
              (2,'Turniej 2','MIXED',false,true,16,true,'2020-04-01','Quisque fermentum tortor nec nibh mollis egestas nec non risus.',true),
              (3,'Turniej 3','LEAGUE',false,false,10,false, '2020-03-29', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec metus eros, tempor et tempor vel, pharetra lacinia ex.',false),
              (4,'Turniej 4','MIXED',false,false,16,true,'2020-04-01','Quisque fermentum tortor nec nibh mollis egestas nec non risus.',false);


INSERT INTO matches (id,comment,winner_id,score,stage,start_time,tournament_id)
       VALUES (1,'',null,null ,1 , '2020-05-04 17:00', 1),
              (2,'',null,null,1 ,'2020-05-05 20:00' ,1),
              (3,'',null,null,1 ,'2020-04-07 9:30' ,1),
              (4,'',null,null,1 ,'2020-04-07 9:30' ,1),
              (6,'',null,null,1,'2020-04-08 10:30',2),
              (7,'',null,null,1,'2020-04-08 12:30',2);

INSERT INTO matches_participants VALUES (1,1),(1,2), (2,3), (2,4), (3,5), (3,6), (4,7), (4, 8),(6,9),(6,1),(7,8),(7,2);

INSERT INTO invitations (id,invitation_message,confirm_type, invitation_time,organizer_id,participant_id,tournament_id)
       VALUES (1,'Zapraszam cię na turniej.','NONE','2020-04-08 12:30',1,9,3 ),
               (2,'Zapraszam cię do mojego turnieju.','NONE','2020-05-01 12:30',2,9,4 );

INSERT INTO tournaments_organizers (tournament_id,organizer_id)
       VALUES (1,9),(2,9),(3,9),(4,9);

INSERT INTO tournaments_participants (tournament_id,participant_id, team_name)
VALUES (1,1,null),
       (1,2,null),
       (1,3,null),
       (1,4,null),
       (1,5,null),
       (1,6,null),
       (1,7,null),
       (1,9,null),
       (2,1,"Borsuki"),
       (2,2,"Wilki"),
       (2,8,"Kojoty"),
       (2,9,"Krowy"),
       (4,1,null),
       (4,2,null),
       (4,3,null),
       (4,4,null),
       (4,9,null);

/*DELETE FROM matches_participants WHERE match_id>=8;
DELETE FROM matches WHERE tournament_id = 4;
UPDATE Tournaments 
SET is_active = false WHERE id=4;*/