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