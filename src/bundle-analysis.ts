import { rollup } from 'rollup';
import fs from 'fs/promises';

interface AnalysisOptions {
  file: string;
  minOptimization?: number;
  logDictPath?: string;
}

export async function analyzeTreeShaking({ file, minOptimization = 0, logDictPath }: AnalysisOptions) {
  // 1. Read original file
  const original = await fs.readFile(file, 'utf-8');
  const originalSize = Buffer.byteLength(original, 'utf-8');

  // 2. Bundle with tree shaking using Rollup
  const bundle = await rollup({
    input: file,
    treeshake: true,
  });
  const { output } = await bundle.generate({
    format: 'esm',
    sourcemap: false,
  });
  const shaken = output.map(chunk => 'code' in chunk ? chunk.code : '').join('\n');
  const shakenSize = Buffer.byteLength(shaken, 'utf-8');

  // 3. Calculate optimization
  const percent = ((originalSize - shakenSize) / originalSize) * 100;
  const log = {
    file,
    originalSize,
    shakenSize,
    percent: Number(percent.toFixed(2)),
    passed: percent >= minOptimization,
  };

  // 4. Log to file if requested
  if (logDictPath) {
    let logs: any[] = [];
    try {
      const prev = await fs.readFile(logDictPath, 'utf-8');
      logs = JSON.parse(prev);
    } catch {}
    logs.push(log);
    await fs.writeFile(logDictPath, JSON.stringify(logs, null, 2));
  }

  // 5. Print result and fail if needed
  console.log(`[Tree Shake Analysis] ${file}`);
  console.log(`Original size: ${originalSize} bytes`);
  console.log(`Tree-shaken size: ${shakenSize} bytes`);
  console.log(`Optimization: ${log.percent}%`);
  if (!log.passed) {
    console.error(`Optimization below threshold (${minOptimization}%)!`);
    process.exit(1);
  }
}