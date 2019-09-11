# Bagpacker

![Bagpacker screenshot](https://user-images.githubusercontent.com/50238797/64671208-4178d200-d49a-11e9-8cf2-9ce70fda4834.png)

General Assembly Software Engineering Immersive 19
Unit 4 Project

Built by - [Kenny Ang](https://github.com/kach92), [Shirley Tan](https://github.com/shirleytwl)

## Travel Packing List Generator Web App - Bagpacker
Bagpacker is a Packing List Generator Web App for travellers built using React-ExpressJs-NodeJs-PostgreSql. To set up, fork the project and do an npm install.

## Technologies used
- React, NodeJs, ExpressJs and PostgreSql
- API
  - Teleport API
  - Cloudinary

## Approach Taken
This project is a team project by two developers, one handles frontend and one handles the backend, with a duration of one week. Before starting the project we do a thorough planning on the functionalities and MVP of the project, and then we proceed to prepare and draft out the wireframes as well as the ERD diagram for the app. Then only we proceed to start coding on the app. The frontend developer handles the UI/UX design and user-app interaction using React/Sass, as well as the routing for the app using React-router, while the backend developer handles models and controllers of the app and prepare endpoint routes for the frontend to query for different types of data, using NodeJs, ExpressJs and postgreSQL. This division of work allowed us to freely write and modify our codes without having any merge conflicts throughout the project. Communication is key in this project.

## Installation Instructions
1. Installs all the dependencies of the project is using
```
npm install
````
2. Create the Postgres db for running on local
```
createdb DATABASE_NAME -U USERNAME
````
3. Creates the tables neccessary to run this project
```
psql -d DATABASE_NAME -U USERNAME -f tables.sql
````
4. Seed dummy data
```
psql -d DATABASE_NAME -U USERNAME -f seed.sql
````

## Functions of App
- Generate a packing list of for travelling, based on the user gender, amount of days of travel, weather, and activities for the trip.
- User is able to create a group with their tripmates, and automatically generate packing list for each person based on the travelling details.
- Packing list are categorized into different categories, and users can easily add/edit/delete items as well as add/edit/delete categories in their individual list.
- For group trip, there will be a list of shared items, where users can easily specify who to bring them.
- User can view their tripmate list for reference, and user can also change some items to private so that other users can't see.
- User can check items that they have already pack like a checklist.

## Unsolved Problems
- Temporary list generation for non-user
- Selecting multiple destinations
- Notification to user for uncheck items when closing to the trip
- A search bar linking to e-commerce app for items that user will like to purchase

### Disclaimer
We did not create the photo, they are borrowed and generated using Teleport Api.


### Credits
[Box Icons](https://boxicons.com/usage/) for the icons used in the Project. </br>
[Teleport Api](http://developers.teleport.org/api/) for the different location's photos </br>
[Cloudinary](https://cloudinary.com/) for uploading profile photos </br>
