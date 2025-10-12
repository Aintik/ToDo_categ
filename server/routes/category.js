const express = require("express");
const router = express.Router();
const Category = require("../model/Categories");

//Get All Categories
router.get("/", async function (req, res, next) {
  try {
    let data = await Category.find({});
    res.json(data).status(200);
  } catch (e) {
    res.json(e).status(400);
  }
});

// GEt names 
router.get("/names", async function (req, res, next) {
  try {
    let data = await Category.find({}, "name");
    res.json(data).status(200);
  } catch (e) {
    res.json(e).status(400);
  }
});

//Add a Category
router.post("/add", async function (req, res, next) {
  try {
    const { name } = await req.body;
    new Category({ name }).save(() => {
      res.json({ message: "Category added" }).status(200);
    });
  } catch (e) {
    res.json(e).status(400);
  }
});

//Get Special Category
router.get("/one/:id", async function (req, res, next) {
  try {
    const data = await Category.findById(req.params.id);
    res.json([data]).status(200);
  } catch (e) {
    res.json(e).status(400);
  }
});

//edit color of categ
router.put("/color/:id", async function (req, res, next) {
  const { color } = req.body;
  try {
    const data = await Category.findByIdAndUpdate(req.params.id, {color});
    res.json([data]).status(200);
  } catch (e) {
    res.json(e).status(400);
  }
});

//Delete a Category
router.get("/delete/:id", async function (req, res, next) {
  try {
    const data = await Category.findByIdAndDelete(req.params.id);
    res.json(data).status(200);
  } catch (e) {
    res.json(e).status(400);
  }
});

//Add List Item
router.post("/list/add/:id", async function (req, res, next) {
  try {
    const { title } = req.body;
    const data = await Category.findByIdAndUpdate(req.params.id, {
      $push: { list: { title } },
    });
    res.json(data).status(200);
  } catch (e) {
    res.json(e).status(400);
  }
});

//Update status List Item
router.post("/status/:itemId/of/:id", async function (req, res, next) {
  const { itemId, id } = req.params;
  const { status } = req.body;
  try {
    Category.findById(id, (err, data1) => {
      let updated = []
      data1.list.map(item => {
        if (item._id == itemId) {
          item.status = status;
        }
        updated.push(item)
      })
      Category.findByIdAndUpdate(
        id,
        { list: updated }
      ).exec((err, data) => res.json(data));
    })
  } catch (e) {
    res.json(e).status(400);
  }
});

//Delete List Item
router.get("/list/delete/:itemId/of/:id", async function (req, res, next) {
  try {
    const { itemId, id } = req.params;
    const data = await Category.findByIdAndUpdate(id, {
      $pull: { list: { _id: itemId } },
    });
    res.json(data).status(200);
  } catch (e) {
    res.json(e).status(400);
  }
});




module.exports = router;