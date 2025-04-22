import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ isSsrBuild }) => {
  if (isSsrBuild) {
    return {
      build: {
        outDir: 'dist/server',
        copyPublicDir: false
      },
      plugins: [tsconfigPaths()]
    };
  } else {
    return {
      plugins: [tsconfigPaths(), tailwindcss(), react()]
    };
  }
});
