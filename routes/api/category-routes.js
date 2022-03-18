const router = require('express').Router();
const { Category, Product } = require('../../models');

// Endpoint: `/api/categories` 

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  })
  .then((categoryData) => {
    res.json(categoryData)
  })

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk((req.params.id), 
  {
    include: [{model:Product}]
  })
  .then((categoryData) => {
    res.json(categoryData)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCategory) => {
    res.json(newCategory)
  })
  .catch((err) => {
    res.json(err)
  })
});

router.put('/:id', async(req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if(!categoryData) {
      res.status(404).json({message: `No category found for this id`})
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status (500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if(!categoryData) {
      res.status(404).json({message: `No category found for this id`})
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status (500).json(err);
  }
});

module.exports = router;
