
const IG_USERNAME = "usernameigkamu"; 


const cards = document.querySelectorAll(".card");
const filterBtns = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("modal");
const mImg = document.getElementById("mImg");


filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const brand = btn.dataset.brand;
    cards.forEach(card => {
      card.hidden = !(brand === "all" || card.dataset.brand === brand);
    });
    document.getElementById("catalog").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});


cards.forEach(card => {
  card.querySelector(".btn-detail").addEventListener("click", () => openModal(card));
});

function openModal(card) {
  const d = card.dataset;
  const photo = card.querySelector(".card-img img");

  mImg.style.display = "";
  mImg.onerror = () => { mImg.style.display = "none"; };
  mImg.src = photo.getAttribute("src");
  mImg.alt = photo.alt;

  document.getElementById("mBrand").textContent = d.brand;
  document.getElementById("mName").textContent = d.name;
  document.getElementById("mPrice").textContent = d.price;
  document.getElementById("mDesc").textContent = d.desc;
  document.getElementById("mSize").textContent = d.size;
  document.getElementById("mNotes").textContent = d.notes;

  
  const msg = `Halo Parfumea, saya mau pesan ${d.brand} ${d.name} (${d.size}) harga ${d.price}.`;
  const order = document.getElementById("mOrder");
  order.href = `https://ig.me/m/${IG_USERNAME}`;
  order.onclick = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(msg);
    alert("Pesan sudah disalin. Tempel (paste) di chat Instagram ya!");
  };

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

document.getElementById("year").textContent = new Date().getFullYear();