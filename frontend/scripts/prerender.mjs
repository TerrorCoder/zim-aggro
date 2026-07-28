import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";
import http from "http";
import puppeteer from "puppeteer-core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_DIR = join(__dirname, "../dist");
const SITEMAP_PATH = join(__dirname, "../public/sitemap.xml");

// 1. Static HTTP server for dist/
function startServer(port) {
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".webmanifest": "application/manifest+json",
  };

  const server = http.createServer((req, res) => {
    let urlPath = req.url.split("?")[0];
    let filePath = join(DIST_DIR, urlPath);

    // Fallback to SPA root index.html if asset doesn't exist
    if (!existsSync(filePath) || (!extname(filePath) && !filePath.endsWith(".html"))) {
      filePath = join(DIST_DIR, "index.html");
    }

    const ext = extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    try {
      const content = readFileSync(filePath);
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    } catch (e) {
      res.writeHead(404);
      res.end("Not found");
    }
  });

  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

// Locate local browser executable (Edge or Chrome)
async function launchBrowser() {
  const channels = ["msedge", "chrome"];
  for (const channel of channels) {
    try {
      const b = await puppeteer.launch({
        channel,
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      console.log(`Launched system browser using channel: ${channel}`);
      return b;
    } catch (e) {
      // try next channel
    }
  }

  const candidatePaths = [
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
  ];

  for (const exe of candidatePaths) {
    if (existsSync(exe)) {
      try {
        const b = await puppeteer.launch({
          executablePath: exe,
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        console.log(`Launched browser from executable: ${exe}`);
        return b;
      } catch (e) {}
    }
  }

  throw new Error("Could not find a local Chrome or Edge browser installation for SSG pre-rendering.");
}

// 2. Main Pre-rendering Engine
async function prerender() {
  console.log("Starting SSG pre-rendering process for zim-aggro frontend...");

  if (!existsSync(DIST_DIR)) {
    console.error("dist/ directory not found. Please run 'vite build' first.");
    process.exit(1);
  }

  // Parse paths from sitemap.xml
  const sitemapXml = readFileSync(SITEMAP_PATH, "utf-8");
  const locRegex = /<loc>https?:\/\/[^\/]+(\/[^<]*)<\/loc>/g;
  const paths = [];
  let match;
  while ((match = locRegex.exec(sitemapXml)) !== null) {
    paths.push(match[1] || "/");
  }

  if (paths.length === 0) {
    console.warn("No paths found in sitemap.xml, defaulting to ['/']");
    paths.push("/");
  }

  console.log(`Found ${paths.length} routes to pre-render.`);

  const PORT = 3849;
  const server = await startServer(PORT);
  console.log(`Local prerender server running on http://127.0.0.1:${PORT}`);

  const browser = await launchBrowser();

  const CONCURRENCY = 10;
  let completed = 0;

  async function renderPath(routePath) {
    const page = await browser.newPage();
    try {
      // Abort heavy media requests during SSG build for speed
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        const resourceType = req.resourceType();
        if (["image", "font", "media"].includes(resourceType)) {
          req.abort();
        } else {
          req.continue();
        }
      });

      const targetUrl = `http://127.0.0.1:${PORT}${routePath}`;
      await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
      
      // Wait for React component rendering inside #root
      await page.waitForSelector("#root > *", { timeout: 10000 }).catch(() => {});
      
      // Short delay to ensure metadata sync completes
      await new Promise((r) => setTimeout(r, 120));

      const html = await page.content();

      // Determine output filepath in dist
      let targetFile;
      if (routePath === "/") {
        targetFile = join(DIST_DIR, "index.html");
      } else {
        const cleanPath = routePath.endsWith("/") ? routePath.slice(0, -1) : routePath;
        targetFile = join(DIST_DIR, cleanPath, "index.html");
      }

      mkdirSync(dirname(targetFile), { recursive: true });
      writeFileSync(targetFile, html, "utf-8");

      completed++;
      if (completed % 10 === 0 || completed === paths.length) {
        console.log(`Pre-rendered ${completed}/${paths.length} static pages...`);
      }
    } catch (err) {
      console.error(`Failed to pre-render route ${routePath}:`, err.message);
    } finally {
      await page.close();
    }
  }

  // Execute in batches
  for (let i = 0; i < paths.length; i += CONCURRENCY) {
    const chunk = paths.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map((p) => renderPath(p)));
  }

  await browser.close();
  server.close();
  console.log(`🎉 Pre-rendering complete! ${completed} static pages generated in dist/`);
}

prerender().catch((e) => {
  console.error("Prerender error:", e);
  process.exit(1);
});
