import { signal, WritableSignal } from "@angular/core";
import { IComplainant } from "@shared/types/icomplainant.type";

const showFormUser: WritableSignal<boolean> = signal<boolean>(false);
const isFormSubmit: WritableSignal<boolean> = signal<boolean>(false);
const dataComplainant: WritableSignal<IComplainant | undefined> = signal<IComplainant | undefined>(undefined);

export function setShowFormUser(show: boolean): void {
    showFormUser.set(show);
}

export function getShowFormUser(): boolean {
    return showFormUser();
}

export function setIsFormSubmit(isSubmit: boolean): void {
    isFormSubmit.set(isSubmit);
}

export function getIsFormSubmit(): boolean {
    return isFormSubmit();
}

export function setDataComplainant(data: IComplainant | undefined): void {
    dataComplainant.set(data);
}

export function getDataComplainant(): IComplainant | undefined {
    return dataComplainant();
}