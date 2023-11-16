const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Get Phones from API
function getPhonesList() {
  const promise = axios({
    url: "https://653122f94d4c2e3f333c72a3.mockapi.io/phones",
    method: "GET",
  });
  promise
    // Call thành công thì render Phones lên Featured Products theo All Brands/ Apple/ Samsung
    .then((res) => {
      // Render all Brands
      renderPhones(res.data, "pills-all");
      // Render Apple
      const appleList = res.data.filter((phone) => phone.brand === "Apple");
      renderPhones(appleList, "pills-apple");
      // Render Samsung
      const samsungList = res.data.filter((phone) => phone.brand === "Samsung");
      renderPhones(samsungList, "pills-samsung");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("Call API done");
    });
}
getPhonesList();

// Cart Array
let cartPhones = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

function addToCart(id) {
  // Call API get phone info to add to cart
  const promise = axios({
    url: `https://653122f94d4c2e3f333c72a3.mockapi.io/phones/${id}`,
    method: "GET",
  });
  promise
    .then((res) => {
      // Check if phone already exist in cart
      if (cartPhones.some((phone) => phone.id === id)) {
        $(".btn-qty-plus").click();
      } else {
        const cartPhone = res.data;
        cartPhones.push({
          ...cartPhone,
          numberOfUnits: 1,
        });
      }
      updateCart();
      $("#cartIcon").click();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Change NumberOfUnits
function changeNumberOfUnits(action, id) {
  cartPhones = cartPhones.map((phone) => {
    let numberOfUnits = phone.numberOfUnits;
    if (phone.id * 1 === id) {
      if (action === "minus" && numberOfUnits >= 0) {
        numberOfUnits--;
      } else if (action === "plus") {
        numberOfUnits++;
      }
    }
    return {
      ...phone,
      numberOfUnits,
    };
  });
  updateCart();
}

// Clear phone by type
function clearPhoneFromCart(id) {
  cartPhones = cartPhones.filter((phone) => phone.id * 1 !== id);
  updateCart();
}

// Clear all
$("#btnClearCart").onclick = () => {
  cartPhones = [];
  updateCart();
};

// After confirm Purchase, clear cart, set cartPhones to empty
$("#continueToShop").onclick = () => {
  $("#btnClearCart").click();
  $(".btn-close").click();
  $(".header__logo a").click();
};
