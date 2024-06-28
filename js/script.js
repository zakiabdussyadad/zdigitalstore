// Toggle class active untuk hamburger menu
const navbarExtra = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarExtra.classList.toggle("active");
};

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");
// ketika search di klik
document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Tambahkan event listener ke input search-box
searchBox.addEventListener("input", filterProducts);

// Fungsi untuk memfilter produk berdasarkan input
function filterProducts() {
  // Ambil nilai dari input search-box
  const query = searchBox.value.toLowerCase();

  // Ambil semua product-card
  const productCards = document.querySelectorAll(".product-card");

  // Tampilkan atau sembunyikan product-card berdasarkan input
  productCards.forEach((card) => {
    const itemName = card
      .querySelector(".product-content h3")
      .textContent.toLowerCase();
    if (itemName.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

searchBox.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    filterProducts();
  }
});

// Tambahkan event listener ke label search-box
const searchLabel = document.querySelector("label[for='search-box']");
searchLabel.addEventListener("click", () => {
  searchBox.focus();
  filterProducts();
});

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
// Ketika cart di klik
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// Klik di luar elemen
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarExtra.contains(e.target)) {
    navbarExtra.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// Modal Box
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = "flex";
    e.preventDefault();
  };
});

// ketika item diklik

// Close
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailModal.style.display = "none";
  e.preventDefault();
};

// Klik diluar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};
