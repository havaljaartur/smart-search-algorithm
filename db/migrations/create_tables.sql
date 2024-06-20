-- Create the cities table
CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create the brands table
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create the dish_types table
CREATE TABLE dish_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create the diets table
CREATE TABLE diets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create indexes for the name attributes since the query is based into those attributes
CREATE INDEX idx_cities_name ON cities(name);
CREATE INDEX idx_brands_name ON brands(name);
CREATE INDEX idx_dish_types_name ON dish_types(name);
CREATE INDEX idx_diets_name ON diets(name);