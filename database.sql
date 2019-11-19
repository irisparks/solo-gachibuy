
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


CREATE TABLE "fav_item" (
	"fav_item_id" INT REFERENCES "item",
	"user" INT REFERENCES "user");
	
	CREATE TABLE "groups_users" (
	"id" SERIAL PRIMARY KEY, 
	"group_id" INT REFERENCES "group",
	"users" INT REFERENCES "user");
    
CREATE TABLE "item" (
	"id" SERIAL PRIMARY KEY, 
	"item_name" VARCHAR(80) NOT NULL,
	"item_completed" BOOLEAN NOT NULL DEFAULT FALSE,
	"list_id" INT REFERENCES "list"
);
CREATE TABLE "list" (
	"id" SERIAL PRIMARY KEY, 
	"list_name" VARCHAR(80) NOT NULL,
	"list_completed" BOOLEAN NOT NULL DEFAULT FALSE,
	"group_id" INT REFERENCES "group",
	"date_created" DATE NOT NULL DEFAULT CURRENT_DATE,
	"shopping_date" DATE
);

CREATE TABLE "group" (
	"id" SERIAL PRIMARY KEY, 
	"name" VARCHAR(80) NOT NULL,
	"img_src"  VARCHAR(80),
	"creator" int REFERENCES "user"
);