# TIẾN ĐỘ – VỀ THĂM TRƯỜNG XƯA (THPT Nguyễn Bỉnh Khiêm, Lý Học, Vĩnh Bảo, Hải Phòng)

Cập nhật: 15/11/2026 khoảng 11h50 (đợt 5 xong; ĐÃ LÊN MẠNG bằng Cloudflare, mật khẩu quản lý đã đặt; chờ sếp thử 2 máy rồi gửi link nhóm lớp)

## TRANG ĐANG CHẠY THẬT (từ 15/11/2026)
- Địa chỉ: https://truong-xua-nbk.hduongmac.workers.dev (trang quản lý: thêm /quan-ly vào cuối; mật khẩu do sếp giữ, quên là không lấy lại được qua trang).
- Kho mã: https://github.com/biayeu/truong-xua-nbk (Public, nhánh main). Cloudflare (tài khoản Hduongmac@gmail.com, Workers & Pages → truong-xua-nbk) TỰ chạy lại mỗi khi có thay đổi trên nhánh main (mất ~1 phút).
- Kiểm tra sau khi lên mạng (15/11): trang chính, /quan-ly, thư viện 3D, logo, máy chủ đều trả lời đúng, không lỗi. CHƯA kiểm: thử viết lưu bút/chat giữa điện thoại và máy tính.
- GitHub đã nối với Claude (15/11, ứng dụng Claude chỉ cài cho kho truong-xua-nbk): từ nay Claude tự đẩy mã lên kho, sếp KHÔNG phải kéo thả nữa. Quy trình mỗi đợt: Claude sửa mã → chạy thử → đẩy lên main → Cloudflare tự cập nhật → Claude mở trang thật kiểm tra lại.
- Thư mục `anh-goc/` (ảnh gốc) CHƯA đưa lên kho vì trang không dùng tới; vẫn còn trong thư mục trên máy sếp.

## Quy ước chung
- Toạ độ: tượng Trạng Trình ở gốc (0,0); +z = hướng bắc (ra đường); +x = hướng tây; đơn vị mét.
- Bố cục dựng theo ảnh vệ tinh Google Earth (chụp 3/2026). Chi tiết nhỏ là minh hoạ.
- Mọi khu vực có tên hiển thị. Chỉ dùng ảnh thật do sếp gửi.

## Nơi để mã
- Trang trên Claude (bản cũ đợt 1, vẫn chạy): https://claude.ai/artifact/5eq6Fxabw3cgYJ5mQ92wtS
- Bản xem thử mới nhất (đợt 2 → 4c, có 3 bạn giả lập, không lưu dữ liệu): https://claude.ai/artifact/Xy14fYshj7NEpHjAq92eSW
  - Bản xem thử có thêm một đoạn "giả lập máy chủ" ngay trong trang; bản thật không có đoạn đó.
  - Trên Claude, nút "Tải về máy" (ảnh chụp chung) không chạy vì Claude chặn tải file; lên Cloudflare thì chạy.
