import bot from '../bot';
import db from './index';

/* The character table:
 * 
 * CREATE TABLE CHARACTER(
 *   ID INT PRIMARY KEY      NOT NULL,
 *   SERVER_ID  CHAR(18)     NOT NULL,
 *   CREATOR    CHAR(18)     NOT NULL,
 *   DESCRIPTION TEXT,
 *   NAME TEXT   NOT NULL
 * );
 */
const sqlFindByGuild = 'SELECT server_id, name, description, creator, CAST(id AS TEXT) FROM character WHERE server_id = ?';
const sqlFindByGuildAndName = 'SELECT server_id, name, description, creator, CAST(id AS TEXT) FROM character WHERE server_id = ? and name = ?';
const sqlFindByGuildAndNameLike = 'SELECT server_id, name, description, creator, CAST(id AS TEXT) FROM character WHERE server_id = ? and name like ?';
const sqlInsert = 'INSERT INTO character VALUES(?, ?, ?, ?)';
const sqlUpdate = 'UPDATE character SET name = ?, description = ? WHERE server_id = ? AND name = ?';
const sqlDelete = 'DELETE FROM character WHERE server_id = ? AND name = ?';
const sqlClear = 'DELETE FROM character WHERE server_id = ?';

export default class Character {
    constructor(guild, creator, name, description) {
        if (!guild || !creator || !name) throw new Error('Character name, creator, and guild must be specified');
        this.guild = guild.id || guild;
        this.creator = creator.id || creator;
        this.name = name;
        this.description = description;
    }

    static async save(chracter) {
        if (!character) throw new Error('A character must be specified.');
        const findStmt = await db.prepare(sqlFindByGuildAndName);
        const existingCharacters = await findStmt.all(character.guild, character.name);
        findStmt.finalize();
        if (existingCharacters.length > 1) throw new Error('Multiple existing characters found.');
        if (existingCharacters.length === 1) {
            if (existingCharacters[0].creator === character.creator || bot.permissions.isMod(character.guild, character.owner)) {
                const updateStmt = await db.prepare(sqlUpdate);
            } else {
                return false;
            }
        } else {
            const insertStmt = await db.prepare(sqlInsert);
            await insertStmt.run(character.guild, character.name, character.info, character.owner);
            insertStmt.finalize();
            bot.logger.info('Added new character.', character);
            return { character: character, new : true };
        }
    }
}