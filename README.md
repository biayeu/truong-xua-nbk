# Về thăm trường xưa – THPT Nguyễn Bỉnh Khiêm (Vĩnh Bảo, Hải Phòng)

Trang 3D đi dạo trong trường cũ: lưu bút chung, sổ lớp theo niên khóa, thấy bạn bè online, trò chuyện,
nhân vật tự chọn (đồng phục theo ảnh thật, tóc, giày dép, phụ kiện, ảnh đại diện), vẫy tay, chụp ảnh chung,
bảng tin lớp (ảnh thật, người lập trang duyệt), trống trường theo giờ thật, phố và quán quanh trường, Đền Trạng Trình.

- `public/` – trang web (index.html), trang quản lý (quan-ly.html), logo, thư viện 3D (three.js r128, giấy phép MIT)
- `src/worker.js` – máy chủ chạy trên Cloudflare (lưu bút, sổ lớp, online, chat, ảnh, bình chọn đồng phục)
- `anh-goc/` – ảnh thật sếp gửi (logo, áo khoác mùa đông, đồ thể dục)

Cloudflare tự đưa lên mỗi khi có thay đổi trên GitHub (lệnh: `npx wrangler deploy`).