- THƯ MỤC TRÊN MÁY SẾP (từ 14/11, máy Windows): `C:\Users\Admin\Downloads\TRUONG_XUA_NBK\` – trong đó `ma-nguon\` là mã mới nhất, có kèm file zip mới nhất. Claude tự vào lấy, sếp KHÔNG cần gửi zip nữa (chỉ cần app Claude trên máy tính đang mở, và cho phép Claude vào thư mục Downloads khi được hỏi).
- Bản đầy đủ (có máy chủ): zip mới nhất `truong-xua-nbk-dot5.zip` trong thư mục trên → sẽ đưa lên GitHub `biayeu/truong-xua-nbk` → Cloudflare tự cập nhật.
  - `public/index.html` trang 3D · `public/quan-ly.html` trang quản lý · `public/logo.png`, `favicon.png` logo thật · `public/lib/three.min.js` thư viện 3D
  - `src/worker.js` máy chủ · `wrangler.jsonc` cấu hình Cloudflare · `anh-goc/` ảnh sếp gửi (logo, áo khoác đông, đồ thể dục)
- QUAN TRỌNG: Claude không giữ file giữa các chat. Từ 15/11 mã mới nhất nằm ở kho GitHub `biayeu/truong-xua-nbk` (đã nối với Claude): chat mới chỉ cần tải kho về là có đủ, không cần zip. (Zip và thư mục trên máy sếp chỉ còn là bản sao lưu.)

## Đợt 1 (đã xong)
Đi dạo / tham quan theo điểm, chọn nhân vật, ngày–đêm theo giờ thật, bản đồ nhỏ, đi xe đạp, thử chào cờ, đánh trống, 10 kỷ vật, cây phượng lưu bút, ảnh minh hoạ, hàng quán cổng trường.

## Đợt 2 (đã làm xong phần mã, đã chạy thử, ĐÃ LÊN MẠNG 15/11/2026)
Đã chốt: lên mạng qua GitHub biayeu → Cloudflare (miễn phí). Vào trang: Họ tên + Lớp + Niên khóa; máy tự tạo mã bí mật; đổi máy thì nhập họ tên + mã 6 số; tên trùng tự thêm (2), (3). Lưu bút hiện ngay, sếp xoá/chặn ở /quan-ly. Chat: phòng Toàn trường + phòng mỗi niên khóa, giữ 30 ngày.
Đã làm: lưu bút chung (lọc cả trường/khóa/lớp), sổ lớp, thấy nhau online (nhân vật đi trong sân, bong bóng chat), trò chuyện, trang quản lý, chống phá (6 lời nhắn/giờ, 15 tin chat/phút, 40 tên mới/giờ mỗi mạng wifi, lời nhắn 200 chữ, tin chat 300 chữ).

Các bước lên mạng (15/11/2026):
1. XONG – Sếp tạo tài khoản Cloudflare, tạo kho `truong-xua-nbk` (Public) trên GitHub biayeu, nối GitHub với Claude.
2. XONG – Mã đợt 5 đã lên kho (kéo thả từng lượt vì trình duyệt trong app không nhận cả thư mục); Cloudflare nối với kho, chạy lần đầu thành công.
3. XONG – Sếp đặt mật khẩu quản lý ở /quan-ly.
4. CÒN – Thử 2 máy (điện thoại + máy tính) cùng viết lưu bút/chat, rồi gửi link cho nhóm lớp.

## Đợt 3a (đã làm): nhiều lớp học, tìm lớp, nhảy, phố ngoài cổng, Đền Trạng Trình
- Phòng học trên 5 dãy (số phòng đánh từ tầng 1, Dãy nhà chính, gần sân trước). Số phòng mỗi dãy là chia đều theo chiều dài (đoán). TỪ ĐỢT 4c: KHÔNG tự xếp lớp nữa, xem mục Đợt 4c.
- Cửa lớp có biển tên; trong lớp: bảng đen, bàn có tên các bạn cùng lớp cùng khóa; chạm bảng đổi khóa. Nút "Tìm lớp" có bản đồ. Nhảy: phím Space / nút "Nhảy".

## Đợt 3 (14/11/2026 tối, đã làm, đã chạy thử 2 người cùng lúc, có trong bản xem thử)
Sếp chốt: ảnh lớp chờ duyệt, ảnh đại diện hiện ngay; đồng phục hè giữ bản đoán; trống theo lịch phổ biến (đoán); ảnh chụp chung tải về + đăng bảng tin lớp (qua duyệt).
- Nhân vật (nút "Nhân vật" để sửa bất cứ lúc nào): trang phục Tự theo mùa (tháng 11–3 mặc đồ đông) / Hè / Đông / Thể dục; kiểu tóc (nam: ngắn, đầu đinh, rẽ ngôi, mái dài; nữ: xoã dài, đuôi ngựa, ngắn ngang vai, hai bím); giày dép (thể thao trắng, bata, giày da, dép quai hậu, dép tổ ong); màu da 3 mức; phụ kiện (cặp sách, huy hiệu Đoàn, kính, áo mưa cánh dơi, nón lá, mũ cối); có hình xem trước xoay tròn.
- Đồng phục theo ảnh thật: áo khoác đông xanh than, mảng trắng xám trên ngực–vai, sọc chữ V trắng–xanh, khoá kéo, logo ngực trái, quần xanh than, giày trắng; đồ thể dục áo đỏ cổ viền xanh than, 3 sọc chéo vai, quần xanh than sọc đỏ. Đồng phục hè: ĐOÁN (nữ áo dài trắng / nam sơ mi trắng quần xanh).
- Bình chọn đồng phục từng khóa: "Hè: áo dài/sơ mi" và "Đông: áo khoác xanh than / áo len tự do / áo gió xanh". Khóa nào đa số chọn kiểu nào thì nhân vật cả khóa mặc kiểu đó. Chưa ai chọn: khóa tốt nghiệp từ 2019 mặc áo khoác xanh than, khóa cũ hơn mặc áo len tự do (đoán).
- Ảnh đại diện: chọn ảnh trong máy, tự cắt vuông 160×160, hiện tròn cạnh tên trên đầu nhân vật và trong sổ lớp. Sếp xoá được ở /quan-ly (mục Người dùng).
- Vẫy tay 👋: bạn bè gần đó thấy nhân vật mình vẫy và nhận thông báo.
- Chụp ảnh chung 📷: máy ảnh đặt trước mặt, chụp mình + bạn bè đứng gần (12 m), mọi người tự giơ tay tạo dáng; ảnh có viền ghi tên trường, ngày, tên người trong ảnh; "Tải về máy" hoặc "Đăng lên bảng tin lớp" (chờ duyệt).
- Bảng tin lớp: treo trên tường trái trong mỗi lớp, hiện tối đa 4 ảnh đã duyệt; chạm để mở album, gửi ảnh thật kèm ghi chú (tự thu nhỏ ≤1600 px). Mỗi người tối đa 8 ảnh/ngày. Sếp duyệt "Cho hiện"/"Xoá" ở /quan-ly (mục Ảnh chờ duyệt, có số đỏ báo ảnh mới).
- Trống trường theo giờ Việt Nam thật, thứ Hai–thứ Bảy (LỊCH ĐOÁN): sáng vào 7:00, tiết 45 phút, nghỉ 5 phút, ra chơi 15 phút sau tiết 2, tan 11:15; chiều vào 13:30, ra chơi 15:05, tan 17:45. Ai đang mở trang đều nghe cùng lúc. Vào học/tan học 3 hồi, ra chơi 2 hồi, chuyển tiết 1 hồi. Chạm trống để biết lần đánh tiếp theo.
- Logo thật: trên biển cổng trường (2 mặt), màn hình mở đầu, biểu tượng trang.
- Bản đồ nhỏ: trong trường như cũ; ra ngoài thì đi theo mình, vẽ đường trước cổng, sông, cầu Lạng Am, phố bờ bắc, đường Trung Tân, ngõ ra Cầu đá mới, chấm màu các quán (viền trắng = quán thật theo Google Maps; nâu = cà phê/trà sữa, vàng = bia/ốc/nhà hàng, cam = ăn vặt, tím = chè); lên đền thì vẽ quảng trường, hồ bán nguyệt, hồ sen, các nhà đền. Chấm xanh dương = bạn bè đang online.
- Điện thoại: hàng nút trên cùng thành một hàng, vuốt ngang để xem thêm.
- Máy chủ mới thêm: ảnh đại diện, ảnh lớp/ảnh chung (chờ duyệt), bình chọn đồng phục, vẫy tay/tạo dáng; trang quản lý thêm mục Ảnh chờ duyệt, xoá ảnh đại diện, bỏ chặn, đổi mật khẩu.

## Đợt 3d (14/11/2026 khuya, đã làm, đã chạy thử, có trong bản xem thử)
Sếp góp ý: máy quay hơi gần, có chỗ không nhảy qua/lên được, bậc thang không đi lên được, chưa thấy lớp trên hành lang, chưa thấy hàng quán bên ngoài. Sếp chốt: nhân vật "người thật hơn", có chạy.
- Nhân vật dáng người thật: tỉ lệ người, thân thon, vai tròn, đùi–gối–cẳng chân, bắp tay–khuỷu–cẳng tay, cổ, mặt có mắt, lông mày, mũi, miệng, tai; nữ nhỏ hơn một chút. Đồng phục, tóc, phụ kiện giữ như đợt 3.
- Động tác: đi co gối, vung tay; chạy nghiêng người, co tay; đứng thở nhẹ; nhảy co chân; tiếp đất khuỵu gối; đạp xe. Nhân vật quay mặt theo hướng đi, tăng tốc và dừng lại từ từ. Bạn bè online cũng có các động tác này và đứng đúng tầng.
- Chạy: máy tính giữ Shift; điện thoại kéo cần điều khiển ra hết cỡ.
- Nhảy có trọng lực (cao khoảng 0,9 m), giữ đà khi đang chạy. Nhảy lên được bồn cây (0,7 m), ghế đá, bậc sân khấu; đi lên sân khấu bằng bậc; đi qua cầu Lạng Am có dốc hai đầu (trước đây có một khe chặn không đi từ đường lên cầu được, đã sửa).
- Cầu thang và tầng trên: (đợt 3d làm cầu thang ngoài hành lang – TỪ ĐỢT 4c đã chuyển vào TRONG nhà, xem mục Đợt 4c). Đi dọc hành lang các tầng, có lan can chắn không rơi.
- Lớp ở tầng 2, 3: đứng trước cửa lớp ngay trên hành lang tầng đó là có nút "Vào lớp …", ra lớp thì về đúng hành lang tầng đó. "Tìm lớp → Đi tới cửa lớp" đưa lên đúng tầng.
- Máy quay đi theo xa hơn (máy tính ~5,3 m, điện thoại ~6,3 m), mượt, không xuyên tường.
- Nút "Đi tới…": Cổng trường, Cầu thang lên tầng 2 (dãy nhà chính), Cầu thang lên tầng 3 (dãy phía Đông), Quán cổng trường, Phố bờ sông, Đường Trung Tân, Ngõ Cầu đá mới (Sky Tea, quán ốc), Đền Trạng Trình.
- Hàng quán bên ngoài: đi bộ ra cổng, qua cầu Lạng Am là tới (hoặc bấm "Đi tới…"). Lưu ý trang cũ https://claude.ai/artifact/5eq6Fxabw3cgYJ5mQ92wtS (đợt 1) KHÔNG có các phần mới; xem bản https://claude.ai/artifact/Xy14fYshj7NEpHjAq92eSW.

## Đợt 4a (14/11/2026 gần nửa đêm, đã làm, đã chạy thử, có trong bản xem thử): khu Đền Trạng Trình
Sếp chốt: làm cả khu Đền và đoạn Nam Am (Đền trước); trò chơi đủ 4 loại; độ đông người theo dịp thật.
- Dựng LẠI bố cục theo ảnh vệ tinh Google Maps (bản cũ sai): đền chính (Google: 20.66094, 106.53132) đặt ở (x 230, z 1946), quay mặt về hướng ĐÔNG; sân giữa lát đá có lư hương lớn và khói hương; hai dãy nhà hai bên (tên "Tả vu/Hữu vu" là ĐOÁN); nghi môn phía trước; sân gạch đỏ với hồ tròn có cây đa; quảng trường lát đá x 132–221, z 1979–2063 ở phía Đông Bắc; tượng đài đá (Google: 20.66149, 106.53156) ở (207, 2014) nhìn ra hồ bán nguyệt (mép phẳng x 131, bán kính 40 m, cong về phía Đông); đường Trung Tân chạy ngang phía bắc đền (z ~1966) rồi đường làng xuống phía Nam (x ~149); bãi xe – sân hội phía Đông đường làng; nhà mái chóp phía Đông Nam đặt tên "Đền thờ song thân" (tên ĐOÁN); Am Bạch Vân phía Tây (vị trí ĐOÁN); rừng cây phía Tây Nam. Sai số đo trên ảnh khoảng ±5 m.
- Trong đền: ban thờ, tượng thờ, hoành phi "TRÌNH QUỐC CÔNG", nến; người vái lạy.
- Mua hương ở dãy sạp hàng hương – hoa – vàng mã (bãi xe) → vào sân đền "Thắp hương" ở lư hương (khói bốc nhiều lên).
- Trò chơi: ném vòng (5 vòng, trúng được quà), phi tiêu bóng bay (bóng nổ thật, tự gắn lại), câu cá đồ chơi (cá quay vòng), thả diều trên quảng trường (diều của mình có dây, bấm lần nữa để cuốn), ông đồ cho chữ (chọn 11 chữ, ra tờ giấy đỏ có tên mình, tải về – trên Claude nút tải không chạy), kem que, bóng bay.
- Người: người đi lễ đi lại theo lối đi (có người cầm hương, người mặc áo dài, trẻ con, cụ già), người bán hàng, người mua, trẻ con chơi trò, khách ngồi quán. Dáng người đơn giản hơn nhân vật chính để máy yếu chạy được.
- Đông người theo giờ Việt Nam và ÂM LỊCH thật (đã kiểm tra: 17/2/2026 = mùng 1 Tết): ngày thường vừa; cuối tuần khá đông; mùng 1, rằm, 20/11 đông; Tết (mùng 1–10 tháng Giêng), lễ giỗ cụ 27–29/11 âm, sinh nhật cụ 10/4 âm rất đông, có cờ hội, đèn lồng, cờ quanh quảng trường. Tối vắng bớt (quán bia lại đông hơn), khuya rất vắng. Tới đền sẽ có dòng báo "Hôm nay: …".
- Quán làng Trung Am (đường làng, MINH HOẠ): Cà phê Đền Trạng, Chè – trà sữa Cô Ba, Bia hơi Trung Am, Bia hơi Ngã Ba, Trà đá – nước chè chén; mỗi quán có chủ quán sau quầy, kệ hàng, tủ mát, quạt trần, bom bia/két bia, bàn ghế ra vỉa hè, cốc bia có bọt, đĩa lạc, nem, mực, khách ngồi uống, nhân viên bưng khay đi lại. Quán THẬT theo Google Maps: Gà ngon Luân Phượng (ngõ phía Đông, đường ngõ ĐOÁN).
- Nút "Đi tới…" thêm: Sân đền, Quảng trường, Sân hội, Quán làng Trung Am. Tới đền đứng ở đường làng; "Đạp xe về trường" ở đường làng (z 1900).
- Bản đồ nhỏ khi ở đền vẽ theo bố cục mới, chấm màu các quán.

## Đợt 4c (15/11/2026 khoảng 1h sáng, đã làm, đã chạy thử, có trong bản xem thử)
Sếp góp ý: lúc đầu vào trường không đi được; cầu thang cho vào trong nhà; ai đến lớp trước được điền lớp + niên khóa để người cũ tìm đến. Sếp chốt: cầu thang GIỮA dãy; mỗi phòng MỖI KHÓA một lớp; người nhận tự sửa/bỏ trong 24 giờ + sếp sửa ở /quan-ly; BỎ xếp lớp tự động.
- Sửa lỗi lúc đầu không đi được: chế độ "Tham quan" đặt máy quay giữa sông/trên mái; bấm đi là bị kẹt. Nay chuyển sang tự đi thì nhân vật tự đặt xuống chỗ đi được gần nhất (đã thử: đi ngay). Lưu ý: bảng "Mã của bạn" hiện lúc mới vào cũng chặn đi lại cho tới khi bấm "Đóng" (như cũ).
- Cầu thang trong nhà (vị trí ĐOÁN, chưa có ảnh thật): mỗi dãy một ô cầu thang rộng 4,2 m ở GIỮA dãy, cửa mở ra hành lang, biển "CẦU THANG"; hai vế gấp khúc có chiếu nghỉ phía sau (vế bên trái đi vào, vế bên phải quay ra hành lang tầng trên); dãy 3 tầng lặp lại lên tầng 3. Vị trí: Dãy nhà chính x 50,4–54,6; Dãy nhà phía Đông x −35,25…−31,05; Dãy dọc phía Tây z −13,6…−9,4; Dãy dọc phía Đông z −22…−17,8; Nhà góc Đông Bắc x −37,2…−33. Đã thử đi lên được ở cả 5 dãy, cả tầng 3. Nút "Đi tới… Cầu thang" đưa tới cửa ô cầu thang.
- Nhận phòng lớp: mỗi phòng có mã cố định (chữ đầu là dãy: C dãy chính, D dãy phía Đông, T dọc phía Tây, E dọc phía Đông, G góc Đông Bắc; số sau là tầng, ví dụ C1-3). Phòng trống ghi "Phòng N · chưa có lớp nhận". Đứng ở cửa bấm "Nhận phòng N (ghi lớp, niên khóa)" → ghi lớp + chọn niên khóa → biển cửa đổi ngay cho mọi người. Mỗi phòng, mỗi khóa một lớp; mỗi lớp của một khóa chỉ một phòng. Biển cửa hiện lớp của khóa mình (nếu có), không thì lớp khóa khác + "+n khóa". Trong lớp: bảng ghi lớp, khóa, ai nhận phòng; chạm bảng đổi khóa; nút cạnh bảng "Ghi lớp của mình vào phòng này" / "Sửa / bỏ lớp đã ghi" (24 giờ).
- Tìm lớp: có phòng thì chỉ đường + vào lớp; chưa có thì báo "chưa ai nhận phòng" và nút "Tới phòng trống gần nhất".
- Máy chủ: bảng mới rclaims (phòng, khóa, lớp, người nhận, giờ); /api/rooms trả danh sách nhận phòng; /api/rooms/claim, /rooms/edit, /rooms/unclaim; mỗi người tối đa 10 lần nhận phòng/ngày. Trang /quan-ly thêm mục "Phòng học" (sửa lớp, bỏ). Đã chạy thử máy chủ thật trên máy (wrangler): nhận, trùng phòng, trùng lớp, sửa, bỏ, quản lý sửa/bỏ đều đúng.
- Bản xem thử có sẵn 3 phòng đã nhận (12A3, 12A1 khóa 2005–2008 và 10C1 khóa 2010–2013) để xem thử.

## Đợt 4b (15/11/2026 rạng sáng, đã làm, đã chạy thử, có trong bản xem thử): QL37 – Quán Chè Thuế – chợ Nam Am – cầu Nam Am
Sếp chốt: quán tên "Quán Chè Thuế" (các loại chè, nước ngọt, xúc xích, nem chua rán, bánh tráng trộn); đi được cả đoạn; chợ sáng đông chiều vắng (ĐOÁN); có mua quà vặt ở chợ và gọi chè ngồi ăn; KHÔNG dựng nhà thờ.
- Đã kiểm bằng ảnh vệ tinh + ảnh đường phố Google (14/11/2026): cầu trước cổng trường đúng là "Cầu Lạng Am" (giữ tên). QL37 chếch dần xuống phía Nam ~2,5°, phía Bắc đường là kênh có lan can tôn và hàng dừa, phía Nam là dãy nhà ống.
- Toạ độ riêng của đoạn 4b: u = mét dọc QL37 về phía Đông (u = 0 ở x = −140, cách cầu Lạng Am 109 m), s = mét lệch về phía Nam so với tim đường; cả đoạn xoay 2,5°. Đường vẽ tới u = 640 (có biển "Đoạn sau chưa dựng" + nút đạp xe về trường).
- Vị trí theo ảnh (sai số ±5–10 m): Karaoke Tuấn Diệp u 75; đường xuống chợ u 176; Nhà thuốc Lan Trường u 222; Xe máy điện Mai Hưng u 248, Xôi Gấc Kids u 256 (theo ảnh đường phố); Mỹ phẩm Đặng Thanh Tâm u 264; Quán Chè Thuế u 268,5; khu cục thuế cũ u 272–291 (rào song sắt, cổng xanh, nhà vàng 1 tầng lùi vào trong, 2 cây bàng trước cửa – theo ảnh đường phố; "cục thuế cũ" là theo lời sếp, chưa kiểm được trên mạng); ngõ vào chợ u 292 (ĐOÁN); Trung tâm thương mại Nam Am (bãi đất trống) u 346; Trung tâm GDNN–GDTX Vĩnh Bảo u 404 (hình nhà ĐOÁN); cầu Nam Am u 550; Bưu điện Nam Am u 564; Thành Vũ Mobile u 586. Bờ Bắc kênh: Mì cay Naga u 303, Chè Nhớ Café u 561 (chân cầu).
- Chợ Nam Am: cách mặt đường ~90 m, lán chính mái tôn xám 44 × 17 m (u 273–317, s 96–113), dãy ki-ốt mái đỏ dọc đường ngõ trước chợ (quần áo, giày dép, tạp hoá…), cổng "CHỢ NAM AM". Trong lán: sạp rau, hoa quả, thịt, cá, đồ khô, bún – bánh đa, có người bán ngồi. Hàng ngồi đất bán được: bánh rán, kẹo bông (cầm trên tay 1 phút), bánh đa – kẹo lạc, ổi – cóc. Đông theo giờ: 5–9h rất đông, 9–11h còn đông, trưa – chiều vắng, sau 18h30 chợ nghỉ (ĐOÁN).
- Quán Chè Thuế: tủ kính bày chè, bếp nướng xúc xích, cô chủ đứng quầy, bàn nhựa thấp + ghế đẩu dưới gốc bàng, học sinh áo trắng ngồi ăn. Bấm "Gọi món" → chọn 1 trong 8 món → món ra bàn, nhân vật ngồi xuống ghế (đi tiếp là tự đứng dậy).
- Cầu Nam Am: cầu bê tông thấp, lan can sơn xanh – trắng, khung đèn có quả cầu ở đầu phía Bắc (theo ảnh đường phố). Đi lên cầu được.
- Xe máy chạy hai chiều trên QL37 (minh hoạ). Nút "Đi tới…" thêm: Quán Chè Thuế, Chợ Nam Am, Cầu Nam Am. Bản đồ nhỏ vẽ đường cong, kênh, chợ, cầu, chấm quán (viền trắng = quán thật).
- Máy yếu: đoạn này chia 5 khúc, chỉ hiện khúc gần mình (đã đo: số lệnh vẽ ở cổng trường gần như không đổi so với bản 4a).

## Đợt 5 (15/11/2026 trưa, đã làm, đã chạy thử máy tính + điện thoại trên máy chủ thật chạy thử)
Sếp yêu cầu giao diện KHÁC trang THPT Vĩnh Bảo (thpt-vinh-bao.tranngocson8296.workers.dev: thẻ kem bo tròn, chữ đỏ sẫm, hàng nút ngang trên cùng, bản đồ nhỏ góc phải trên). Sếp chốt: phong cách "Bảng đen – phấn trắng", đổi cả bố cục.
- Màu và chữ: bảng xanh lớp học có vệt phấn mờ, khung gỗ nâu, chữ phấn trắng, nhấn phấn vàng; tiêu đề chữ viết tay Mali; nút vuông góc (không bo tròn), nút chính màu phấn vàng.
- Màn hình mở đầu: tấm bảng đen khung gỗ có máng phấn, góc phải ghi "Thứ…, ngày … tháng … năm …" theo giờ Việt Nam như cô giáo ghi bảng, logo, tên trường gạch chân phấn vàng, mấy viên phấn.
- Máy tính: các nút dồn thành CỘT DỌC bên trái ("Bảng điều khiển"), bản đồ nhỏ khung gỗ ở GÓC TRÁI DƯỚI; bảng tham quan và gợi ý ở giữa phía dưới (lệch phải tránh cột nút).
- Điện thoại (rộng ≤ 700 px): nút thành THANH DƯỚI ĐÁY (vuốt ngang), "Tham quan / Tự đi dạo" ở giữa phía trên thanh; bản đồ nhỏ góc trái trên; gợi ý ở góc phải trên; nút hành động và "Nhảy" đẩy lên trên thanh.
- Mọi bảng (lưu bút, chat, sổ lớp, nhân vật, tìm lớp, nhận phòng, đi tới, ảnh…) thành bảng đen khung gỗ; ảnh trong bảng tin lớp kiểu ảnh rửa viền trắng, hơi nghiêng.
- Sửa lỗi: đứng ở cổng trường (và ngoài trường) máy quay dí sát gáy nhân vật vì mép sông/đường bị coi là tường. Nay ngoài trường máy quay chỉ bị nhà cửa chặn → lùi đủ xa như trong trường.
- Trang quản lý /quan-ly giữ giao diện cũ (chỉ sếp dùng).
- Bản xem thử trên Claude (Xy14…) CHƯA đổi giao diện mới (bản đó có máy chủ giả lập riêng); xem giao diện mới khi lên Cloudflare.

## Ngoài trường (theo Google Maps/ảnh vệ tinh xem ngày 14/11/2026)
- Phía bắc trường: đường, sông, cầu Lạng Am; bên kia cầu là đường Trung Tân chạy thẳng lên phía bắc tới Đền Trạng Trình.
- Đền Trạng Trình: toạ độ Google 20.6609424, 106.531321, cách trường ~1,9 km về phía bắc. Từ đợt 4a đặt ở (x 230, z 1946), xem mục Đợt 4a. Đến bằng nút "Đạp xe lên Đền Trạng Trình".
- Quán thật theo Google Maps (vị trí gần đúng ±15–20 m): Hong Kong Cảng, Vy Coffe, Tiệm Cà Phê Mori, Nhà hàng Hương Biển (hải sản, đường Trung Tân ~150 m sau cầu), Mì Cay Seoul City One (bờ bắc sông), Sky Tea Coffee và Quán ốc Xanh Xẹo (địa chỉ "Cầu đá mới, thôn 1, Lạng Am", phía đông đường Trung Tân). Con ngõ rẽ đông ra Cầu đá mới là ĐOÁN đường; trên Google Maps quán ốc còn xa hơn về phía bắc khoảng 90 m.
- Quán bia gần trường trên Google Maps (Bia hơi Điệu Trang, Bia Tươi Sài Gòn ở làng Tiền Am) cách ~2 km nên chưa đặt.
- Minh hoạ (không có trên Google Maps): cổng trường – quán chè, ăn vặt, xe xiên nướng, xe bánh mì que; đường Trung Tân – Bia hơi Trung Tân, quán chè, xe ăn vặt xiên nướng; bờ bắc sông – Bia hơi bờ sông, Trà sữa, Bánh mì que, Ăn vặt, Quán chè.
- Vùng đi được ngoài trường: đường trước cổng (x −140…200, từ x −140 về phía Đông là đoạn 4b), cầu Lạng Am, đường bờ bắc sông, đường Trung Tân đến z 230, ngõ ra Cầu đá mới (x −108…−31, z 195…205), khu đền.

## Còn lại (chưa làm)
- Đoạn QL37 sau cầu Nam Am (chưa dựng), đường lên phía Bắc từ cầu Nam Am mới vẽ 60 m.
- Đưa lên Cloudflare (đợt 2 bước 1–4 ở trên).
- Khắc tên lên bàn lớp mình (hiện bàn đã có tên tự động).
- Xem Street View để sửa hình dáng đền, cổng trường, dãy phố, con ngõ ra Cầu đá mới.
- Kiểu cầu thang thật của từng dãy (sếp gửi ảnh cầu thang thì sửa cho đúng; hiện ở giữa dãy, trong nhà).

## Việc còn đoán (cần kiểm tra thêm)
- Đợt 4b: giờ họp chợ Nam Am, ngõ vào chợ, hàng hoá trong chợ, hình nhà Trung tâm GDNN–GDTX, "cục thuế cũ" (theo lời sếp), quán minh hoạ dọc QL37.
- Đồng phục hè, đồng phục các khóa cũ (có bình chọn).
- Giờ trống trường (đang dùng lịch phổ biến).
- Số phòng mỗi dãy, vị trí từng lớp, vị trí cầu thang.
- Các chi tiết nhỏ ghi "minh hoạ" (hàng quán minh hoạ, nội thất lớp).
- Khu đền: tên các nhà phụ, Am Bạch Vân, nội thất đền, vị trí hàng hương và trò chơi (thực tế bán ở đâu).

## Đợt 6 (15/11/2026, đã làm, đã chạy thử trên máy thử)
- Đi học bằng gì: chọn khi vào (xe đạp, xe đạp điện, xe máy, đi bộ, đưa đón); nhà xe có bảng "Đi học bằng gì?", bấm E xem thống kê theo khóa. Xe đạp điện có đèn pha, xe máy dựng mô hình mới.
- Hẹn giờ gặp nhau: nút "Hẹn gặp"; đặt tên, giờ, phòng khóa; tối đa 3 hẹn đang chờ mỗi người, 6 hẹn mỗi ngày. Tới giờ máy chủ báo tất cả người đang online + tiếng trống (báo nếu trễ dưới 10 phút). Hẹn quá 7 ngày tự xoá.
- Phượng nở / ve kêu theo THÁNG THẬT: phượng nở rộ tháng 6, thưa tháng 5/7/4/8, trụi các tháng khác (tháng 11 là trụi). Nút "Phượng: …" để xem tháng khác; thêm ?thang=6 sau địa chỉ để thử.
- Tiếng trống tổng hợp tốt hơn (nhiều lớp, vang). Muốn trống thật: sếp thu ~10 giây trống trường thật, đặt tên trong thư mục public là trong.mp3 (trang tự dùng nếu có).
- Sổ vàng trước cổng (bảng xanh ở x -2,2, z 13,8): danh sách mọi người đã vào, ai cũng ký tên bằng chuột/ngón tay (ảnh PNG ≤ 40KB, 12 lần ký/ngày). /quan-ly: xoá chữ ký, xoá lịch hẹn.
- Máy chủ mới: /api/vehicles, /api/meets, /api/book, /api/sig (bảng meets, sigs).

## Đợt 7 (15/11/2026, theo lời sếp, TẤT CẢ là minh hoạ, vị trí đoán)
- Quán bia hơi trên bãi cỏ trái cổng (ngoài mép tường trường): x -81…-71, z 12,8–16,2. Đi được vào trong. Nút "Đi tới… Quán bia hơi".
- Cafe Mori chuyển ra ngõ Cầu đá mới (bỏ chỗ cũ ở đường Trung Tân z 160): bên ngõ, gần x -62.
- Dãy quán net bên phải trường (nhà dân ngày xưa): x 93–127, z 6–15,6, 3 quán "Net Hoàng Long", "Net 24h Vui Vẻ", "Net Cầu Vồng" xen 3 nhà dân. "Đi tới… Dãy quán net".
- Quán net đầu cầu cũ: đặt ở bờ bắc sông, x ≈ -18, z ≈ 85. CÒN HỎI SẾP: "cầu Lý Học cũ" là cầu nào (trong trang mới có cầu Lạng Am trước cổng và cầu Nam Am); sếp chỉ chỗ thì em dời.
# ĐỢT 10 (15/11/2026 chiều) – đọc kèm TIEN_DO_TRUONG_XUA.md, TIEN_DO_DOT8.md, TIEN_DO_DOT9.md

## Sửa lỗi
- Quán net bờ bắc (x 275, z 79) không vào được: có khe hở 0,3 m giữa vỉa hè và nền quán (vùng đi được không nối nhau). Đã nối (vùng x 266–284, z 63–79,6). Đã thử đi xe vào được.
- Xuống xe để ngồi quán (bàn ghế) thì ra quán MẤT xe: nay nhớ trạng thái, đứng dậy đi ra khỏi quán là tự "Lên xe". Nếu sếp tự bấm "Xuống xe" trước thì không tự lên lại.
- Điện thoại không nghe nhạc: iPhone tắt tiếng Web Audio khi gạt nút im lặng; thêm thẻ audio rỗng chạy ngầm sau lần chạm đầu tiên, tự mở lại âm thanh khi quay lại trang. CHƯA thử trên điện thoại thật.

## Âm thanh sống (tự tạo bằng máy, không dùng bản ghi có bản quyền; em không tải được file từ mạng về)
- Ngoài đường: tiếng xe máy chạy qua, còi.
- Sân trường: học sinh nói chuyện, hò hét; đông vào giờ học (T2–T7 7:00–11:15, 13:30–17:45), vắng chủ nhật/ngoài giờ.
- Quán bia: tiếng nhiều người, "dô" đồng thanh, chạm ly, nhạc sàn dập.
- Quán cà phê/bánh mì: nói chuyện nhỏ, thìa chạm cốc, nhạc lofi.
- Quán net: gõ phím, hò hét gọi nhau, nhạc game 8-bit.
- Câu nói tiếng Việt (nạp tiền, dô, gọi món…) đọc bằng giọng tiếng Việt có sẵn trong trình duyệt; máy nào không có giọng Việt thì chỉ nghe tiếng nền.
- Ra gần quán thì nghe nhỏ dần, vào trong quán nghe rõ, nhạc nền nhẹ tự hạ.
- Muốn tiếng THẬT: bỏ file duong.mp3, san.mp3, bia.mp3, cafe.mp3, net.mp3 vào thư mục public/am/ (tự dùng, tiếng máy tạo giảm còn 12%). Cần file tự thu hoặc miễn phí bản quyền.
- Hàm thử nghiệm: window.__zone(), window.__dbg(), window.__setRide(v).

## Đợt 10 v2 (âm thanh thật + người đi đường)
- Bỏ âm thanh tổng hợp (giả). Dùng 23 đoạn ghi âm thật Freesound CC0 (đường phố, sân trường học sinh, quán bia, cafe, quán net, ve), Worker phát qua /am/<mã>.mp3 (cache 30 ngày). Danh sách mã trong src/worker.js (AM). Đã kiểm trên web thật: cả 23 đoạn trả 200 và giải mã được.
- Vùng âm thanh: lop/cao/bia/net/cafe/den/san/duong, hàm window.__zone(). Ve theo tháng/giờ. Giọng đọc tiếng Việt chỉ khi trình duyệt có.
- Người đi đường: kid .8, nữ .96; chân tự nâng theo mặt cầu (groundAt).
- Chưa kiểm: độ to nhỏ thật bằng tai, chạy trên điện thoại.

## Đợt 12 (nhánh lua-trai, chưa gộp main)
- Lửa trại sân trường 17h30–22h30, 12 cụm trại/6 kiểu (ai đến trước nhận trước, 15 phút không hoạt động thì nhả), chọn nhạc MV chính thức; xích mích học sinh chỉ ban ngày (6h30–17h30).
- Nhà nước (nước uống sạch) ở (36.5,-27); nhà vệ sinh Đông (49,-27), Tây (-43,-27) — vị trí đoán theo chỗ sếp đứng trong ảnh, chưa kiểm ảnh vệ tinh.
- Dãy phòng thầy cô (HT, PHT, văn thư, kế toán, họp chung, nghỉ GV, giám thị) x -62..-36, z -58; dãy chức năng (y tế, Đoàn Đội, kho thể dục, căng tin) x -35..-20; thư viện + truyền thống (-38, 9.8) sau hàng quán cổng. Tất cả là MINH HOẠ (đoán), nhìn qua cửa kính, chưa đi vào trong.
- Sân vận động phía sau: sọc cỏ, vạch sân, đường chạy 4 làn, hố nhảy xa, khán đài, cờ, đèn sân, bảng điểm, lều, vận động viên chạy.

## Đợt 12b (nhánh xem-thu = den-dep-hon + lua-trai + bệnh viện; CHƯA gộp main)
- Bệnh viện Đa khoa Nam Am: đo trên ảnh vệ tinh Google Maps 15/11/2026 thì nằm phía NAM QL37 ở u≈640 (không phải u 671 như DOT11 tính từ toạ độ; lệch ~30 m). Toà chữ U mái ngói đỏ, sân trước có cây theo ảnh vệ tinh; cổng, biển, xe cấp cứu, chòi bảo vệ, nhà để xe là MINH HOẠ. Chưa có ảnh đường phố/ảnh cổng thật.
- Đường QL37 + kênh + bờ bắc dựng tiếp từ u 640 tới u 718 (rào chắn "Đoạn sau chưa dựng" dời tới u 718).
- 2 quán cạnh cổng (MINH HOẠ): "Quán nước Cổng Viện" (u 619) và "Cháo – bún Cổng Viện" (u 666), vào trong được, gọi món, có nhóm chat (máy chủ cho phép quan-vien1, quan-vien2).
- Nút "Đi tới… Bệnh viện Đa khoa Nam Am (cổng)"; bản đồ nhỏ có nhãn.
- Đã chạy thử máy (Chrome không đầu, giờ trưa): không lỗi script; va chạm cổng/tường rào/toà nhà/cây đúng. CHƯA thử trên điện thoại, CHƯA thử trên mạng thật.

## Đợt 16 (17/11/2026 khuya) – sửa bấm ảnh đại diện
- Lỗi: trong khung Chat ảnh tròn nằm ngoài chỗ bấm được (chỉ tên bấm được, và chỉ Admin); người thường bấm ảnh không có gì xảy ra.
- Sửa: bấm ảnh đại diện ở BẤT KỲ đâu (chat, tin riêng, sổ lớp, xếp hạng) → hiện ảnh to + tên. Admin bấm ảnh nhỏ → mở hồ sơ như cũ. Bấm ra ngoài để đóng.
- Đã chạy thử trên máy thử (mở được, đóng được, không lỗi). CHƯA kiểm trên trang thật. Bấm vào cái đầu nhân vật 3D để xem ảnh: chưa làm.
- Sửa lỗi MẤT NÚT ADMIN khi tải lại (17/11 23h30): trước đây máy chủ trả "không" (kể cả vì chặn quá 20 lượt kiểm/phút cho CẢ trang) là trang xoá mật khẩu đã nhớ → lần sau mất nút. Nay: chỉ xoá khi sếp tự gõ sai; tự kiểm lại tối đa 3 lần; máy đã từng vào Admin (hoặc mở link có #admin) thì nút LUÔN hiện, kể cả sau khi Thoát Admin. Máy chủ giới hạn kiểm theo từng người và trả "bận" thay vì "sai".
