// render dssp
var idEdit = null;

// 1. Gọi api lấy danh sách sp từ server
function getPhonesList() {
  axios({
    url: "https://653122f94d4c2e3f333c72a3.mockapi.io/phones",
    method: "GET",
  })
    .then(function (res) {
      renderPhoneList(res.data);
    })
    .catch(function (err) {
      console.log("err", err);
    });
}
getPhonesList();

// 2. Xóa 1 sp trên server
window.deletePhone = (id) => {
  axios({
    url: `https://653122f94d4c2e3f333c72a3.mockapi.io/phones/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      // gọi lại api lấy ds sp mới nhất từ server sau khi xóa thành công
      getPhonesList();
      // set sortByPrice về lại default
      document.getElementById("sortByPrice").value = "default";
    })
    .catch(function (err) {});
};

window.createPhone = () => {
  var phone = getDataForm();
  axios({
    url: "https://653122f94d4c2e3f333c72a3.mockapi.io/phones",
    method: "POST",
    data: phone,
  })
    .then(function (res) {
      getPhonesList();
      // clear field input
      clearFields();
      // set sortByPrice về lại default
      document.getElementById("sortByPrice").value = "default";
      // tắt modal sau khi thêm thành công
    })
    .catch(function (err) {});
};

// sửa = lấy chi tiết + cập nhật
window.editPhone = (id) => {
  // idEdit chứa id của sản phẩm được chọn khi user nhấn btn edit
  idEdit = id;
  // gọi api lấy chi tiết 1 sp
  axios({
    url: `https://653122f94d4c2e3f333c72a3.mockapi.io/phones/${id}`,
    method: "GET",
  })
    .then(function (res) {
      var phone = res.data;
      // hiển thị res lên form
      document.getElementById("phoneName").value = phone.name;
      document.getElementById("price").value = phone.price;
      document.getElementById("screen").value = phone.screen;
      document.getElementById("backCamera").value = phone.backCamera;
      document.getElementById("frontCamera").value = phone.frontCamera;
      document.getElementById("image").value = phone.img;
      document.getElementById("desc").value = phone.desc;
      document.getElementById("brand").value = phone.brand;
      // set sortByPrice về lại default
      document.getElementById("sortByPrice").value = "default";
      // Enable button Update, disable button Add
      document.getElementById("btnAdd").disabled = true;
      document.getElementById("btnUpdate").disabled = false;
    })
    .catch(function (err) {});
};

window.updatePhone = () => {
  var phone = getDataForm();
  // gọi api cập nhật
  axios({
    url: `https://653122f94d4c2e3f333c72a3.mockapi.io/phones/${idEdit}`,
    method: "PUT",
    data: phone,
  })
    .then(function (res) {
      // sau khi cập nhật thành công
      getPhonesList();
      // clear field input, enable button Add, disable button Update
      clearFields();
      document.getElementById("btnAdd").disabled = false;
      document.getElementById("btnUpdate").disabled = true;
      // set sortByPrice về lại default
      document.getElementById("sortByPrice").value = "default";
    })
    .catch(function (err) {});
};

// Search by name
document.getElementById("btnSearch").onclick = () => {
  axios({
    url: "https://653122f94d4c2e3f333c72a3.mockapi.io/phones",
    method: "GET",
  })
    .then(function (res) {
      var phoneArr = res.data;
      var searchName = document.getElementById("searchName").value;
      var searchResult = phoneArr.filter(
        (phone) => phone.name.toLowerCase().includes(searchName) === true
      );
      renderPhoneList(searchResult);
      // set sortByPrice về lại default
      document.getElementById("sortByPrice").value = "default";
    })
    .catch(function (err) {
      console.log("err", err);
    });
};

// Sort by Price
document.getElementById("sortByPrice").onchange = () => {
  axios({
    url: "https://653122f94d4c2e3f333c72a3.mockapi.io/phones",
    method: "GET",
  })
    .then(function (res) {
      var phoneArr = res.data;
      var sortValue = document.getElementById("sortByPrice").value;
      switch (sortValue) {
        case "lowToHigh":
          var lowToHighArr = phoneArr.sort((a, b) => a.price * 1 - b.price * 1);
          renderPhoneList(lowToHighArr);
          break;
        case "highToLow":
          var highToLowArr = phoneArr.sort((a, b) => b.price * 1 - a.price * 1);
          renderPhoneList(highToLowArr);
          break;
        default:
          getPhonesList();
          break;
      }
    })
    .catch(function (err) {
      console.log("err", err);
    });
};
