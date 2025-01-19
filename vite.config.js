import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
  }
});


// 
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ['editorjs-html'],
//   },
//   build: {
//     commonjsOptions: {
//       include: [/node_modules/, /editorjs-html/],
//     },
//   },
// });

