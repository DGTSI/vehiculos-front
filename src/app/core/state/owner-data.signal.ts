import { signal, WritableSignal } from "@angular/core";
import { IComplainant } from "@shared/types/icomplainant.type";

const showFormVehicle: WritableSignal<boolean> = signal<boolean>(false);
const showFormUser: WritableSignal<boolean> = signal<boolean>(false);
const isFormSubmit: WritableSignal<boolean> = signal<boolean>(false);
const dataComplainant: WritableSignal<IComplainant | undefined> = signal<IComplainant | undefined>(undefined);
const folder: WritableSignal<string> = signal<string>("");
const plate: WritableSignal<string> = signal<string>("");
const serial: WritableSignal<string> = signal<string>("");


export function setShowFormVehicle(show: boolean): void {
    showFormVehicle.set(show);
}

export function getShowFormVehicle(): boolean {
    return showFormVehicle();
}

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

export function setFolder(data: string): void {
    folder.set(data);
}

export function getFolder(): string {
    return folder();
}

export function setPlate(data: string): void {
    plate.set(data);
}

export function getPlate(): string {
    return plate();
}

export function setSerial(data: string): void {
    serial.set(data);
}

export function getSerial(): string {
    return serial();
}