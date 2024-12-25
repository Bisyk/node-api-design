import prisma from '../db'

// Get all
export const getProducts = async (req, res) => {
  const products = await prisma.product.findMany({ where: { belongsToId: req.user.id } })

  res.json({ data: products })
}

// Get single
export const getOneProduct = async (req, res) => {
  const id = req.params.id

  const product = await prisma.product.findUnique({ where: { id, belongsToId: req.user.id } })

  res.json({ data: product })
}

// Create
export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id
      }
    })

    res.json({ data: product })
  } catch (error) {
    next(error)
  }
}

// Update
export const updateProduct = async (req, res) => {
  const id = req.params.id

  const updated = await prisma.product.update({
    where: {
      id
    },
    data: {
      name: req.body.name
    }
  })

  res.json({ data: updated })
}

// Delete
export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id

    const deleted = await prisma.product.delete({
      where: {
        id,
        belongsToId: req.user.id
      }
    })
    res.json({ data: deleted })
  } catch (error) {
    next(error)
  }
}
