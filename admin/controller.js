function renderPhoneList(phoneArr) {
  var contentHTML = "";
  for (var i = 0; i < phoneArr.length; i++) {
    var phone = phoneArr[i];
    var trString = `<tr>
                            <td>${phone.id}</td>
                            <td>${phone.name}</td>
                            <td>${phone.price}</td>
                            <td>${phone.screen}</td>
                            <td>${phone.backCamera}</td>
                            <td>${phone.frontCamera}</td>
                            <td>${phone.img}</td>
                            <td>${phone.desc}</td>
                            <td>${phone.brand}</td>
                            <td>
                                <button onclick='deletePhone(${phone.id})' class="btn btn-danger">Xóa</button>
                                <button data-bs-toggle="modal"
                                data-bs-target="#myModal" onclick='editPhone(${phone.id})' class="btn btn-warning">Sửa</button>
                            </td>
                        </tr>`;
    contentHTML += trString;
  }
  document.getElementById("tablePhone").innerHTML = contentHTML;
}

function getDataForm() {
  var ten = document.getElementById("phoneName").value;
  var gia = document.getElementById("price").value;
  var manHinh = document.getElementById("screen").value;
  var camSau = document.getElementById("backCamera").value;
  var camTruoc = document.getElementById("frontCamera").value;
  var hinhAnh = document.getElementById("image").value;
  var moTa = document.getElementById("desc").value;
  var thuongHieu = document.getElementById("brand").value;
  return {
    name: ten,
    price: gia,
    screen: manHinh,
    backCamera: camSau,
    frontCamera: camTruoc,
    img: hinhAnh,
    desc: moTa,
    brand: thuongHieu,
  };
}
