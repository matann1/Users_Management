const express = require('express');
const userBL = require('../models/userBL');

const router = express.Router();

router.route('/').get(async function(req, resp) {
  if (req.query != null && req.query.name != null) {
    let name = req.query.name;
    let data = await userBL.getUserByNameOrEmail(name);
    return resp.json(data);
  } else {
    let data = await userBL.getAllUsers();
    return resp.json(data);
  }
});

router.route('/:id').get(async function(req, resp) {
  let id = req.params.id;
  let data = await userBL.getUser(id);
  return resp.json(data);
});

router.route('/').post(async function(req, resp) {
  let obj = req.body;
  let status = await userBL.addUser(obj);
  return resp.json(status);
});

router.route('/:id').put(async function(req, resp) {
  let id = req.params.id;
  let obj = req.body;
  let status = await userBL.updateUser(id, obj);
  return resp.json(status);
});

router.route('/:id').delete(async function(req, resp) {
  let id = req.params.id;
  let status = await userBL.deleteUser(id);
  return resp.json(status);
});

module.exports = router;
