import { signal, WritableSignal } from "@angular/core";

const activateTransitions: WritableSignal<boolean> = signal<boolean>(false);

export function setActivateTransitions(show: boolean): void {
    activateTransitions.set(show);
}

export function getActivateTransitions(): boolean {
    return activateTransitions();
}