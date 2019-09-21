import sqlite from 'sqlite';
import Character from './character';
import Lore from './lore';
import Quote from './quote';
import bot from '../bot';
const config = require('../config.json');

export const db = sqlite;
export default db;

export async function init() {
    bot.logger.info('Initializing database...', { file : config.db, verbose: config.databaseVerbose});
    await db.open(config.database, { verbose : config.databaseVerbose });
    // I don't think we need this migration since the database is already here
    //    await db.migrate({ migrationsPath: pathJoin(__dirname, '../../migrations')});
    await Promise.all([
        Character.convertStorage()
    ]);
    bot.logger.info('Database initialized.');
}

export async function close() {
    bot.logger.info('Closing database...');
    await db.close();
    bot.logger.info('Database closed');
}