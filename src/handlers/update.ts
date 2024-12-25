import prisma from '../db'

// Get all
export const getUpdates = async (req, res) => {
  const productId = req.params.productId
  const userId = req.user.id

  const updates = await prisma.update.findMany({
    where: {
      product: {
        id: productId,
        belongsToId: userId
      }
    }
  })

  res.json({ data: updates })
}

// Get one
export const getOneUpdate = async (req, res) => {
  const updateId = req.params.id
  const userId = req.user.id

  console.log(updateId)

  const update = await prisma.update.findFirst({
    where: {
      id: updateId,
      product: {
        belongsToId: userId
      }
    }
  })

  console.log(update)

  res.json({ data: update })
}

// Create
export const createUpdate = async (req, res) => {
  const update = await prisma.update.create({
    data: {
      productId: req.body.productId,
      title: req.body.title,
      body: req.body.body,
      version: req.body.version
    }
  })

  console.log(update)

  res.json({ data: update })
}

// Update
export const updateUpdate = async (req, res) => {
  const updateId = req.params.id

  const update = await prisma.update.update({
    where: {
      id: updateId
    },
    data: {
      title: req.body.title,
      body: req.body.body,
      version: req.body.version
    }
  })

  res.json({ data: update })
}

//Delete
export const deleteUpdate = async (req, res) => {
  const updateId = req.params.id

  const deleted = await prisma.update.delete({
    where: {
      id: updateId
    }
  })

  res.json({ data: deleted })
}
