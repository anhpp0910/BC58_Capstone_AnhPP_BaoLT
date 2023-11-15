function renderPhoneList(phoneArr) {
  var contentHTML = "";
  for (var i = 0; i < phoneArr.length; i++) {
    var phone = phoneArr[i];
    var trString = `<tr>
                            <td>${phone.id}</td>
                            <td>${phone.name}</td>
                            <td>${phone.price.toLocaleString()}</td>
                            <td>${phone.screen}</td>
                            <td>${phone.backCamera}</td>
                            <td>${phone.frontCamera}</td>
                            <td class="phoneImg"><img src="${phone.img}"></td>
                            <td>${phone.desc}</td>
                            <td>${phone.brand}</td>
                            <td>
                                <button data-bs-toggle="modal"
                                data-bs-target="#myModal" onclick='editPhone(${
                                  phone.id
                                })' class="btn btn-warning">Edit</button>
                                <button onclick='deletePhone(${
                                  phone.id
                                })' class="btn btn-danger mt-2">Delete</button>
                            </td>
                        </tr>`;
    contentHTML += trString;
  }
  document.getElementById("tablePhone").innerHTML = contentHTML;
}

function getDataForm() {
  var ten = document.getElementById("phoneName").value;
  var gia = Number(document.getElementById("price").value);
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

function turnOnLoading() {
  document.getElementById("loader").style.display = "block";
}

function turnOffLoading() {
  document.getElementById("loader").style.display = "none";
}

// Xoá tất cả value của field input
function clearFields() {
  document.getElementById("phoneName").value = "";
  document.getElementById("price").value = "";
  document.getElementById("screen").value = "";
  document.getElementById("backCamera").value = "";
  document.getElementById("frontCamera").value = "";
  document.getElementById("image").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("brand").value = "";
}

// Xoá tất cả error tip của field input
function clearErrors() {
  document.getElementById("tbPhoneName").style.display = "none";
  document.getElementById("tbPhoneName").innerHTML = "";
  document.getElementById("tbPrice").style.display = "none";
  document.getElementById("tbPrice").innerHTML = "";
  document.getElementById("tbScreen").style.display = "none";
  document.getElementById("tbScreen").innerHTML = "";
  document.getElementById("tbBackCamera").style.display = "none";
  document.getElementById("tbBackCamera").innerHTML = "";
  document.getElementById("tbFrontCamera").style.display = "none";
  document.getElementById("tbFrontCamera").innerHTML = "";
  document.getElementById("tbImage").style.display = "none";
  document.getElementById("tbImage").innerHTML = "";
  document.getElementById("tbDesc").style.display = "none";
  document.getElementById("tbDesc").innerHTML = "";
  document.getElementById("tbBrand").style.display = "none";
  document.getElementById("tbBrand").innerHTML = "";
}

// Xoá tất cả input, error tip, enable/disable button Add/Update khi nhấn Close modal
function closeModal() {
  clearFields();
  clearErrors();
  document.getElementById("btnAdd").disabled = false;
  document.getElementById("btnUpdate").disabled = true;
  document.getElementById("searchName").value = "";
  document.getElementById("sortByPrice").value = "default";
}
