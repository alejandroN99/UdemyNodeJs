const { Router } = require("express");
const { getUsers, deleteUsers,patchUsers,postUsers,putUsers } = require("../controllers/user.controllers");

const router = new Router();

router.get('/', getUsers);

router.delete('/', deleteUsers);

router.put('/:id', putUsers);

router.patch('/', patchUsers);

router.post('/', postUsers);



module.exports = router;