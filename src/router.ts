import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from './modules/middleware'
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct
} from './handlers/product'
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate
} from './handlers/update'

const router = Router()

router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.delete('/product/:id', deleteProduct)
router.post('/product', body('name').isString(), handleInputErrors, createProduct)
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)

router.get('/update/product/:productId', getUpdates)
router.get('/update/:id', getOneUpdate)
router.delete('/update/:id', deleteUpdate)
router.post(
  '/update/:productId',
  body('productId').exists().isString(),
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'PENDING']),
  body('version').optional(),
  createUpdate
)
router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('version').optional(),
  updateUpdate
)

router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.delete('/updatepoint/:id', () => {})
router.post(
  '/updatepoint',
  body('name').optional().isString(),
  body('description').optional().isString(),
  body('updateId').exists().isString(),
  () => {}
)
router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  () => {}
)

router.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({ message: 'unauthorized' })
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'invalid input' })
  } else {
    res.status(500).json({ message: "ooops it's on us" })
  }

  console.error(err)
})

export default router
