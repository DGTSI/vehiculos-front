import { SweetAlertIcon } from "sweetalert2/dist/sweetalert2.js";

export class SweetAlert {

    /**
     * Mostrar un mensaje de alerta
     * @param alerta (string) Alerta
     */
    public static async basic(alerta: string, icon: SweetAlertIcon = 'info'): Promise<void> {
        const Swal = await import('sweetalert2');
        Swal.default.fire({
          title: alerta,
          allowOutsideClick: false,
          icon: icon,
        });
      }
      
      public static async textTitle(title: string, text: string, icon: SweetAlertIcon = 'info'): Promise<void> {
        const Swal = await import('sweetalert2');
        Swal.default.fire({
          title: title,
          html: text,
          allowOutsideClick: false,
          icon: icon,
        });

    }

    // public static confirm(alerta: string, btnCancelar: string, btnAceptar: string, icono: SweetAlertIcon = 'question'): Promise<SweetAlertResult> {
    //     return Swal.fire({
    //         title: alerta,
    //         icon: icono,
    //         showCancelButton: true,
    //         cancelButtonText: btnCancelar,
    //         cancelButtonColor: "#c6c6c6",
    //         confirmButtonText: btnAceptar,
    //         confirmButtonColor: "#3085d6",
    //         allowOutsideClick: false,
    //     });
    // }

    // public static autoClose(message: string, timer: number, icon: SweetAlertIcon = 'warning') {
    //   return Swal.fire({
    //     title: message,
    //     icon: icon,
    //     timer: timer,
    //     showConfirmButton: false,
    //   })
    // }
}