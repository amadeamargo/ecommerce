const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Endpoint: /api/tags 
router.get('/', (req, res) => {
  Tag.findAll ({
    include: [
      { model: Product,
      through: ProductTag}
    ]
  })
  .then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(400).json(err))

});

router.get('/:id', (req, res) => {
  Tag.findByPk ((req.params.id),{
    include: {model: Product}
  },
  ).then((tagData=> {
    res.json(tagData);
}))
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
    res.json(err)
  })
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if(!tagData) {
      res.status(404).json({message: `No tag found for this id`})
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status (500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if(!tagData) {
      res.status(404).json({message: `No tag found for this id`})
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status (500).json(err);
  }
});

module.exports = router;
