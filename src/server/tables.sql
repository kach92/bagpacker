CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    contact TEXT,
    password TEXT,
    gender TEXT,
    image TEXT
);

CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    name TEXT,
);

CREATE TABLE IF NOT EXISTS groups_users (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    group_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id) NOT NULL,
    FOREIGN KEY(group_id) REFERENCES groups(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS packing_lists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    group_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY user_id REFERENCES users (id),
    FOREIGN KEY group_id REFERENCES groups (id)
);

CREATE TABLE IF NOT EXISTS packing_list_items (
    id SERIAL PRIMARY KEY,
    packing_list_id INTEGER,
    name TEXT,
    quantity INTEGER,
    packed BOOLEAN,
    private BOOLEAN,
    shared BOOLEAN,
    FOREIGN KEY packing_list_id REFERENCES packing_lists(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS trips (
    id SERIAL PRIMARY KEY,
    name TEXT,
    user_id INTEGER,
    group_id INTEGER,
    FOREIGN KEY user_id REFERENCES users (id),
    FOREIGN KEY group_id REFERENCES groups (id)
);

CREATE TABLE IF NOT EXISTS weathers (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS destinations (
    id SERIAL PRIMARY KEY,
    name Text,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    duration INT,
    weather_id INT,
    activity_id INT,
    trip_id INT,
    FOREIGN KEY weather_id REFERENCES weathers(id) NOT NULL,
    FOREIGN KEY activity_id REFERENCES activities(id) NOT NULL,
    FOREIGN KEY trip_id REFERENCES trips(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name TEXT,
    category TEXT,
    activity_id INTEGER,
    weather_id INTEGER,
    qty_per_day INTEGER,
    shared BOOLEAN,
    FOREIGN KEY activity_id REFERENCES activities(id),
    FOREIGN KEY weather_id REFERENCES weathers(id)
);












