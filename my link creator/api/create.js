let store = {}; // demo in-memory storage

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url, title, description, timer, image } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Destination URL is required" });
  }

  // Random short ID (6 characters)
  const id = Math.random().toString(36).substring(2, 8);

  // Save in memory (⚠️ this resets if server restarts)
  store[id] = { url, title, description, timer, image };

  res.status(200).json({
    shortUrl: `https://${req.headers.host}/${id}`,
    id
  });
}

// Expose store for [id].js
export { store };
