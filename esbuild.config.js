import esbuild from 'esbuild';

esbuild.build({
    entryPoints: ['./src/index.ts'],
    outfile: './lib/index.js',
    format: 'esm',
    bundle: true,
    platform: 'node',
    target: 'es2020',
    tsconfig: './tsconfig.node.json',
}).then(() => {
    console.log('Build succeeded.');
}).catch(() => {
    console.error('Build failed.');
    process.exit(1);
});