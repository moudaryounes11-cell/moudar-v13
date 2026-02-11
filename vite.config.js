import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@engines': path.resolve(__dirname, 'src/engines'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@data': path.resolve(__dirname, 'src/data'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,      // No sourcemaps in production (security)
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code from app code
          'vendor-react': ['react', 'react-dom'],
          'vendor-charts': ['mermaid'],
          'vendor-export': ['docx', 'file-saver', 'html2pdf.js'],
          // Split heavy engines into lazy-loaded chunks
          'engine-cfir': ['./src/engines/CFIR2Evaluator.js', './src/engines/CFIRUserGuide.js'],
          'engine-analysis': ['./src/engines/DeepAIAnalyzer.js', './src/engines/QualitativeAssistant.js'],
          'engine-design': ['./src/engines/HybridDesignWizard.js', './src/engines/SMARTDesigner.js'],
        },
      },
    },
  },
});
