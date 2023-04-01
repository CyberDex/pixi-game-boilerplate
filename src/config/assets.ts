import { ResolverManifest } from "@pixi/assets";
import { SCENE } from "../utils/enums";

export const assetsManifest: ResolverManifest = {
    bundles: [
        {
            name: SCENE.loading,
            assets: [
                {
                    name: 'pixi-logo',
                    srcs: 'images/pixi-logo.png',
                },
            ],
        }
    ]
}