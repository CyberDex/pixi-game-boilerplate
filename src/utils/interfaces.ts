import { Container } from "@pixi/display";

export interface Scene extends Container {
    update?(): void;
    resize?(width: number, height: number): void;
}