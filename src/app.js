document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Neflix Premium",
        img: "1.png",
        price: 10000,
      },
      {
        id: 2,
        name: "Iqiyi Premium",
        img: "2.png",
        price: 15000,
      },
      {
        id: 3,
        name: "Bstation Premium",
        img: "3.png",
        price: 10000,
      },
      {
        id: 4,
        name: "Wetv Premium",
        img: "4.png",
        price: 10000,
      },
      {
        id: 5,
        name: "Telegram Premium",
        img: "5.png",
        price: 50000,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //  Jika Belum Ada
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang udah ada, cek apakah barang beda atau sama
        this.items = this.items.map((item) => {
          // Jika beda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // Jika sudah ada, tambah jumlah dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau diremove
      const cartItem = this.items.find((item) => item.id === id);

      // Jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // Jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // if an item is one
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Form Validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// Kirim data ketika tombol checkout diklik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formElement = document.getElementById("checkoutForm");
  const formData = new FormData(formElement); // Pass the form element, not a string
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data.entries()); // Use entries() to get iterable key-value pairs
  const message = formatMessage(objData);
  window.open("http://wa.me/6287714045537?text=" + encodeURIComponent(message));
});

// Format pesan Whatsapp
const formatMessage = (obj) => {
  return `*Data customer*
  Nama: ${obj.name}
  Email: ${obj.email}
  No HP: ${obj.phone}

*Data Pesanan*
 ${JSON.parse(obj.items).map(
   (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
 )}
TOTAL: ${rupiah(obj.total)}
Terima kasih.`;
};

// Kirim data ketika tombol chat service pesan di klik
const customerButton = document.querySelector(".btn");
const form2 = document.querySelector("#input-group");

customerButton.addEventListener("click", function (e) {
  e.preventDefault();
  const custElement = document.getElementById("input-group");
  const custData = new FormData(custElement);
  const datas = new URLSearchParams(custData);
  const objCust = Object.fromEntries(datas.entries());
  const pesan = formatPesan(objCust);
  window.open("http://wa.me/6281944211496?text=" + encodeURIComponent(pesan));
});

// Format pesan customer
const formatPesan = (obj) => {
  return `Halo Z-Min! Aku perlu bantuan nih. Sebelumnya,
  Nama: ${obj.nama}
  Email: ${obj.gmail}
  Nomor Telp.: ${obj.nomor}
  ======================
  *Pertanyaan-ku:*
  ${obj.isi}
  ======================
  ditunggu jawabannya Z-Min, Terimakasih`;
};

// Konversi to rupiah
function rupiah(Number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number);
}
