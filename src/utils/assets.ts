import { Assets, ResolverAssetsArray } from "@pixi/assets";
import { assetsManifest } from "../config/assets";
import { SCENE } from "./enums";


export async function initAssets() {
    await Assets.init({ manifest: assetsManifest });
    await Assets.loadBundle(SCENE.loading);

    const allBundles = assetsManifest.bundles.map((item) => item.name);
    Assets.backgroundLoadBundle(allBundles);
}

export async function loadAssets(bundle: string) {
    if (!isBundleLoaded(bundle)) {
        await Assets.loadBundle(bundle);
    }
}

export function isBundleLoaded(bundle: string) {
    const bundleManifest = assetsManifest.bundles.find((b) => b.name === bundle);

    if (!bundleManifest) {
        return false;
    }

    for (const asset of bundleManifest.assets as ResolverAssetsArray) {
        if (!Assets.cache.has(asset.name as string)) {
            return false;
        }
    }

    return true;
}

export function areBundlesLoaded(bundles: string[]) {
    for (const name of bundles) {
        if (!isBundleLoaded(name)) {
            return false;
        }
    }

    return true;
}
