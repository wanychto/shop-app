let products = []

fetch('data.json')
    .then(res => res.json())
    .then(data => {
        products = data;
        renderProducts(products);
    });

function renderProducts(items) {
    const container = document.getElementById('products');
    const noResults = document.getElementById('no-results');
    container.innerHTML = '';
    if (items.length == 0) {
        noResults.style.display = "block";
        return;
    } else {
        noResults.style.display = "none";
    }
    items.forEach(product => {
        container.innerHTML += `
                <div class="card" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>${product.price} ₽</p>
                </div>
                `;
    });
}

document.getElementById('search').addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.title.toLowerCase().includes(query));
    renderProducts(filtered);
});
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');

document.getElementById('products').addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    const product = products.find(p => p.id == card.dataset.id);
    if (!product) return;
    document.getElementById('modal-img').src = product.image;
    document.getElementById('modal-title').textContent = product.title;
    document.getElementById('modal-desc').textContent = product.description;
    document.getElementById('modal-price').textContent = product.price + ' ₽';
    modal.classList.remove('modal-hidden');
});

closeBtn.addEventListener('click', () => modal.classList.add('modal-hidden'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('modal-hidden'); });
window.addEventListener('keydown', e => { if (e.key === "Escape") modal.classList.add('modal-hidden'); });

