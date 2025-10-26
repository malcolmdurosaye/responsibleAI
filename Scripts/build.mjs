// scripts/build.mjs
(async () => {
  try {
    const { build } = await import('vite');
    await build();
    console.log('[build] Vite build completed via Node API');
  } catch (err) {
    console.error('[build] Vite build failed:', err);
    process.exit(1);
  }
})();
