import { promises as fs } from "fs";
import path from "path";

async function safeRead(filePath: string) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return "";
  }
}

// Build a lightweight context string from important repo files
export async function getProfileContext(): Promise<string> {
  const root = process.cwd();
  const files = [
    "README.md",
    "package.json",
    "app/layout.tsx",
    "constant/data.ts",
    "constant/sampleblog.ts",
  ];

  const pieces: string[] = [];

  for (const f of files) {
    const full = path.join(root, f);
    const content = await safeRead(full);
    if (!content) continue;

    // Remove common code noise to keep context focused
    const cleaned = content
      .replace(/<[^>]*>/g, " ")
      .replace(/\b(import|export)\b[^;\n]*[;\n]/g, " ")
      .replace(/\/\*[\s\S]*?\*\//g, " ")
      .replace(/\/\/.*$/gm, " ")
      .trim();

    pieces.push(`--- ${f} ---\n${cleaned}`);
  }

  const context = pieces.join("\n\n");

  // Keep the context size reasonable
  return context.slice(0, 12000);
}

export default getProfileContext;
