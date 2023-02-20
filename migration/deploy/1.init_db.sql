-- Deploy my_family_goal:1.init_db to pg

BEGIN;

-- DOMAINS
CREATE DOMAIN email_address AS TEXT CHECK(
    VALUE ~ '^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+@[a-zA-Z0-9]+[-]?[a-zA-Z0-9]+.[a-z]{2,}$'
);

CREATE DOMAIN pseudo AS TEXT CHECK(
    VALUE ~ '^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+$'
);

CREATE DOMAIN positive_integer AS INTEGER CHECK(
    VALUE >= 0
);

-- TABLES
CREATE TABLE "role" (
    "id"    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE
);

CREATE TABLE "user" (
    "id"        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname"  TEXT NOT NULL,
    "pseudo"    TEXT NOT NULL UNIQUE,
    "email"     email_address NOT NULL UNIQUE,
    "password"  TEXT NOT NULL,
    "role_id"   INTEGER NOT NULL DEFAULT 1 REFERENCES "role"("id")
    -- "role_id" has "DEFAULT 1" property to define role on "user", not "parent" (2) or "child" (3)
);

CREATE TABLE "family" (
    "id"    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"  TEXT NOT NULL UNIQUE
);

CREATE TABLE "user_has_family" (
    "user_id"   INTEGER NOT NULL REFERENCES "user"("id"),
    "family_id" INTEGER NOT NULL REFERENCES "family"("id"),
    "credit"    positive_integer NOT NULL DEFAULT 0
);

CREATE TABLE "task" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title"         TEXT NOT NULL,
    "description"   TEXT,
    "gain"          positive_integer NOT NULL,
    "isComplete"    BOOLEAN NOT NULL DEFAULT false,
    "family_id"     INTEGER NOT NULL REFERENCES "family"("id") ON DELETE CASCADE
);

CREATE TABLE "reward" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title"         TEXT NOT NULL,
    "price"         positive_integer NOT NULL,
    "isPurchase"    BOOLEAN NOT NULL DEFAULT false,
    "family_id"     INTEGER NOT NULL REFERENCES "family"("id") ON DELETE CASCADE
);

-- INDEX
CREATE INDEX pseudo_index ON "user"("pseudo");

COMMIT;