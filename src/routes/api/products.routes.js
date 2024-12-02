const router = require('express').Router();

const { getAll, create, update, remove, getById, getByPrice, getActives } = require('../../controllers/products.controller');
const { checkToken } = require('../../middlewares/users.middleware');

router.get('/', getAll);
router.get('/price/:min/:max', getByPrice);
router.get('/actives', getActives);
router.get('/:productId', getById);

router.post('/', checkToken, create);
router.put('/:productId', update);
router.delete('/:productId', remove);

module.exports = router;