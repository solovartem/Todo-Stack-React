const express = require('express');
const routes = express.Router();
const api = require('../../models/index');

routes.get('/', (req, res) => res.send(api.index()));
routes.get('/todo', async (req, res) => res.json(await api.list(res)));
routes.post('/todo', async (req, res) => await api.add(req, res));
routes.delete('/todo/:id', async (req, res) => await api.delete(req, res));
routes.put('/todo/:id', async (req, res) => await api.edit(req, res));
routes.put('/putMark/:id', async (req, res) => await api.editMark(req, res));

module.exports = routes;
