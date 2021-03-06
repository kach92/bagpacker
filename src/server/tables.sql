CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstname Text,
    lastname Text,
    email TEXT,
    password TEXT,
    gender TEXT,
    image TEXT
);

CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS groups_users (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    group_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS trips (
    id SERIAL PRIMARY KEY,
    name TEXT,
    user_id INTEGER,
    group_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS packing_lists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    group_id INTEGER,
    trip_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (group_id) REFERENCES groups (id),
    FOREIGN KEY (trip_id) REFERENCES trips (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS packing_list_categories(
    id SERIAL PRIMARY KEY,
    packing_list_id INTEGER,
    category TEXT,
    FOREIGN KEY (packing_list_id) REFERENCES packing_lists (id) ON DELETE CASCADE
);




CREATE TABLE IF NOT EXISTS packing_list_items (
    id SERIAL PRIMARY KEY,
    packing_list_id INTEGER,
    group_id INTEGER,
    name TEXT,
    quantity INTEGER,
    packed BOOLEAN DEFAULT false,
    private BOOLEAN DEFAULT false,
    shared BOOLEAN,
    category_id INT,
    FOREIGN KEY (packing_list_id) REFERENCES packing_lists(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups (id),
    FOREIGN KEY (category_id) REFERENCES packing_list_categories (id) ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS destinations (
    id SERIAL PRIMARY KEY,
    name Text,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    duration INT,
    trip_id INT,
    image TEXT,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name TEXT,
    category TEXT,
    activity TEXT,
    weather TEXT,
    gender TEXT,
    daily BOOLEAN,
    quantity FLOAT(4),
    shared BOOLEAN
);

