// Validate bắt buộc nhập
function ktRequired(inputField, spError) {
  if (inputField != "") {
    document.getElementById(spError).style.display = "none";
    document.getElementById(spError).innerHTML = "";
    return true;
  }
  document.getElementById(spError).style.display = "block";
  document.getElementById(spError).innerHTML = "Required!";
  return false;
}

// Validate nhập số cho Price
function ktInputKiSo(priceField) {
  const re = /^\d+$/;
  if (re.test(priceField)) {
    document.getElementById("tbPrice").style.display = "none";
    document.getElementById("tbPrice").innerHTML = "";
    return true;
  }
  document.getElementById("tbPrice").style.display = "block";
  document.getElementById("tbPrice").innerHTML = "Please enter a number!";
  return false;
}

// Validate nhập link image hợp lệ
function ktURL(imageField) {
  const re = /(https?:\/\/.*\.(?:png|jpg))/i;
  if (re.test(imageField)) {
    document.getElementById("tbImage").style.display = "none";
    document.getElementById("tbImage").innerHTML = "";
    return true;
  }
  document.getElementById("tbImage").style.display = "block";
  document.getElementById("tbImage").innerHTML =
    "Please enter a valid image URL!";
  return false;
}
