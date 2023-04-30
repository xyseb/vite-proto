/**
 * Custom Hot Reloading Plugin
 * Start `vite build` on Hot Module Reload
 * https://stackoverflow.com/questions/69573998/is-there-a-way-to-use-vite-with-hmr-and-still-generate-the-files-in-the-dist-fo
 */
import { Plugin } from 'vite';
import { build } from 'vite'

export default function HotBuild() : Plugin {

  let bundling = false
  const hmrBuild = async () => { 
    bundling = true
    await build({'build': { outDir: './hot-dist'}}) // <--- you can give a custom config here or remove it to use default options
  };

  return {
    name: 'hot-build',
    enforce: "pre",
    // HMR
    handleHotUpdate({ file, server }) {
      if (!bundling) {
        console.log(`hot vite build starting...`)
        hmrBuild()
          .then(() => {
            bundling = false
            console.log(`hot vite build finished`)
          })
      }  
      return []
    }
  }
}