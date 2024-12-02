const router = require('express').Router();

const { register, login, addProduct } = require('../../controllers/users.controller');
const { checkToken } = require('../../middlewares/users.middleware');

router.post('/register', register);
router.post('/login', login);
router.put('/add-product/:productId', checkToken, addProduct);

module.exports = router;