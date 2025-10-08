const express = require("express");
const axios = require("axios");
const app = express();

// Dynamic port for production and local
const PORT = process.env.PORT || 4000;

// Your OMDb API key (get one free from https://www.omdbapi.com/apikey.aspx)
const API_KEY = "97dcc287";

// Helper function to build table rows
function row(movie) {
  return `
    <tr>
      <td>${movie.Title} (${movie.Year})</td>
      <td>${movie.imdbID}</td>
      <td><img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/100x150?text=No+Image"}" width="100" alt="poster"/></td>
    </tr>`;
}

// Main route
app.get("/", async (req, res) => {
  const searchQuery = req.query.s || "star wars";
  const API_URL = `http://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&apikey=${API_KEY}`;

  try {
    const { data } = await axios.get(API_URL);
    console.log(`--- Results for "${searchQuery}" ---`);
    let rows = "";

    if (data.Search) {
      data.Search.forEach((m, i) => {
        console.log(`[${i}] ${m.Title} (${m.Year})`);
        rows += row(m);
      });
    } else {
      console.log("No movies found or API error:", data.Error);
      rows = `<tr><td colspan="3">${data.Error || "No results found"}</td></tr>`;
    }

    const html = `
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>OMDb Movie Browser</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body class="bg-light py-4">
        <div class="container">
          <h1 class="mb-4 text-center">🎬 OMDb Movie Browser</h1>

          <p class="text-muted text-center mb-3">
            💡 Tip: Type a movie title (like <strong>Batman</strong>) and press <strong>Enter</strong> to reload results for that movie.
          </p>

          <form method="GET" action="/" class="input-group mb-4">
            <input type="text" name="s" class="form-control" placeholder="Search for a movie..." value="${searchQuery}">
            <button class="btn btn-primary" type="submit">Search</button>
          </form>

          <div class="table-responsive">
            <table class="table table-bordered table-striped align-middle">
              <thead class="table-dark">
                <tr>
                  <th>Title (Year)</th>
                  <th>IMDB ID</th>
                  <th>Poster</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      </body>
      </html>
    `;

    res.status(200).send(html);
  } catch (e) {
    console.error("API/Server error:", e.message);
    res.status(500).send(`<h1>Server Error</h1><p>Failed to load OMDb data: ${e.message}</p>`);
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT} copy and paste in your browser`));
