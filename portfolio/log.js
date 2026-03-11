// ===== CONFIG =====
// Add new posts here (1 line per post). This is the only "manual" part on plain HTML.
const POSTS = [
  {
    file: "log/posts/2026-01-ideal-frequency-filters.md",
    title: "Ideal frequency filters – overview",
    date: "2026-01-01",
    tags: ["Electronics", "Signal processing"],
  },
  // Example next post:
  // {
  //   file: "log/posts/2026-02-rc-low-pass.md",
  //   title: "First-order RC low-pass filter",
  //   date: "2026-02-01",
  //   tags: ["Electronics", "Filters", "RC"]
  // },
];

// ===== HELPERS =====
function escapeHtml(str) {
  return str.replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[m],
  );
}

function setYear() {
  document.getElementById("year").textContent = new Date().getFullYear();
}

function setActive(listEl, idx) {
  [...listEl.children].forEach((li, i) => {
    li.classList.toggle("active", i === idx);
  });
}

function formatDate(iso) {
  // simple, readable
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

// Rewrite relative image links in markdown so they work from log.html.
// Example: in markdown you can use ./assets/images/x.png (relative to log folder).
// We convert it to log/assets/images/x.png so it loads correctly.
function rewriteMarkdownPaths(md) {
  // Convert src="./assets/..." or src="assets/..." to src="log/assets/..."
  // marked converts images to <img src="...">, but we rewrite at markdown level (simple):
  return md
    .replace(/\]\(\.\/assets\//g, "](log/assets/") // ](./assets/...
    .replace(/\]\(assets\//g, "](log/assets/"); // ](assets/...
}

// ===== RENDER LIST =====
function renderPostList(posts) {
  const list = document.getElementById("postList");
  list.innerHTML = "";

  posts
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .forEach((p, idx) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="post-title">${escapeHtml(p.title)}</div>
        <div class="post-sub">
          <span>${escapeHtml(formatDate(p.date))}</span>
          ${p.tags?.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("") ?? ""}
        </div>
      `;
      li.addEventListener("click", () => loadPost(p, idx));
      list.appendChild(li);
    });

  return list;
}

// ===== LOAD + RENDER POST =====
async function loadPost(post, idxInList) {
  const list = document.getElementById("postList");
  setActive(list, idxInList);

  const meta = document.getElementById("postMeta");
  const content = document.getElementById("postContent");

  meta.innerHTML = `
    <div>
      <h2>${escapeHtml(post.title)}</h2>
    </div>
    <div class="meta">
      <div>${escapeHtml(formatDate(post.date))}</div>
      <div>${(post.tags ?? []).map((t) => escapeHtml(t)).join(" • ")}</div>
    </div>
  `;

  content.innerHTML = `<p class="muted">Loading…</p>`;

  try {
    const res = await fetch(post.file, { cache: "no-store" });
    if (!res.ok) throw new Error(`Cannot load ${post.file} (${res.status})`);
    let md = await res.text();

    md = rewriteMarkdownPaths(md);

    // Render markdown
    marked.setOptions({
      gfm: true,
      breaks: false,
      headerIds: true,
      mangle: false,
      highlight: function (code, lang) {
        try {
          if (lang && hljs.getLanguage(lang))
            return hljs.highlight(code, { language: lang }).value;
          return hljs.highlightAuto(code).value;
        } catch {
          return code;
        }
      },
    });

    const html = marked.parse(md);
    content.innerHTML = html;

    // Highlight any remaining blocks
    document
      .querySelectorAll("pre code")
      .forEach((el) => hljs.highlightElement(el));

    // Update URL hash (nice for sharing)
    location.hash = encodeURIComponent(post.file);
  } catch (err) {
    content.innerHTML = `
      <div class="empty">
        <h2>Couldn’t load the post</h2>
        <p class="muted">${escapeHtml(String(err))}</p>
        <p class="muted">Check the file path in <code>POSTS</code> and that the file exists.</p>
      </div>
    `;
  }
}

// ===== SEARCH =====
function wireSearch(allPosts) {
  const input = document.getElementById("search");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    const filtered = !q
      ? allPosts
      : allPosts.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            (p.tags ?? []).some((t) => t.toLowerCase().includes(q)) ||
            p.date.includes(q),
        );
    renderPostList(filtered);
  });
}

// ===== INIT =====
function tryLoadFromHash(posts) {
  const h = decodeURIComponent((location.hash || "").replace("#", ""));
  if (!h) return false;
  const idx = posts.findIndex((p) => p.file === h);
  if (idx >= 0) {
    // list is sorted in UI, but we can just load directly
    loadPost(posts[idx], idx);
    return true;
  }
  return false;
}

(function init() {
  setYear();
  const listEl = renderPostList(POSTS);
  wireSearch(POSTS);

  // Load first post by default (or from hash)
  if (!tryLoadFromHash(POSTS) && POSTS.length > 0) {
    loadPost(POSTS.sort((a, b) => (a.date < b.date ? 1 : -1))[0], 0);
  }
})();
