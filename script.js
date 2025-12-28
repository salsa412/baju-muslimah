// ======== Inisialisasi Keranjang ========
let cart = [];

// ======== Elemen DOM ========
const cartIcon = document.getElementById("cart-icon");
const cartModal = document.getElementById("cart-modal");
const closeModal = document.querySelector(".close");
const cartItems = document.getElementById("cart-items");
const totalEl = document.getElementById("total");
const cartCount = document.getElementById("cart-count");
const payBtn = document.getElementById("pay-btn");

// ======== Fungsi Tambah ke Keranjang ========
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
  });
});

// ======== Fungsi Update Keranjang ========
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let totalQuantity = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    totalQuantity += item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span>${item.name} (${item.quantity}x)</span>
        <div>
          <button class="btn-minus" data-index="${index}" style="background:#eee; border:none; padding:4px 8px; border-radius:5px; cursor:pointer;">-</button>
          <button class="btn-plus" data-index="${index}" style="background:#b88bb3; color:white; border:none; padding:4px 8px; border-radius:5px; cursor:pointer;">+</button>
          <button class="btn-delete" data-index="${index}" style="background:#ff6b6b; color:white; border:none; padding:4px 8px; border-radius:5px; cursor:pointer;">x</button>
        </div>
      </div>
    `;
    cartItems.appendChild(li);
  });

  totalEl.textContent = `Total: Rp${total.toLocaleString("id-ID")}`;
  cartCount.textContent = totalQuantity;

  addCartButtonEvents();
}

// ======== Event Tombol di Keranjang ========
function addCartButtonEvents() {
  document.querySelectorAll(".btn-minus").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
      updateCart();
    });
  });

  document.querySelectorAll(".btn-plus").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      cart[index].quantity++;
      updateCart();
    });
  });

  document.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      updateCart();
    });
  });
}

// ======== Tampilkan / Tutup Modal ========
cartIcon.addEventListener("click", () => {
  cartModal.style.display = "block";
});
closeModal.addEventListener("click", () => {
  cartModal.style.display = "none";
});
window.addEventListener("click", e => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
  }
});

// ======== Tombol Checkout ========
payBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Keranjang masih kosong, sis! 💕");
    return;
  }

  let pesan = "Halo, saya ingin memesan:\n";
  cart.forEach(item => {
    pesan += `- ${item.name} (${item.quantity}x) = Rp${(item.price * item.quantity).toLocaleString("id-ID")}\n`;
  });
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  pesan += `\nTotal: Rp${total.toLocaleString("id-ID")}`;
  pesan += "\n\nAlamat pengiriman: ";

  const nomorWA = "6289501164480";
  const encodedMsg = encodeURIComponent(pesan);
  const url = `https://wa.me/${nomorWA}?text=${encodedMsg}`;

  window.open(url, "_blank");
});

// ======== SMOOTH SCROLL ========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ======== FADE-IN ANIMATION ========
const fadeElements = document.querySelectorAll(".fade-in");

function checkFade() {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", checkFade);
window.addEventListener("load", checkFade);
