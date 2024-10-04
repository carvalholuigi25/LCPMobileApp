﻿CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;

CREATE TABLE "Users" (
    "Id" integer GENERATED BY DEFAULT AS IDENTITY,
    "Username" text NOT NULL,
    "Password" text NOT NULL,
    "FirstName" text,
    "LastName" text,
    "Role" integer,
    CONSTRAINT "PK_Users" PRIMARY KEY ("Id")
);

CREATE TABLE "RefreshToken" (
    "Id" integer GENERATED BY DEFAULT AS IDENTITY,
    "Token" text NOT NULL,
    "Expires" timestamp with time zone NOT NULL,
    "Created" timestamp with time zone NOT NULL,
    "CreatedByIp" text NOT NULL,
    "Revoked" timestamp with time zone,
    "RevokedByIp" text NOT NULL,
    "ReplacedByToken" text NOT NULL,
    "ReasonRevoked" text NOT NULL,
    "UserId" integer NOT NULL,
    CONSTRAINT "PK_RefreshToken" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_RefreshToken_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_RefreshToken_UserId" ON "RefreshToken" ("UserId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20241004114813_InitialCreatePostgresSQL', '8.0.8');

COMMIT;

