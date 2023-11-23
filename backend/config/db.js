import { Sequelize } from "sequelize";

const db = new Sequelize('todolist_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;
