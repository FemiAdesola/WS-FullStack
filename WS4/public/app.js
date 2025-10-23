// DOM Document Object Model
const form = document.getElementById("searchForm");
const resultDiv = document.getElementById("result");

/*
========================
  RENDER
========================
*/
// For rendering results in different ways
const renderResults = (data) => {
  if (data.error) {
    resultDiv.innerHTML = `<p class="error">❌ ${data.error}</p>`; // For showing error message
    return;
  }

  // For handling empty results with the result is not available
  if (!data.items || data.items.length === 0) {
    resultDiv.innerHTML = `<p>No results found.</p>`;
    return;
  }

  // Different rendering for GitHub or DemoJSON
  const isGitHub = data.source === "github";
  const cards = data.items
    .map((item) =>
      isGitHub
        ? `
        <div class="card">
          <h3><a href="${item.url}" target="_blank">${item.name}</a></h3>
          <p>${item.description}</p>
          <p><strong>⭐ Stars:</strong> ${item.stars}</p>
        </div>`
        : `
        <div class="card">
          <img src="${item.thumbnail}" alt="${item.title}" />
          <h3>${item.title}</h3>
          <p><strong>Brand:</strong> ${item.brand}</p>
          <p><strong>Price:</strong> $${item.price}</p>
          <p><small>⭐ Rating: ${item.rating}</small></p>
        </div>`
    )
    .join("");

  // Show more/less toggle
  const toggleBtn = data.total > data.items.length
    ? `<button id="toggleBtn" class="btn-secondary">${data.showAll ? "Show Less" : "Show All"}</button>`
    : "";

  resultDiv.innerHTML = `
    <h3>${isGitHub ? "🔍 GitHub Repositories" : "Products"} — Showing ${data.items.length} of ${data.total}</h3>
    <div class="card-grid">${cards}</div>
    <div class="center">${toggleBtn}</div>
  `;

  const toggleButton = document.getElementById("toggleBtn");
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      const params = new URLSearchParams(location.hash.slice(1));
      params.set("showAll", data.showAll ? "false" : "true");
      location.hash = params.toString();
    });
  }
};

/*
========================
  FETCH RESULTS
========================
*/
// This place hand way to fetch data
const runSearchIfNeeded = async () => {
  const params = new URLSearchParams(location.hash.slice(1));
  const q = params.get("q");
  const src = params.get("src") || "demo";
  const limit = params.get("limit") || 6;
  const showAll = params.get("showAll") === "true";

  if (!q) return;

  resultDiv.innerHTML = `<p>Loading results for "<strong>${q}</strong>"...</p>`;

  try {
    const res = await fetch(
      `/api/search?q=${encodeURIComponent(q)}&src=${src}&limit=${limit}&showAll=${showAll}`
    );
    const data = await res.json();
    renderResults(data);
  } catch (err) {
    renderResults({ error: err.message });
  }
};

/*
========================
  HANDLE FORM SUBMIT
========================
*/  
//This place handle way to submt the form 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = document.getElementById("queryInput").value.trim();
  const src = form.querySelector("input[name='src']:checked").value;
  const limit = document.getElementById("limitSelect").value;

  if (!q) return;

  const params = new URLSearchParams({ q, src, limit, showAll: false });
  location.hash = params.toString();
});

// React to hash changes
window.addEventListener("hashchange", runSearchIfNeeded);

// Initial load
runSearchIfNeeded();
