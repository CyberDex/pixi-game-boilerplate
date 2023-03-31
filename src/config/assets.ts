import { ResolverManifest } from "@pixi/assets";

export const assetsManifest: ResolverManifest = {
    bundles: [
        {
            name: 'preload',
            assets: [
                {
                    name: 'pixi-logo',
                    srcs: 'images/pixi-logo.png',
                },
            ],
        }
    ]
}