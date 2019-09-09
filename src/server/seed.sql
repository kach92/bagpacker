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

INSERT INTO users (firstname,lastname,email,password,gender) VALUES ('Kenny','Ang','kenny@gmail.com','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','M');
INSERT INTO users (firstname,lastname,email,password,gender) VALUES ('Shirley','Tan','shirley@gmail.com','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','F');
INSERT INTO users (firstname,lastname,email,password,gender) VALUES ('Khai','Ri','khai@gmail.com','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','M');

INSERT INTO categories (name) VALUES ('Essentials');
INSERT INTO categories (name) VALUES ('Toiletries');
INSERT INTO categories (name) VALUES ('Equipments');
INSERT INTO categories (name) VALUES ('Beauty');
INSERT INTO categories (name) VALUES ('Shared');






