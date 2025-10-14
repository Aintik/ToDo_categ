const express = require("express");
const router = express.Router();
const Category = require("../model/Categories");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;

//AUTH
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
}

//Get All Categories
router.get("/", auth, async function (req, res, next) {
  try {
    let data = await Category.find({ userId: req.user.id });
    res.json(data).status(200);
  } catch (e) {
    res.json(e).status(400);
  }
});

// GEt names
router.get("/names", auth, async function (req, res, next) {
  try {
    let data = await Category.find({ userId: req.user.id }, "name");
    res.json(data).status(200);
  } catch (e) {
    res.json(e).status(400);
  }
});

//Add a Category
router.post("/add", auth, async function (req, res, next) {
  try {
    const { name } = await req.body;
    new Category({ name, userId: req.user.id }).save(() => {
      res.json({ message: "Category added" }).status(200);
    });
  } catch (e) {
    res.json(e).status(400);
  }
});

//Get Special Category
router.get("/one/:id", auth, async function (req, res, next) {
  try {
    const data = await Category.findOne({
      _id: req.params.id,
      userid: req.user.id,
    });
    res.json([data]).status(200);
  } catch (e) {
    res.json(e).status(400);
  }
});

//edit color of categ
router.put("/color/:id", auth, async function (req, res, next) {
  const { color } = req.body;
  try {
    const data = await Category.findOneAndUpdate(
      {
        _id: req.params.id,
        userid: req.user.id, // Verify ownership
      },
      { color },
      { new: true } // Return updated document
    );
    res.json([data]).status(200);
  } catch (e) {
    res.json(e).status(400);
  }
});

//Delete a Category
router.get("/delete/:id", auth, async function (req, res, next) {
  try {
    const data = await Category.findOneAndDelete({
      _id: req.params.id,
      userid: req.user.id, // Verify ownership
    });
    res.json(data).status(200);
  } catch (e) {
    res.json(e).status(400);
  }
});

//Add List Item
router.post("/list/add/:id", auth, async function (req, res, next) {
  try {
    const { title } = req.body;
    const data = await Category.findOneAndUpdate(
      {
        _id: req.params.id,
        userid: req.user.id, // Verify ownership
      },
      {
        $push: { list: { title } },
      },
      {
        new: true, // Return updated document
      }
    );
    res.json(data).status(200);
  } catch (e) {
    res.json(e).status(400);
  }
});

//Update status List Item
router.post("/status/:itemId/of/:id", auth, async function (req, res, next) {
  const { itemId, id } = req.params;
  const { status } = req.body;
  try {
    const data = await Category.findOneAndUpdate(
      {
        _id: id,
        userid: req.user.id,
        "list._id": itemId,
      },
      {
        $set: { "list.$.status": status },
      },
      { new: true }
    );
    res.json(data).status(200);
  } catch (e) {
    res.json(e).status(400);
  }
});

//Delete List Item
router.delete("/list/delete/:itemId/of/:id", auth, async function (req, res, next) {
  try {
    const { itemId, id } = req.params;
    const data = await Category.findOneAndUpdate(
      {
        _id: id,
        userid: req.user.id, // Verify ownership
      },
      {
        $pull: { list: { _id: itemId } },
      },
      {
        new: true, // Return updated document after deletion
      }
    );
    res.json(data).status(200);
  } catch (e) {
    res.json(e).status(400);
  }
});

module.exports = router;
