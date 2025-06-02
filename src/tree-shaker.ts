import esbuild from 'esbuild';
import fs from 'fs/promises';

export async function analyzeTreeShake(inputFile: string): Promise<void> {
  try {
    // Step 1: Read the original bundled file
    const originalBundle = await fs.readFile(inputFile, 'utf-8');

    // Step 2: Tree shake the file using esbuild
    const result = await esbuild.build({
      entryPoints: [inputFile],
      bundle: true,
      format: 'esm',
      treeShaking: true,
      write: false, // Store output in memory
    });

    // Step 3: Get the tree-shaken output
    const treeShakenBundle = result.outputFiles[0].text;

    // Step 4: Compare original and tree-shaken outputs
    const originalSize = Buffer.byteLength(originalBundle, 'utf-8');
    const treeShakenSize = Buffer.byteLength(treeShakenBundle, 'utf-8');
    const treeShakeFactor = ((originalSize - treeShakenSize) / originalSize) * 100;

    // Step 5: Log the results
    console.log('Original Size:', originalSize, 'bytes');
    console.log('Tree-Shaken Size:', treeShakenSize, 'bytes');
    console.log('Tree Shake Factor:', treeShakeFactor.toFixed(2), '%');
  } catch (error) {
    console.error('Error during tree shake analysis:', error);
  }
}

// Example usage:
// analyzeTreeShake('dist/bundle.js');