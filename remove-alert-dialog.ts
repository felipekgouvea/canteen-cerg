import fs from "fs";
import path from "path";

// Caminho do componente a ser removido
const fileToDelete = path.resolve(
  __dirname,
  "../app/_components/ui/alert-dialog.tsx",
);

// Verifica se o arquivo existe e remove
if (fs.existsSync(fileToDelete)) {
  fs.unlinkSync(fileToDelete);
  console.log("✅ alert-dialog.tsx removido com sucesso.");
} else {
  console.log(
    "⚠️ Arquivo alert-dialog.tsx não encontrado. Já deve ter sido removido.",
  );
}

// Função para buscar e mostrar ocorrências de uso ainda existentes
function searchForUsage(dir: string) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      searchForUsage(fullPath);
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      const content = fs.readFileSync(fullPath, "utf-8");

      if (content.includes("AlertDialog") || content.includes("alert-dialog")) {
        console.log(`🔍 Uso encontrado em: ${fullPath}`);
      }
    }
  }
}

// Busca por usos restantes
console.log("\n🔎 Verificando se ainda há usos no projeto...");
searchForUsage(path.resolve(__dirname, "../app"));
