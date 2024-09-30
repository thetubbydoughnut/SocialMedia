const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../database.sqlite');
const sqlPath = path.resolve(__dirname, '../migrations/create_hashtags_table.sql');

const db = new sqlite3.Database(dbPath);

const runMigration = () => {
    const sql = fs.readFileSync(sqlPath, 'utf8');
    db.exec(sql, (err) => {
        if (err) {
            console.error('Error running migration:', err.message);
        } else {
            console.log('Migration ran successfully');
        }
        db.close();
    });
};

runMigration();