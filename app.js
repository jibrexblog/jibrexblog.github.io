<!-- app.js -->
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

modeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
});

// Dynamic post loader
const posts = [
  {
    title: "Hello World",
    date: "2025-08-01",
    tag: "intro",
    excerpt: "Ini adalah postingan pertama blog Anda.",
    url: "posts/hello-world.html"
  },
  // Tambahkan lebih banyak postingan di sini
];

const postContainer = document.getElementById('post-container');
const searchInput = document.getElementById('search');
const paginationContainer = document.querySelector('.pagination');
let currentPage = 1;
const postsPerPage = 6;

function displayPosts(filter = '') {
  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(filter.toLowerCase()) ||
    p.tag.toLowerCase().includes(filter.toLowerCase())
  );

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const paginated = filtered.slice(start, end);

  postContainer.innerHTML = '';
  paginated.forEach(post => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h2><a href="${post.url}">${post.title}</a></h2>
      <p class="meta">${post.date} — <span class="tag">${post.tag}</span></p>
      <p>${post.excerpt}</p>
    `;
    postContainer.appendChild(card);
  });

  renderPagination(filtered.length);
}

function renderPagination(totalPosts) {
  paginationContainer.innerHTML = '';
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;
    btn.addEventListener('click', () => {
      currentPage = i;
      displayPosts(searchInput.value);
    });
    paginationContainer.appendChild(btn);
  }
}

searchInput.addEventListener('input', () => {
  currentPage = 1;
  displayPosts(searchInput.value);
});

displayPosts();
