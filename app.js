const posts = [
  {
    title: "Hello World",
    url: "posts/hello-world.html",
    tags: ["intro", "personal"]
  },
  {
    title: "Contoh Kedua",
    url: "posts/contoh-kedua.html",
    tags: ["tips", "html"]
  }
];

function loadPosts() {
  const container = document.getElementById('posts-list');
  container.innerHTML = "";
  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = "article-card";
    card.innerHTML = `<a href="${post.url}"><h2>${post.title}</h2><p>Tags: ${post.tags.join(', ')}</p></a>`;
    container.appendChild(card);
  });
}

function searchPosts(keyword) {
  const filtered = posts.filter(p => 
    p.title.toLowerCase().includes(keyword.toLowerCase()) ||
    p.tags.join(" ").toLowerCase().includes(keyword.toLowerCase())
  );
  const container = document.getElementById('posts-list');
  container.innerHTML = "";
  filtered.forEach(post => {
    const card = document.createElement('div');
    card.className = "article-card";
    card.innerHTML = `<a href="${post.url}"><h2>${post.title}</h2><p>Tags: ${post.tags.join(', ')}</p></a>`;
    container.appendChild(card);
  });
}

document.getElementById('search').addEventListener('input', e => {
  searchPosts(e.target.value);
});

document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Restore theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

loadPosts();
