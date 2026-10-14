const express = require("express");
const Food = require("../models/food");
const router = express.Router();

function handleError(res, error) {
  const badRequest = error.name === "ValidationError" || error.name === "CastError";
  return res.status(badRequest ? 400 : 500).json({
    message: badRequest ? error.message : "Lỗi máy chủ",
  });
}

router.get("/foods", async (req, res) => {
  try {
    return res.json(await Food.find({}));
  } catch (error) {
    return handleError(res, error);
  }
});

router.post("/food", async (req, res) => {
  try {
    const { name, calories } = req.body || {};
    const food = await Food.create({ name, calories });
    return res.status(201).json(food);
  } catch (error) {
    return handleError(res, error);
  }
});

router.patch("/food/:id", async (req, res) => {
  try {
    const updates = {};
    const body = req.body || {};
    if (body.name !== undefined) updates.name = body.name;
    if (body.calories !== undefined) updates.calories = body.calories;
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Cần gửi name hoặc calories để cập nhật" });
    }
    const food = await Food.findByIdAndUpdate(req.params.id, { $set: updates }, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!food) return res.status(404).json({ message: "Không tìm thấy món ăn" });
    return res.json(food);
  } catch (error) {
    return handleError(res, error);
  }
});

router.delete("/food/:id", async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ message: "Không tìm thấy món ăn" });
    return res.json({ message: "Đã xóa món ăn", food });
  } catch (error) {
    return handleError(res, error);
  }
});

module.exports = router;
