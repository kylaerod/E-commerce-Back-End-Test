const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve tags' });
  }
});

// get one tag
router.get('/tags/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });
    if (!tag) {
      res.status(404).json({ error: 'Tag not found' });
    } else {
      res.json(tag);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve tag' });
  }
});

// create a new tag
router.post('/tags', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create tag' });
  }
});

// update a tag
router.put('/tags/:id', async (req, res) => {
  try {
    const [numAffectedRows] = await Tag.update(req.body, {
      where: { id: req.params.id }
    });
    if (numAffectedRows === 0) {
      res.status(404).json({ error: 'Tag not found' });
    } else {
      res.json({ message: 'Tag updated successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update tag' });
  }
});

// delete a tag
router.delete('/tags/:id', async (req, res) => {
  try {
    const numDeletedRows = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (numDeletedRows === 0) {
      res.status(404).json({ error: 'Tag not found' });
    } else {
      res.json({ message: 'Tag deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

module.exports = router;
