// render dssp
var idEdit = null;

// 1. Gọi api lấy danh sách sp từ server
function getPhonesList() {
  turnOnLoading();
  axios({
    url: "https://653122f94d4c2e3f333c72a3.mockapi.io/phones",
    method: "GET",
  })
    .then(function (res) {
      renderPhoneList(res.data);
      turnOffLoading();
    })
    .catch(function (err) {
      console.log("err", err);
      turnOffLoading();
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
      // set searchName về rỗng
      document.getElementById("searchName").value = "";
      // set sortByPrice về lại default
      document.getElementById("sortByPrice").value = "default";
    })
    .catch(function (err) {
      console.log("err", err);
    });
};

window.createPhone = () => {
  // validation
  // phoneName
  var isValid = ktRequired(
    document.getElementById("phoneName").value,
    "tbPhoneName"
  );
  // price
  isValid &=
    ktRequired(document.getElementById("price").value, "tbPrice") &&
    ktInputKiSo(document.getElementById("price").value);
  // screen
  isValid &= ktRequired(document.getElementById("screen").value, "tbScreen");
  // backCamera
  isValid &= ktRequired(
    document.getElementById("backCamera").value,
    "tbBackCamera"
  );
  // frontCamera
  isValid &= ktRequired(
    document.getElementById("frontCamera").value,
    "tbFrontCamera"
  );
  // image
  isValid &=
    ktRequired(document.getElementById("image").value, "tbImage") &&
    ktURL(document.getElementById("image").value);
  // description
  isValid &= ktRequired(document.getElementById("desc").value, "tbDesc");
  // brand
  isValid &= ktRequired(document.getElementById("brand").value, "tbBrand");

  if (isValid) {
    var phone = getDataForm();
    axios({
      url: "https://653122f94d4c2e3f333c72a3.mockapi.io/phones",
      method: "POST",
      data: phone,
    })
      .then(function (res) {
        // tắt modal sau khi thêm thành công
        document.getElementById("btnClose").click();
        // gọi api lấy danh sách sp từ server
        getPhonesList();
      })
      .catch(function (err) {
        console.log("err", err);
      });
  }
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
      // set searchName về rỗng
      document.getElementById("searchName").value = "";
      // set sortByPrice về lại default
      document.getElementById("sortByPrice").value = "default";
      // Enable button Update, disable button Add
      document.getElementById("btnAdd").disabled = true;
      document.getElementById("btnUpdate").disabled = false;
    })
    .catch(function (err) {
      console.log("err", err);
    });
};

window.updatePhone = () => {
  // validation
  // phoneName
  var isValid = ktRequired(
    document.getElementById("phoneName").value,
    "tbPhoneName"
  );
  // price
  isValid &=
    ktRequired(document.getElementById("price").value, "tbPrice") &&
    ktInputKiSo(document.getElementById("price").value);
  // screen
  isValid &= ktRequired(document.getElementById("screen").value, "tbScreen");
  // backCamera
  isValid &= ktRequired(
    document.getElementById("backCamera").value,
    "tbBackCamera"
  );
  // frontCamera
  isValid &= ktRequired(
    document.getElementById("frontCamera").value,
    "tbFrontCamera"
  );
  // image
  isValid &=
    ktRequired(document.getElementById("image").value, "tbImage") &&
    ktURL(document.getElementById("image").value);
  // description
  isValid &= ktRequired(document.getElementById("desc").value, "tbDesc");
  // brand
  isValid &= ktRequired(document.getElementById("brand").value, "tbBrand");

  if (isValid) {
    var phone = getDataForm();
    // gọi api cập nhật
    axios({
      url: `https://653122f94d4c2e3f333c72a3.mockapi.io/phones/${idEdit}`,
      method: "PUT",
      data: phone,
    })
      .then(function (res) {
        // tắt modal sau khi thêm thành công
        document.getElementById("btnClose").click();
        // gọi api lấy danh sách sp từ server
        getPhonesList();
      })
      .catch(function (err) {
        console.log("err", err);
      });
  }
};

// Search by name
document.getElementById("btnSearch").onclick = () => {
  turnOnLoading();
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
      turnOffLoading();
    })
    .catch(function (err) {
      console.log("err", err);
      turnOffLoading();
    });
};

// Sort by Price
document.getElementById("sortByPrice").onchange = () => {
  turnOnLoading();
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
      // set searchName về rỗng
      document.getElementById("searchName").value = "";
      turnOffLoading();
    })
    .catch(function (err) {
      console.log("err", err);
      turnOffLoading();
    });
};
