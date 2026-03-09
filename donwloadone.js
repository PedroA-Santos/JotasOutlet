import fs from "fs";
import path from "path";
import axios from "axios";
import * as cheerio from "cheerio";

const url = "https://worldclubs.ru/product/mens-argentina-2026-world-cup-home-long-sleeve-jersey-player-version/";

// pasta base do seu projeto
const baseFolder = "./public/camisetas/argentina";

async function downloadImages() {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  // pega o slug do produto
  const productSlug = url.split("/product/")[1].replace("/", "");

  // pega o time (primeira palavra)
  const team = productSlug.split("-")[0];

  const teamFolder = path.join(baseFolder, team);
  const productFolder = path.join(teamFolder, productSlug);

  fs.mkdirSync(productFolder, { recursive: true });

  const images = new Set();

  // pega apenas imagens da galeria
  $(".woocommerce-product-gallery__image img").each((_, el) => {
    const src =
      $(el).attr("data-large_image") ||
      $(el).attr("data-src") ||
      $(el).attr("src");

    if (src && src.includes("worldclubs")) {
      images.add(src);
    }
  });

  let index = 1;

  for (const img of images) {
    try {
      const response = await axios({
        url: img,
        method: "GET",
        responseType: "stream",
      });

      const file = path.join(productFolder, `${index}.jpg`);

      const writer = fs.createWriteStream(file);

      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      console.log("baixado:", file);
      index++;

    } catch (err) {
      console.log("erro ao baixar:", img);
    }
  }

  console.log("✔ download finalizado");
}

downloadImages();