import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const pastaBase = "public/camisetas";

async function uploadDiretorio(dir) {
  const arquivos = fs.readdirSync(dir);

  for (const arquivo of arquivos) {
    const caminhoCompleto = path.join(dir, arquivo);
    const stat = fs.statSync(caminhoCompleto);

    if (stat.isDirectory()) {
      await uploadDiretorio(caminhoCompleto);
    } else {
      try {

        // caminho relativo a partir de camisetas
        const relative = path.relative("public", caminhoCompleto);

        // remove extensão
        const publicId = relative
          .replace(/\\/g, "/")
          .replace(/\.[^/.]+$/, "");

        // pasta da imagem
        const folder = path.dirname(publicId);

        const result = await cloudinary.uploader.upload(caminhoCompleto, {
          folder: folder,
          public_id: path.basename(publicId),
          overwrite: true,
          resource_type: "image"
        });

        console.log("Upload:", result.secure_url);

      } catch (error) {
        console.error("Erro:", caminhoCompleto, error.message);
      }
    }
  }
}

uploadDiretorio(pastaBase);