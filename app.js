// Artikel yang tersedia
const posts = [
  {
    title: "Hello World",
    filename: "hello-world.html",
    date: "2025-08-01",
    tags: ["intro", "personal"],
    excerpt: "Selamat datang di blog saya! Ini adalah artikel pertama saya."
  },
  {
    title: "Panduan Web3",
    filename: "web3-guide.html",
    date: "2025-08-02",
    tags: ["web3", "crypto"],
    excerpt: "Mengenal teknologi Web3 dan bagaimana kamu bisa memulainya."
  }
];

// Tampilkan daftar artikel
function renderPosts(filterText = "", filterTag = "") {
  const list = document.getElementById("post-list");
  list.innerHTML = "";

  let filtered = posts.filter(post => {
    const matchSearch = post.title.toLowerCase().includes(filterText.toLowerCase());
    const matchTag = filterTag ? post.tags.includes(filterTag) : true;
    return matchSearch && matchTag;
  });

  filtered.forEach(post => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2><a href="posts/${post.filename}">${post.title}</a></h2>
      <p>${post.excerpt}</p>
      <small>${post.date}</small>
    `;
    list.appendChild(card);
  });
}

// Render tag list
function renderTags() {
  const tagList = document.getElementById("tag-list");
  const uniqueTags = [...new Set(posts.flatMap(p => p.tags))];

  uniqueTags.forEach(tag => {
    const el = document.createElement("span");
    el.className = "tag";
    el.textContent = "#" + tag;
    el.onclick = () => renderPosts("", tag);
    tagList.appendChild(el);
  });
}

// Search handler
document.getElementById("search").addEventListener("input", (e) => {
  renderPosts(e.target.value);
});

// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Apply saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

renderTags();
renderPosts();
