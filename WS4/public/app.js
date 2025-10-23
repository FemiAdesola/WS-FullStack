/**
 * app.js for just to handle client-side search logic and renders results as styled cards.
 */

// Parse URL hash parameters (#q=term&src=demo)
const getHashParams = () => {
  const params = new URLSearchParams(location.hash.slice(1));
  return {
    q: params.get("q"),
    src: params.get("src") || "demo"
  };
};

// For rendering results in different ways
const renderResults = (data) => {
  const resultDiv = document.getElementById("result");

  // For showing error message
  if (data.error) {
    resultDiv.innerHTML = `<p class="error">❌ ${data.error}</p>`;
    return;
  }

  // For Hhandling empty results with the result is not available
  if (!data.top5 || data.top5.length === 0) {
    resultDiv.innerHTML = `<p>No results found for your search.</p>`;
    return;
  }

  // Different rendering for GitHub or DemoJSON
  if (data.source === "github") {
    resultDiv.innerHTML = `
      <h3>🔍 Top ${data.top5.length} GitHub Repositories (Total: ${data.total})</h3>
      <div class="card-grid">
        ${data.top5.map(repo => `
          <div class="card">
            <h3><a href="${repo.url}" target="_blank">${repo.name}</a></h3>
            <p>${repo.description || "No description provided."}</p>
            <p><strong>⭐ Stars:</strong> ${repo.stars}</p>
          </div>
        `).join("")}
      </div>
    `;
  } else {
    resultDiv.innerHTML = `
      <h3>🛒 Top ${data.top5.length} Products (Total: ${data.total})</h3>
      <div class="card-grid">
        ${data.top5.map(p => `
          <div class="card">
            <img src="${p.thumbnail}" alt="${p.title}" />
            <h3>${p.title}</h3>
            <p><strong>Brand:</strong> ${p.brand}</p>
            <p><strong>Price:</strong> $${p.price}</p>
            <p><small>⭐ Rating: ${p.rating}</small></p>
          </div>
        `).join("")}
      </div>
    `;
  }
};

// Run search based on hash
const runSearchIfNeeded = async () => {
  const { q, src } = getHashParams();
  if (!q) return;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<p>Loading results for "<strong>${q}</strong>"...</p>`;

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(q)}&src=${encodeURIComponent(src)}`);
    const data = await response.json();
    renderResults(data);
  } catch (err) {
    renderResults({ error: err.message || "Something went wrong." });
  }
};

// React to hash changes
window.addEventListener("hashchange", runSearchIfNeeded);

// Initial load
runSearchIfNeeded();
