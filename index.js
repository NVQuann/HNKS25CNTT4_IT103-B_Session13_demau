let bookings = [
  {
    bookingCode: "CIN-001",
    customerName: "Nguyễn Văn An",
    movieTitle: "Ánh Trăng Cuối Phố",
    ticketCount: 2,
    pricePerTicket: 90000,
    totalAmount: 194400,
  },
  {
    bookingCode: "CIN-002",
    customerName: "Trần Thị Bình",
    movieTitle: "Biệt Đội Sao Băng",
    ticketCount: 4,
    pricePerTicket: 90000,
    totalAmount: 349920,
  },
  {
    bookingCode: "CIN-003",
    customerName: "Lê Minh Châu",
    movieTitle: "Mùa Hè Rực Lửa",
    ticketCount: 6,
    pricePerTicket: 110000,
    totalAmount: 641520,
  },
];

function validateBookingCode(code) {
  if (!code || code.trim() === "") {
    return "Mã đặt vé không được để trống.";
  }
  if (!code.startsWith("CIN-")) {
    return "Mã đặt vé phải bắt đầu bằng 'CIN-'.";
  }
  return "";
}

function findBookingIndex(code) {
  return bookings.findIndex((booking) => booking.bookingCode === code);
}

function inputPositiveInteger(message) {
  while (true) {
    let input = prompt(message);
    if (input === null) return null;

    input = input.trim();
    let number = Number(input);

    if (input !== "" && Number.isInteger(number) && number > 0) {
      return number;
    }
    console.log(
      "Dữ liệu không hợp lệ. Vui lòng nhập một số nguyên dương (> 0).",
    );
  }
}

function calculateTotal(ticketCount, pricePerTicket) {
  const baseCost = ticketCount * pricePerTicket;
  const serviceFee = baseCost * 0.08;
  let discount = 0;

  if (ticketCount >= 4) {
    discount = (baseCost + serviceFee) * 0.1;
  }

  const totalAmount = baseCost + serviceFee - discount;
  return { baseCost, discount, serviceFee, totalAmount };
}

function displayBookings(list) {
  if (list.length === 0) {
    console.log("Danh sách đơn đặt vé trống.");
    return;
  }
  console.log("--- DANH SÁCH ĐƠN ĐẶT VÉ ---");
  console.table(list);
}

function handleDisplayBookings() {
  displayBookings(bookings);
}

function inputString(message) {
  let input = prompt(message);
  if (input === null) return null;
  return input.trim();
}

function handleAddBooking() {
  console.log("--- THÊM ĐƠN ĐẶT VÉ ---");

  let code = inputString("Nhập mã đặt vé (Ví dụ: CIN-004):");
  if (code === null) return;
  code = code.toUpperCase();

  let errorMsg = validateBookingCode(code);
  if (errorMsg !== "") {
    console.log("Lỗi: " + errorMsg);
    return;
  }

  if (findBookingIndex(code) !== -1) {
    console.log("Lỗi: Mã đặt vé đã tồn tại trong hệ thống.");
    return;
  }

  let customerName = inputString("Nhập tên khách hàng:");
  if (customerName === null) return;
  if (customerName === "") {
    console.log("Lỗi: Tên khách hàng không được để trống.");
    return;
  }

  let movieTitle = inputString("Nhập tên phim:");
  if (movieTitle === null) return;
  if (movieTitle === "") {
    console.log("Lỗi: Tên phim không được để trống.");
    return;
  }

  let ticketCount = inputPositiveInteger("Nhập số lượng vé:");
  if (ticketCount === null) return;

  let pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé (VNĐ):");
  if (pricePerTicket === null) return;

  let costDetails = calculateTotal(ticketCount, pricePerTicket);

  let newBooking = {
    bookingCode: code,
    customerName: customerName,
    movieTitle: movieTitle,
    ticketCount: ticketCount,
    pricePerTicket: pricePerTicket,
    totalAmount: costDetails.totalAmount,
  };

  bookings.push(newBooking);
  console.log("Thêm đơn đặt vé thành công!");
  displayBookings(bookings);
}

