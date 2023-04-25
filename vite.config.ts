import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react';
//import fs from 'fs';
//import { execSync } from 'node:child_process';
import eslint from '@rollup/plugin-eslint'

///const myHestiaPwd: string = execSync('powershell -File ../../myHestiaDevCert_useLocalPassword.ps1', { 'encoding': 'utf-8' });
//const myHestiaPwd: string = exec('powershell -File ../../myHestiaDevCert_useLocalPassword.ps1', { 'shell': 'powershell.exe' }, (error, stdout, stderr) => { console.log(stdout); return stdout }).toString()
///console.log(`pwd: ${myHestiaPwd}`);

type ViteConfigInput = {
    command: string,
    mode: string,
    ssrBuild: string,
};

// https://vitejs.dev/config/#conditional-config
export default (args: ViteConfigInput) =>
{
    if (args.command === 'serve')
    {
        // dev specific config
        return defineConfig({
            plugins: [
                {
                    ...eslint({
                        include: 'src/**/*.+(js|jsx|ts|tsx)'
                    }),
                    enforce: 'pre',
                },
                react()
            ],
            logLevel: 'info', // info par defaut. 'info' | 'warn' | 'error' | 'silent'
            build: {
                //outDir: "../wwwroot",
                //emptyOutDir: true,
                watch: {
                    buildDelay: 1000
                },
                sourcemap: true,
            },
            server: {
                host: 'localhost',
                port: 5173,
//                origin: 'https://localhost:5173',
                // fs: {
                //     strict: false,
                //     allow: [
                //         // search up for workspace root (mode par default nececitant d'�tre r�activ� en strict:false + allow)
                //         searchForWorkspaceRoot(process.cwd()),
                //         // custom rules vers les fichier de certificats pfx de myHestia
                //         '../../'
                //     ]
                // },
                // https: {
                //     pfx: fs.readFileSync('../../myHestiaDevCert.pfx'),
                //     passphrase: 'Adeis74*' // Pas compris pourquoi mais ne fontionne pas si utilisation de la variable myHestiaPwd definit plus haut
                // },
                // proxy: {
                //     'api': 'https://localhost:44344/api'
                // },
                strictPort: true,
                open: true,
            }
        })
    }
    else
    {
        if (args.command === 'build')
        {
            // command === 'build'
            // build specific config
            if (args.mode === 'development') {
              return defineConfig({
                  plugins: [
                      {
                        ...eslint({
                            include: 'src/**/*.+(js|jsx|ts|tsx)'
                        }),
                        enforce: 'pre',
                      },
                      react()
                  ],
                  logLevel: 'info',
                  build: {
                      outDir: "./dist",
                      emptyOutDir: true,
                  },
              });
            }
            else
            {
              return defineConfig({
                  plugins: [react()],
                  build: {
                      outDir: "../wwwroot",
                      emptyOutDir: true,
                  },
              });
            }
        }
        else
        {
            //command === 'ssrBuild'
            return defineConfig({});
        }
    }
};