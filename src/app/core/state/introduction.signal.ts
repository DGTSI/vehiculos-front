import { signal, WritableSignal } from "@angular/core";

const activateTransitionsIntro: WritableSignal<boolean> = signal<boolean>(false);
const activateTransitionsForms: WritableSignal<boolean> = signal<boolean>(false);

export function setActivateTransitionsIntro(show: boolean): void {
    activateTransitionsIntro.set(show);
}

export function getActivateTransitionsIntro(): boolean {
    return activateTransitionsIntro();
}

export function setActivateTransitionsForms(show: boolean): void {
    activateTransitionsForms.set(show);
}

export function getActivateTransitionsForms(): boolean {
    return activateTransitionsForms();
}