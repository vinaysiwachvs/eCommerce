const express=require('express');
const router =express.Router();

router.route('/').get(getProduct);
router.route('/:id').get(getProductById);
router.route('/').post(addProduct);
router.route('/:id').patch(modifyProduct);
router.route('/:id').delete(deleteProduct);

module.exports = router;