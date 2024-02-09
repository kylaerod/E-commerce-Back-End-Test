const router = require('express').Router();
const { Category, Product} = require('../../models');

// The `/api/categories` endpoint

  // find all categories
  // be sure to include its associated Products
  router.get('/categories', async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve categories' });
    }
  });
  

  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/categories/:id', async (req, res) => {
    try {
      const category = await Category.findOne({
        where: { id: req.params.id },
        include: [{ model: Product }]
      });
  
      if (!category) {
        res.status(404).json({ error: 'Category not found' });
      } else {
        res.json(category);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve category' });
    }
});

  // create a new category
  router.post('/categories', async (req, res) => {
    try {
      const newCategory = await Category.create(req.body);
      res.status(201).json(newCategory);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create category' });
    }
  });

  router.put('/categories/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (updatedCategory[0] === 0) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.json({ message: 'Category updated successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update category' });
  }

});

router.delete('/categories/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedCategory) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.json({ message: 'Category deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

  Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
  });
module.exports = router;
