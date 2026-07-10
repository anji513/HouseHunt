const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty } = require('../controllers/propertyController');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['owner']), upload.array('images', 5), createProperty);
router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.put('/:id', authMiddleware, roleMiddleware(['owner']), updateProperty);
router.delete('/:id', authMiddleware, roleMiddleware(['owner']), deleteProperty);

module.exports = router;
