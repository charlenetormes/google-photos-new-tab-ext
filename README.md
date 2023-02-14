# Vue 3 + Vite Chrome Extension Boiler Plate

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended Setup

-   node >= v16.x.x
-   [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
-   [Prettier VS Code Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   Additional VS Code Workspace settings
    ```
    {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "[javascript, tsx]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "editor.formatOnSave": true,
        "editor.tabSize": 4,
        "prettier.tabWidth": 4,
        "vetur.format.options.tabSize": 4
    }

    ```
-   Change project information under `package.json` and `manifest.json`

## Usage

Generate the unpacked extension under `dist/`

```
npm run build
```

Then load the unpacked in your chrome browser `chrome://extensions`

## Packing the build

Create the zip file for Chrome store deployment under `build/`

```
npm run build-zip
```
