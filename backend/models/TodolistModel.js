import { Sequelize } from "sequelize";
import db from "../config/db.js";

const {DataTypes} = Sequelize;

const Todolist = db.define('tasks', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING
},{
    freezeTableName: true
});

export default Todolist;

(async()=>{
    await db.sync();
})();