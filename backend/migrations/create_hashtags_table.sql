CREATE TABLE hashtags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    count INTEGER DEFAULT 0
);