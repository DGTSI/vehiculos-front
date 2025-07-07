import { signal, WritableSignal } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IComplainant } from "@shared/types/icomplainant.type";

const disableFormVehicle: WritableSignal<boolean> = signal<boolean>(false);
const disableFormUser: WritableSignal<boolean> = signal<boolean>(true);
const isFormSubmit: WritableSignal<boolean> = signal<boolean>(false);
const dataComplainant: WritableSignal<IComplainant | undefined> = signal<IComplainant | undefined>(undefined);

const folder: WritableSignal<string> = signal<string>("");
const plate: WritableSignal<string> = signal<string>("");
const serial: WritableSignal<string> = signal<string>("");

const formVehicle: WritableSignal<FormGroup> = signal<FormGroup>(new FormGroup({}));
const formContact: WritableSignal<FormGroup> = signal<FormGroup>(new FormGroup({}));



export function setDisableFormVehicle(show: boolean): void {
    disableFormVehicle.set(show);
}

export function getDisableFormVehicle(): boolean {
    return disableFormVehicle();
}

export function setDisableFormUser(show: boolean): void {
    disableFormUser.set(show);
}

export function getDisableFormUser(): boolean {
    return disableFormUser();
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

export function setFormVehicle(data: FormGroup): void {
    formVehicle.set(data);
}

export function getFormVehiclel(): FormGroup {
    return formVehicle();
}

export function setFormContact(data: FormGroup): void {
    formContact.set(data);
}

export function getFormContact(): FormGroup {
    return formContact();
}