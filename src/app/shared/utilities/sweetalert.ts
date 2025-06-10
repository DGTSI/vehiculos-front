import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";

export class SweetAlert {

    /**
     * Mostrar un mensaje de alerta
     * @param alerta (string) Alerta
     */
    public static basic(alerta: string, icon: SweetAlertIcon = 'info'): void {
        Swal.fire({
          title: alerta,
          allowOutsideClick: false,
          icon: icon,
        });
      }
      
      public static textTitle(title: string, text: string, icon: SweetAlertIcon = 'info'): void {
      Swal.fire({
        title: title,
        text: text,
        allowOutsideClick: false,
        icon: icon,
      });

    }

    public static confirm(alerta: string, btnCancelar: string, btnAceptar: string, icono: SweetAlertIcon = 'question'): Promise<SweetAlertResult> {
        return Swal.fire({
            title: alerta,
            icon: icono,
            showCancelButton: true,
            cancelButtonText: btnCancelar,
            cancelButtonColor: "#c6c6c6",
            confirmButtonText: btnAceptar,
            confirmButtonColor: "#3085d6",
            allowOutsideClick: false,
        });
    }

    public static autoClose(message: string, timer: number, icon: SweetAlertIcon = 'warning') {
      return Swal.fire({
        title: message,
        icon: icon,
        timer: timer,
        showConfirmButton: false,
      })
    }
}