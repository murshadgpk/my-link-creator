import { store } from "./create.js";

export default async function handler(req, res) {
  const { id } = req.query;

  const data = store[id];
  if (!data) {
    return res.status(404).send("Link not found");
  }

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta property="og:title" content="${data.title || ""}" />
        <meta property="og:description" content="${data.description || ""}" />
        <meta property="og:image" content="${data.image || ""}" />
        <meta http-equiv="refresh" content="${data.timer || 0};url=${data.url}" />
        <title>${data.title || "Redirecting..."}</title>
        <style>
          body { background:#111;color:#fff;font-family:sans-serif;
                 display:flex;flex-direction:column;align-items:center;
                 justify-content:center;height:100vh;text-align:center; }
          img { max-width:320px;border-radius:12px;margin-bottom:12px; }
          h1 { margin:0;font-size:24px;color:#fff; }
          p { color:#bbb;max-width:400px; }
        </style>
      </head>
      <body>
        ${data.image ? `<img src="${data.image}" alt="">` : ""}
        <h1>${data.title || "Redirecting..."}</h1>
        <p>${data.description || ""}</p>
        <p>Redirecting in ${data.timer || 0} seconds...</p>
      </body>
    </html>
  `);
}
