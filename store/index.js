const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Lấy danh sách Phones từ API
const getPhonesList = () => {
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
};

getPhonesList();

// Render Phones lên Featured Products
renderPhones = (phonesList, idTheDiv) => {
  let htmls = "";
  phonesList.forEach((phone) => {
    const icons = {
      apple: '<i class="fab fa-apple"></i>',
      samsung:
        '<svg xmlns="http://www.w3.org/2000/svg" aria-label="Samsung" role="img" viewBox="0 0 512 512" fill="#117cad"><rect width="512" height="512" rx="15%" fill="#fff"/><path fill="#034ea2" d="M118 232c-12 0-17 4-16 15 2 9 19 14 20 17v3c0 2-1 3-4 3s-4-2-4-4v-4h-12c-1 12 8 16 16 16 10 0 16-3 16-13 1-14-18-15-20-21v-2c0-1 1-3 4-3s4 2 4 4v3h11v-3c0-10-9-11-15-11zm265 11v25c1 16 29 13 29 0v-15h-13v6h4v8c-1 4-10 4-10 0v-23c0-4 8-4 9 0v4h10v-5c-1-15-29-13-29 0zm-120-11c-12 0-17 4-16 15 2 9 19 14 20 17v3c0 2-1 3-4 3s-4-2-4-4v-4h-12c-1 12 8 16 16 16 10 0 16-3 16-13 1-14-18-15-20-21v-2c0-1 1-3 4-3s4 2 4 4v3h11v-3c0-10-9-11-15-11zm-75 1-1 44h11v-40l8 40h11l7-40v40h11l-1-44h-18l-5 34-5-34zm101 0v34c1 8 7 11 16 11 8 0 15-3 15-11v-34h-11v34c0 1-1 3-5 3-3 0-4-2-4-3v-34zm-139 0-8 44h12l6-40 6 40h12l-8-44zm182 0v44h11v-36l11 36h16v-44h-11v35l-10-35zm138-14a61 210 80 01-428 73 61 210 80 01428-73"/></svg>',
    };
    const icon = phone.brand == "Samsung" ? icons.samsung : icons.apple;
    htmls += `
    <div class="col-12 col-md-6 col-lg-4">
    <div class="card">
      <img src="${phone.img}" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title phoneName">
          ${icon} ${phone.name}
        </h5>
        <p class="card-text desc">
          ${phone.desc}
        </p>
        <p class="price">$${phone.price}</p>
        <div class="buy">
          <button class="btn btn-buy" onclick="addToCart('${phone.id}')">
            <i class="fa fa-shopping-cart"></i> Buy now
          </button>
        </div>
      </div>
    </div>
  </div>
    `;
  });
  $(`#${idTheDiv} .products__item`).innerHTML = htmls;
};

const cartPhones = [];

class CartItem {
  constructor(id, img, name, price) {
    (this.id = id), (this.img = img), (this.name = name), (this.price = price);
  }
}

const addToCart = (id) => {
  // Call API lấy thông tin phone
  const promise = axios({
    url: `https://653122f94d4c2e3f333c72a3.mockapi.io/phones/${id}`,
    method: "GET",
  });
  promise
    .then((res) => {
      const addPhone = res.data;
      const cartPhone = new CartItem(
        addPhone.id,
        addPhone.img,
        addPhone.name,
        addPhone.price
      );
      cartPhones.push(cartPhone);
      $("#cartIcon").click();
      $("header .cartQty").innerHTML = `${cartPhones.length}`;

      renderCart(cartPhones);
    })
    .catch((err) => {
      console.log(err);
    });
};

const renderCart = (cartPhones) => {
  let htmls = "";
  cartPhones.forEach((phone) => {
    htmls += `
        <div class="cart-item">
        <img
          src="${phone.img}"
        />
        <p>${phone.name}</p>
        <div class="adjustQty">
          <button class="btn-qty"><i class="fa fa-angle-left"></i></button>
          <span class="cart-qty">1</span>
          <button class="btn-qty"><i class="fa fa-angle-right"></i></button>
        </div>
        <p>$${phone.price}</p>
        <button class="btn-clearItem">
          <i class="fa fa-trash-alt"></i>
        </button>
      </div>
    </div>
        `;
  });
  $(".cart-body").innerHTML = htmls;
};
