# Food CRUD API

## Chạy project

1. Mở thư mục này trong VS Code. Dùng Node.js từ 22.12 trở lên.
2. Chạy `npm install` nếu chưa có thư mục `node_modules`.
3. Điền chuỗi kết nối MongoDB Atlas vào `MONGODB_URI` trong `.env`.
   Xem `.env.example` để biết định dạng. Không chia sẻ `.env` chứa mật khẩu.
4. Trong Atlas, tạo database user và thêm IP hiện tại vào Network Access.
5. Chạy `npm start`. Chỉ khi kết nối cơ sở dữ liệu thành công, server mới bắt đầu nghe.

## Kiểm tra với Postman

| Method | URL | Body JSON |
|---|---|---|
| POST | http://localhost:3000/food | {"name":"Cotton Candy","calories":100} |
| GET | http://localhost:3000/foods | Không cần |
| PATCH | http://localhost:3000/food/ID | {"calories":999} |
| DELETE | http://localhost:3000/food/ID | Không cần |

Với POST và PATCH, chọn Body > raw > JSON. Thay ID bằng `_id` nhận từ POST.
POST trả về 201; các yêu cầu thành công còn lại trả về 200.
Dữ liệu không hợp lệ trả về 400; ID hợp lệ nhưng không tìm thấy trả về 404.
Sau khi xóa, gửi GET để xác nhận món ăn không còn trong danh sách.

## Kiểm tra cú pháp

Chạy `npm run check`. Kiểm tra này không xác nhận kết nối Atlas hay hoạt động CRUD trên cơ sở dữ liệu thật.
