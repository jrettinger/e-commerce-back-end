const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        as: "tagged_products",
      },
    ],
  })
    .then((result) => {
      if (!result) {
        res.status(404).json({ succes: false, message: "No Tags found" });
      } else {
        res.json(result);
      }
    })
    .catch((error) => res.status(500).json(error));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        as: "tagged_products",
      },
    ],
  })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "No Tags found with the provided ID",
        });
      } else {
        res.json(result);
      }
    })
    .catch((error) => res.status(500).json(error));
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((result) => {
      if (!result) {
        res.json({ success: false, message: "Error while creating tag" });
      } else {
        res.json({ success: true, message: "Successfully Created" });
      }
    })
    .catch((error) => res.status(500).json(error));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "No tag found with the provided ID",
        });
      } else {
        res.json(result);
      }
    })
    .catch((error) => res.status(500).json(error));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      if (!result) {
        res
          .status(404)
          .json({
            success: false,
            message: "No Tag found with the provided ID",
          });
      } else {
        res.json({ succes: true, message: "Successfully Deleted" });
      }
    })
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
