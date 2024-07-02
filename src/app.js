//konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

document.addEventListener("alpine:init", () => {
  Alpine.data("catering", () => ({
    items: [
      {
        id: 1,
        name: "Nasi Liwet",
        img: "1.jpg",
        price: 20000,
      },

      {
        id: 2,
        name: "Nasi Bakar",
        img: "2.jpg",
        price: 12000,
      },

      {
        id: 3,
        name: "Nasi Campur",
        img: "3.jpg",
        price: 22000,
      },

      {
        id: 4,
        name: "Nasi Kuning",
        img: "4.jpg",
        price: 18000,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // jika ada barang yang sama
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //jika belum ada/kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        //jika barang sudah ada,cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          //jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            //jika barang sudah ada,tambah quantity dan totalnya
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
      //ambil item yang mau di remove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      //jika item lebih dari satu
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          //jika bukan barang yang di klik
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
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

//form validation
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

//kirim data ketik tombol checkout di klik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);

  // Membuat link langsung ke WhatsApp
  const whatsappLink = `whatsapp://send?phone=6281256870373&text=${encodeURIComponent(message)}`;

  // Mencoba membuka link WhatsApp
  window.location.href = whatsappLink;
});

//checkoutButton.addEventListener("click", function (e) {
  //e.preventDefault();
  //const formData = new FormData(form);
  //const data = new URLSearchParams(formData);
  //const objData = Object.fromEntries(data);
  //const message = formatMessage(objData);
//window.open(
    //`https://wa.me/6281256870373?text=` + encodeURIComponent(message)
  //);
  // console.log(objData);
//});

// format whatsapp
// format whatsapp
formatMessage = (obj) => {
  return `Data Customer
  Nama: ${obj.name}
  Email: ${obj.email}
  No HP: ${obj.phone}
  Data Pesanan
  ${JSON.parse(obj.items).map(
    (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
  )}
  TOTAL: ${rupiah(obj.total)}
  TERIMA KASIH.`;
};
