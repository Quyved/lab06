const express = require("express");
const mongoose = require("mongoose");
const foodRouter = require("./routes/foodRoutes");

const app = express();
app.use(express.json());
app.get("/", (req, res) => res.json({ message: "Food CRUD API", list: "/foods" }));
app.use(foodRouter);
app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Body phải là JSON hợp lệ" });
  }
  return res.status(error.status || 500).json({ message: "Không thể xử lý yêu cầu" });
});

async function start() {
  try {
    if (!process.env.MONGODB_URI) throw new Error("Hãy điền MONGODB_URI trong file .env");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Đã kết nối MongoDB Atlas");
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server chạy tại http://localhost:${port}`));
  } catch (error) {
    console.error("Không thể khởi động:", error.message);
    process.exit(1);
  }
}

start();
