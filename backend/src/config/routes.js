const express = require('express');
const routes = express.Router();
const Todo = require('../api/todo/Todo');
// const validator = require('validator');
// const Op = Sequelize.Op;

routes.get('/', (req, res) => res.send(`
    API para CRUD simples feita com Sequelize/MYSQL!
    <br>
    <br>
    Para listagem de dados acesse: '/list'
    <br>
    Para adicionar: '/add'
    <br>
    Para edição: '/putMark/:id'
    <br>
    Para deletar: '/delete/:id'
    <br>
    <br>
    GitHub: https://github.com/douglasgodoy1998
`));

routes.get('/list', async (req, res) => {
    const attributes = {
        attributes: ['id', 'description', 'mark'],
        raw: true
    }
    const list = await Todo.findAll(attributes)
        .then(list => list)
        .catch(err => res.send(err));
    return res.send(list.map(l => l))
});

routes.post('/add', async (req, res) => {
    const description = req.body.description;
    // const validaDesc = validator.isAlphanumeric(description, "pt-BR");
    if (!description) return res.json({
        error: true,
        msg: "Format description is not valid!"
    });

    Todo.create({ description })
        .catch(err => res
            .json({ error: true, msg: err }));

    return res.json({
        error: false,
        msg: "Success"
    });
});

routes.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const deleteTodo = await Todo.destroy({ where: { id } })
        .then(e => 'Removed data successfully!')
        .catch(err => err)
    return res.send(deleteTodo);
});

routes.put('/putMark/:id', async (req, res) => {
    const id = req.params.id;
    const db = require('../../models/index');

    const atualMark = await Todo
        .findOne({ where: { id }, attributes: ['mark', 'id'] })
        .then(mark => mark['dataValues']);

    const dinamicMark = atualMark.mark ? false : true;

    const query = db
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
});

routes.put('/putTodo/:id', async (req, res) => {
    const id = req.params.id;
    const description = req.body.description;
    const updateTodo = await Todo
        .update({ description }, { where: { id } })
        .then(resp => console.log(resp))
        .catch(err => err)

    return res.json(updateTodo);
});


module.exports = routes;
