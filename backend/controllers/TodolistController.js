import Todolist from "../models/TodolistModel.js";

export const getTask = async(req,res) => {
    try {
        const response = (await Todolist.findAll({
            order: [
                // We start the order array with the model we want to sort
                ['id', 'DESC']
              ]
        }));

        console.log(response);
        res.status(200).json(response);
    } catch (err) {
        console.log(err.message);
    }
}

export const getTaskById = async(req,res) => {
    try {
        const response = await Todolist.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (err) {
        console.log(err.message);
    }
}

export const createTask = async(req,res) => {
    try {
        await Todolist.create(req.body);
        res.status(201).json({msg: "Task Created!"});
    } catch (err) {
        console.log(err.message);
    }
}

export const updateTask = async(req,res) => {
    try {
        await Todolist.update(req.body, {
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Task Updated!"});
    } catch (err) {
        console.log(err.message);
    }
}

export const deleteTask = async(req,res) => {
    try {
        await Todolist.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Task Deleted!"});
    } catch (err) {
        console.log(err.message);
    }
}