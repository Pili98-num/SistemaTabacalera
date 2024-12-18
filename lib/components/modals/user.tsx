import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/use_auth";
import theme from "../../styles/theme";
import { User, ModalProps } from "../../types";
import { toast } from "react-toastify";

const initialUser: User = {
  id: null,
  userName: "",
  password: "",
  email: "",
  department: "",
  role: 1,
  name: "",
  identificationCard: "",
  dateBirth: "",
  age: 0,
  estado: "",
};

interface Props extends ModalProps<User> {
  initialData?: User;
}

const UserModal = (props: Props) => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<User>(initialUser);

  const handleClose = () => {
    formik.resetForm({ values: initialUser });
    props.close();
  };

  // maneja los datos y comportamiento del formulario
  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit: async (formData: User) => {
      if (formData.name === "") {
        toast.warning("El nombre del traabajador no puede estar vacio");
        return;
      }

      if (formData.identificationCard === "") {
        toast.warning("La cedula o ruc del traabajador no puede estar vacio");
        return;
      }

      if (formData.userName === "") {
        toast.warning("Ingrese un nombre de usuario");
        return;
      }

      if (formData.password === "") {
        toast.warning("Ingrese una contraseña para el usuario");
        return;
      }

      if (formData.estado === "") {
        toast.warning("Seleccione un estado para el usuario");
        return;
      }

      setLoading(true);
      console.log(formData);
      await props.onDone(formData);
      setLoading(false);
      handleClose();
    },
  });

  //Calcula la edad de una persona
  useEffect(() => {
    let fechaActual: Date = new Date();
    let fechaNacimiento: Date = new Date(formik.values?.dateBirth);
    let anios: number =
      fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    fechaNacimiento.setFullYear(fechaNacimiento.getFullYear());

    if (fechaActual < fechaNacimiento) {
      --anios;
    }
    formik.setFieldValue("age", anios);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values?.dateBirth, formik.values.age]);

  useEffect(() => {
    if (props.initialData) setInitialValues(props.initialData);
  }, [props.initialData]);

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          props.visible ? "" : "hidden"
        }`}
      >
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded shadow-lg z-10 w-2/3 h-5/6 overflow-y-auto">
          <form onSubmit={formik.handleSubmit}>
            <div
              style={{ color: theme.colors.red }}
              className="text-center text-xl mb-2 font-semibold"
            >
              Editar Usuario
            </div>
            <hr />
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-3">
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Nombre del Trabajador
                </label>

                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  placeholder="Nombre de Usuario"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Cedula o RUC
                </label>

                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  placeholder="Cedula o Ruc"
                  name="identificationCard"
                  onChange={formik.handleChange}
                  value={formik.values.identificationCard}
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Fecha de nacimiento
                </label>

                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="date"
                  id="dateBirth"
                  name="dateBirth"
                  value={formik.values?.dateBirth}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Edad
                </label>

                <input
                  className="noscroll appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="number"
                  name="age"
                  onChange={formik.handleChange}
                  value={formik.values.age}
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Nombre de Usaurio
                </label>

                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  placeholder="Nombre de Usuario"
                  name="userName"
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Contraseña
                </label>

                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  E-mail
                </label>

                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="email"
                  placeholder="Correo electrónico"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Tipo de Rol
                </label>

                <select
                  className="border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  aria-label="Default select role"
                  name="role"
                  onChange={formik.handleChange}
                  value={formik.values.role}
                  defaultValue={1}
                >
                  <option value={1}>Curador</option>
                  <option value={2}>Empacador</option>
                  <option value={3}>Administrador</option>
                  <option value={4}>Bodeguero</option>
                  <option value={5}>Mulling</option>
                  <option value={6}>Supervisor</option>
                  <option value={7}>Secretaria</option>
                  <option value={8}>Gerente</option>
                </select>
              </div>

              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Estado
                </label>

                <select
                  className="border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  aria-label="Default select role"
                  name="estado"
                  onChange={formik.handleChange}
                  value={formik.values.estado}
                >
                  <option value="" selected disabled>
                    Seleccione una opcion
                  </option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            </div>
            <hr />
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-4"
              type="submit"
            >
              Guardar
            </button>
          </form>
          <button
            className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
            onClick={handleClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};
export default UserModal;
