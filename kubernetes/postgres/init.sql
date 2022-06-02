
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE ItemType AS ENUM ('FOUND', 'LOST');

CREATE TABLE IF NOT EXISTS items (
    "uuid" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "type" ItemType NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "place" TEXT NOT NULL,
    "how" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "resolved" BOOLEAN NOT NULL DEFAULT FALSE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
    "uuid" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "fcmToken" TEXT NOT NULL,
    "name" TEXT,
    "studentId" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
