/**
 * server.js
 * Backend server with express JS that handles API routes and also serves static frontend files.
 */

const path = require("path");
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Router for API endpoints
const router = express.Router();

// Basic time route
router.get("/time", (req, res) => {
  res.json({ now: new Date().toISOString() });
});

// Example greeting route
router.get("/hello/:name", (req, res) => {
  res.send("Hello " + req.params.name);
});

// /api is using as prefix for all API routes
app.use("/api", router);

// This is servering as main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// This handling form POST from index.html (redirect to hash-based route)
app.post("/search", (req, res) => {
  const term = (req.body.q || "").trim();
  const src = (req.body.src || "demo").toLowerCase();
//   console.log("Search:", { term, src });
  res.redirect(
    "/#q=" + encodeURIComponent(term) + "&src=" + encodeURIComponent(src)
  );
});

// API endpoint to fetch search results with using axios
app.get("/api/search", async (req, res) => {
  const q = (req.query.q || "phone").trim();
  const src = (req.query.src || "demo").toLowerCase();

  try {
    // GitHub Search
    if (src === "github") {
      const { data } = await axios.get(
        "https://api.github.com/search/repositories",
        {
          params: { q },
          headers: { Accept: "application/vnd.github+json" },
          timeout: 6000,
        }
      );

      const items = (data.items || []).slice(0, 5).map((r) => ({
        name: r.full_name,
        stars: r.stargazers_count,
        url: r.html_url,
        description: r.description || "",
      }));

      return res.json({
        source: "github",
        total: data.total_count,
        top5: items,
      });
    }

    // DemoJSON Product Search (default)
    const { data } = await axios.get("https://dummyjson.com/products/search", {
      params: { q, limit: 5 },
      timeout: 6000,
    });

    const items = (data.products || []).map((p) => ({
      title: p.title,
      price: p.price,
      brand: p.brand,
      rating: p.rating,
      thumbnail: p.thumbnail,
    }));

    return res.json({ source: "demo", total: data.total, top5: items });
  } catch (e) {
    const status = e.response?.status || 502;
    const msg = e.response?.data?.message || e.message || "Upstream error";
    return res.status(status).json({
      error: msg,
      tip: "Try the Demo source if GitHub is rate limited.",
    });
  }
});

// Start server
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
