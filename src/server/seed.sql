INSERT INTO weathers (name) VALUES ('Sunny');
INSERT INTO weathers (name) VALUES ('Snowy');
INSERT INTO weathers (name) VALUES ('Rainy');

INSERT INTO activities (name) VALUES ('Hiking');
INSERT INTO activities (name) VALUES ('Leisure');
INSERT INTO activities (name) VALUES ('Business');
INSERT INTO activities (name) VALUES ('Beach');
INSERT INTO activities (name) VALUES ('Snow Sports');
INSERT INTO activities (name) VALUES ('Camping');

INSERT INTO items (name,category,activity_id,weather_id,gender,daily,quantity,shared) VALUES ('Casual Shirts','Essentials',null,null,null,true,1,false);
INSERT INTO items (name,category,activity_id,weather_id,gender,daily,quantity,shared) VALUES ('Casual Pants','Essentials',null,null,null,true,1,false);
INSERT INTO items (name,category,activity_id,weather_id,gender,daily,quantity,shared) VALUES ('Tooth Paste','Toiletries',null,null,null,false,1,true);
INSERT INTO items (name,category,activity_id,weather_id,gender,daily,quantity,shared) VALUES ('Winter Jacket','Essentials',null,2,null,false,1,false);
INSERT INTO items (name,category,activity_id,weather_id,gender,daily,quantity,shared) VALUES ('Skis','Equipments',5,2,null,false,1,false);
INSERT INTO items (name,category,activity_id,weather_id,gender,daily,quantity,shared) VALUES ('Swimming Goggles','Equipments',4,null,null,false,1,false);
INSERT INTO items (name,category,activity_id,weather_id,gender,daily,quantity,shared) VALUES ('Sun Block','Essentials',4,null,null,false,1,true);
INSERT INTO items (name,category,activity_id,weather_id,gender,daily,quantity,shared) VALUES ('Eye Liner','Beauty',null,null,'F',false,1,false);
INSERT INTO items (name,category,activity_id,weather_id,gender,daily,quantity,shared) VALUES ('Medications','Essentials',null,null,null,false,1,false);
INSERT INTO items (name,category,activity_id,weather_id,gender,daily,quantity,shared) VALUES ('Towel','Toiletries',null,null,null,false,1,false);

INSERT INTO users (firstname,lastname,email,password,gender) VALUES ('Kenny','Ang','kenny.ang9206@gmail.com','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','M');
INSERT INTO users (firstname,lastname,email,password,gender) VALUES ('Shirley','Tan','idunno@gmail.com','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','F');
INSERT INTO users (firstname,lastname,email,password,gender) VALUES ('Khai','Ri','iosodunno@gmail.com','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','M');


INSERT INTO groups (name) VALUES ('TripDetails to Tokyo');
INSERT INTO groups (name) VALUES ('TripDetails to Africa');

INSERT INTO groups_users (user_id,group_id) VALUES (1,1);
INSERT INTO groups_users (user_id,group_id) VALUES (2,1);
INSERT INTO groups_users (user_id,group_id) VALUES (2,2);
INSERT INTO groups_users (user_id,group_id) VALUES (3,2);

INSERT INTO trips (name,user_id,group_id) VALUES ('Trip to Beijing',1,null);
INSERT INTO trips (name,user_id,group_id) VALUES ('Trip to Bangkok',1,null);
INSERT INTO trips (name,user_id,group_id) VALUES ('Trip to Tokyo',null,1);
INSERT INTO trips (name,user_id,group_id) VALUES ('Trip to Africa',null,2);
INSERT INTO trips (name,user_id,group_id) VALUES ('Trip to Wonderland',2,null);
INSERT INTO trips (name,user_id,group_id) VALUES ('Trip to Holland',3,null);

INSERT INTO destinations (name,start_date,end_date,duration,trip_id) VALUES ('TripDetails to Beijing','2019-08-01','2019-08-10',9,1);
INSERT INTO destinations (name,start_date,end_date,duration,trip_id) VALUES ('TripDetails to Bangkok','2019-08-01','2019-08-10',9,2);
INSERT INTO destinations (name,start_date,end_date,duration,trip_id) VALUES ('TripDetails to Tokyo','2019-08-01','2019-08-10',9,3);
INSERT INTO destinations (name,start_date,end_date,duration,trip_id) VALUES ('TripDetails to Africa','2019-08-01','2019-08-10',9,4);
INSERT INTO destinations (name,start_date,end_date,duration,trip_id) VALUES ('TripDetails to Wonderland','2019-08-01','2019-08-10',9,5);
INSERT INTO destinations (name,start_date,end_date,duration,trip_id) VALUES ('TripDetails to Holland','2019-08-01','2019-08-10',9,6);