function handleUpdateBooking() {
  console.log("--- CẬP NHẬT ĐƠN ĐẶT VÉ ---");

  let code = inputString("Nhập mã đặt vé cần cập nhật:");
  if (code === null) return;
  code = code.toUpperCase();

  let index = findBookingIndex(code);
  if (index === -1) {
    console.log("Lỗi: Không tìm thấy mã đặt vé " + code);
    return;
  }

  let ticketCount = inputPositiveInteger("Nhập số lượng vé mới:");
  if (ticketCount === null) return;

  let pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé mới (VNĐ):");
  if (pricePerTicket === null) return;

  let costDetails = calculateTotal(ticketCount, pricePerTicket);

  bookings[index].ticketCount = ticketCount;
  bookings[index].pricePerTicket = pricePerTicket;
  bookings[index].totalAmount = costDetails.totalAmount;

  console.log("Cập nhật đơn đặt vé thành công!");
  displayBookings(bookings);
}

function handleDeleteBooking() {
  console.log("--- XÓA ĐƠN ĐẶT VÉ ---");

  let code = inputString("Nhập mã đặt vé cần xóa:");
  if (code === null) return;
  code = code.toUpperCase();

  let index = findBookingIndex(code);
  if (index === -1) {
    console.log("Lỗi: Không tìm thấy mã đặt vé " + code);
    return;
  }

  let confirmDelete = prompt(
    "Bạn có chắc chắn muốn xóa đơn đặt vé " + code + "? (Y/N)",
  );
  if (confirmDelete === null) return;

  if (confirmDelete.trim().toUpperCase() === "Y") {
    bookings.splice(index, 1);
    console.log("Xóa đơn đặt vé thành công!");
    displayBookings(bookings);
  } else {
    console.log("Đã hủy thao tác xóa.");
  }
}

function handleSearchBookings() {
  console.log("--- TÌM KIẾM THEO TÊN PHIM ---");

  let keyword = inputString("Nhập tên phim cần tìm kiếm:");
  if (keyword === null) return;

  keyword = keyword.toLowerCase();
  let results = bookings.filter((booking) =>
    booking.movieTitle.toLowerCase().includes(keyword),
  );

  if (results.length > 0) {
    console.log(`Tìm thấy ${results.length} đơn đặt vé phù hợp:`);
    displayBookings(results);
  } else {
    console.log("Không tìm thấy đơn đặt vé nào cho phim này.");
  }
}

function startApp() {
  let isRunning = true;

  while (isRunning) {
    let menuStr = `=====================================================
     HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA
=====================================================
1. Hiển thị danh sách đơn đặt vé
2. Thêm đơn đặt vé mới
3. Cập nhật đơn đặt vé
4. Xóa đơn đặt vé
5. Tìm kiếm đơn đặt vé theo tên phim
0. Thoát chương trình
=====================================================
Vui lòng nhập lựa chọn của bạn (0 - 5):`;

    let choice = prompt(menuStr);

    if (choice === null) {
      console.log("Đã thoát chương trình.");
      isRunning = false;
      break;
    }

    choice = choice.trim();

    switch (choice) {
      case "1":
        handleDisplayBookings();
        break;
      case "2":
        handleAddBooking();
        break;
      case "3":
        handleUpdateBooking();
        break;
      case "4":
        handleDeleteBooking();
        break;
      case "5":
        handleSearchBookings();
        break;
      case "0":
        console.log("Cảm ơn bạn đã sử dụng hệ thống Moonlight Cinema!");
        isRunning = false;
        break;
      default:
        console.log("Lựa chọn không hợp lệ. Vui lòng nhập từ 0 đến 5.");
        break;
    }
  }
}

startApp();
