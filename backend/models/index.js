'use strict';
const config = require('../src/config/database');
const Sequelize = require('sequelize');
const Todo = require('../src/api/todo/Todo');
const messages = require('../src/api/messages');

const Api = {
    conn: () => { return new Sequelize(config) },

    list: async (res) => {
        const attributes = {
            attributes: ['id', 'description', 'mark'],
            raw: true
        }
        const list = await Todo.findAll(attributes)
            .then(listen => listen.map(l => l))
            .catch(err => {
                console.log(messages.Error.msg(err.original));
                res.json(messages.Error)
            });

        return list;
    },

    add: (req, res) => {
        const description = req.body.description;
        if (!description) return res.json(messages
            .Custom({ erro: true, msg: 'Not exists value!' }));

        Todo.create({ description })
            .catch(err => {
                console.log(messages.Error.msg(err.original));
                res.json(messages.Error)
            });

        return res.json(messages.Success);
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const deleteTodo = await Todo.destroy({ where: { id } })
            .then(e => messages.Success)
            .catch(err => {
                console.log(messages.Error.msg(err.original));
                res.json(messages.Error)
            });
        return res.send(deleteTodo);
    },

    edit: async (req, res) => {
        const id = req.params.id;
        const description = req.body.description;
        if (!description) return res.json(messages
            .Custom(true, 'Not exists value!'));
        const updateTodo = await Todo
            .update({ description }, { where: { id } })
            .then(resp => console.log(resp))
            .catch(err => err)

        return res.json(updateTodo);
    },

    editMark: async (req, res) => {
        const id = req.params.id;
        const atualMark = await Todo
            .findOne({ where: { id }, attributes: ['mark', 'id'] })
            .then(mark => mark['dataValues']);

        const dinamicMark = atualMark.mark ? false : true;

        const query = Api.conn()
            .query(`UPDATE todoschemas set mark = ${dinamicMark} WHERE id = ${id}`)
            .then(result => { error: false })
            .catch(err => res
                .json({ error: true, msg: err }));

        return res.json(query);
        //  --------------ESSE METODO NAO FUNCIONOU---------------
        // const updateTodo = await Todo
        //     .update({ mark: true, }, { where: { id } })
        //     .then(resp => resp)
        //     .catch(err => err)
        // --------------------------------------------------------
    },

    index: () => `
        API para CRUD simples feita com Sequelize/MYSQL!
        <br>
        <br>
        Para listagem de dados acesse: '/list' (get)
        <br>
        Para adicionar: '/todo' (post)
        <br>
        Para edição: '/todo/:id' (put)
        <br>
        Para deletar: '/todo/:id' (delete)
        <br>
        <br>
        GitHub: https://github.com/douglasgodoy1998
    `
}

module.exports = Api;
