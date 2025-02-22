import { FormikProps, FormikErrors, FormikTouched } from "formik";

//tipos de datos para la app en el login
export type AuthContextProps = {
  auth: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

//Datos de respuesta que envia la base de datos 
export type ResponseData = {
  message?: string;//mesaje que se recibe 
  data?: any;//los datos que nos mostrará 
  success: boolean;// acceso verdadero o falso 
};

//Datos del login
export type LoginData = {
  userName: string;
  password: string;
};

//Roles del sistema
export type UserRole =
  | 0 //AdministradorSistema
  | 1 //Curador
  | 2 //Empacador
  | 3 //Administrador
  | 4 //Bodeguero
  | 5 //Mulling
  | 6 //Supervisor
  | 7 //Secretaria
  | 8; //Gerente

//Datos de los usuarios
export type User = {
  id?: string;
  userName: string;
  password?: string;
  name: string;
  email: string;
  department: string;
  role: UserRole;
  identificationCard: string;
  dateBirth: string;
  age: number;
  estado: string;
};

export type Estados = En_proceso | Pendiente | Terminado | Rechazado;

export type Comentario = {
  id?: string;
  usuario: string;
  mensaje: string;
  fecha: string
};

export type Cajas = {
  fincaNombre: ReactNode;
  id?: string;
  NumeroDeCaja: number;
  cantidad: number;
  anioCosecha: number;
  pesoBruto: number;
  pesoNeto: number;
  calidad: string;
  corte: string;
  lote: string;
  variedad: string;
  valor: number;
};

export type Fincas = {
  id?: string;
  casona: string;
  aposento: string;
  corte: string;
  lote: string;
  variedad: string;
  cajas: Array<Cajas>;
};

export type Solicitude = {
  id?: string;
  number: number;
  fecha: string;
  informacionCurador: string;
  solicitante: string;
  fincas: Array<Fincas>;
  cometarios: Array<Comentario>;
  estadoCurador: string;
  estadoEmpacador: string;
  EstadoAdministrador: string;
  EstadoBodeguero: string;
  EstadoMulling: string;
  EstadoSupervisor: string;
};

//backups
export type Backup = {
  id?: string;
  solicitude: any | Solicitude;
};

//Auditoria del sistema
export type Auditory = {
  id?: string;
  date: string;
  user: string;
  action: string;
};

export interface ModalProps<T> {
  visible: boolean;
  close: () => void;
  onDone?: (data?: T) => void | Promise<void>;
}

export interface FormikComponentProps<T = Element> extends FormikProps<T> {
  formik: {
    values: T;
    handleChange: {
      (e: ChangeEvent<any>): void;
      <T_1 = string | ChangeEvent<T>>(field: T_1): T_1 extends ChangeEvent<T>
        ? void
        : (e: string | ChangeEvent<T>) => void;
    };
    touched: FormikTouched<T>;
    errors: FormikErrors<T>;
    setFieldValue: (
      field: string,
      value: T,
      shouldValidate?: boolean
    ) => Promise<void> | Promise<FormikErrors<T>>;
    setFieldError: (field: string, value: string) => void;
  };
}
