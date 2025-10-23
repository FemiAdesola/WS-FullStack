const path = require("path");
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// =========================
// MIDDLEWARE
// =========================

// Middleware to parse JSON and form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// =========================
// ROUTES
// =========================

// Basic API router
const router = express.Router();

// /api/time — returns current server time
router.get("/time", (req, res) => {
  res.json({ now: new Date().toISOString() });
});

// Example greeting route
router.get("/hello/:name", (req, res) => {
  res.send("Hello " + req.params.name);
});


// /api/search — supports both GitHub and DummyJSON search
router.get("/search", async (req, res) => {
  const q = (req.query.q || "phone").trim();
  const src = (req.query.src || "demo").toLowerCase();
  const limit = parseInt(req.query.limit) || 3;
  const showAll = req.query.showAll === "true";

  try {
    // =========================
    // GitHub Repository Search
    // =========================
    if (src === "github") {
      const { data } = await axios.get("https://api.github.com/search/repositories", {
        params: { q, per_page: showAll ? 50 : limit },
        headers: { Accept: "application/vnd.github+json" },
        timeout: 6000,
      });

      const items = (data.items || []).slice(0, showAll ? 50 : limit).map((r) => ({
        name: r.full_name,
        stars: r.stargazers_count,
        url: r.html_url,
        description: r.description || "No description provided.",
      }));

      return res.json({
        source: "github",
        total: data.total_count,
        items,
        limit,
        showAll,
      });
    }

    // =========================
    // DummyJSON Product Search
    // =========================
    const { data } = await axios.get("https://dummyjson.com/products/search", { // DemoJSON Product Search (default)
      params: { q },
      timeout: 6000,
    });

    const products = data.products || [];
    const items = showAll ? products : products.slice(0, limit);

    return res.json({
      source: "demo",
      total: data.total,
      items: items.map((p) => ({
        title: p.title,
        price: p.price,
        brand: p.brand,
        rating: p.rating,
        thumbnail: p.thumbnail,
      })),
      limit,
      showAll,
    });
  } catch (e) {
    const status = e.response?.status || 502;
    const msg = e.response?.data?.message || e.message || "Upstream error";
    return res.status(status).json({
      error: msg,
      tip: "Try the Demo source if GitHub is rate limited.",
    });
  }
});

app.use("/api", router); // /api is using as prefix for all API routes

// =========================
// FRONTEND
// =========================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // This is servering as main page
});

// =========================
// SERVER START
// =========================
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
