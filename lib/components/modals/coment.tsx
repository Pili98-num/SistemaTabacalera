import FormatedDate from "../../utils/formated_date";
import { useAuth } from "../../hooks/use_auth";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import theme from "../../styles/theme";
import { toast } from "react-toastify";
import { Comentario, ModalProps } from "../../types";

interface Props extends ModalProps<Comentario> {
  initialData?: Comentario;
}

const ComentModal = (props: Props) => {
  const { auth } = useAuth();
  const [initialValues, setInitialValues] = useState<Comentario>({
    id: null,
    usuario: auth?.userName,
    fecha: FormatedDate(),
    mensaje: "",
  });

  const handleClose = () => {
    formik.resetForm({ values: initialValues });
    props.close();
  };

  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit: async (formData: Comentario) => {
      if (formData.mensaje.trim() === "") {
        toast.warning("El comentario no puede estar vacío");
        return;
      }
      await props.onDone(formData);
      handleClose();
    },
  });

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
        <div className="bg-white p-6 rounded shadow-lg z-10 md:w-1/3 w-2/3 h-3/6 overflow-y-auto">
          <form onSubmit={formik.handleSubmit}>
            <div
              style={{
                color: theme.colors.grey,
              }}
              className="text-center text-xl mb-2 font-semibold"
            >
              COMENTARIO
            </div>
            <hr />
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-3">
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Usuario
                </label>
                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  placeholder="Nombre"
                  name="usuario"
                  onChange={formik.handleChange}
                  value={formik.values.usuario ?? ""}
                  disabled
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Fecha Actual
                </label>
                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  name="fecha"
                  onChange={formik.handleChange}
                  value={formik.values.fecha ?? ""}
                  disabled
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  * Detalle del Comentario
                </label>
                <textarea
                  className="w-full h-24 resize-y text-left border-2 border-gray-200"
                  placeholder="Escriba aqui su Comentario lo mas detallado posible"
                  name="mensaje"
                  onChange={formik.handleChange}
                  value={formik.values.mensaje ?? ""}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <button
                className="text-center bg-transparent hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded-full text-sm"
                type="submit"
              >
                Guardar Comentario
              </button>
              <button
                className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded-full text-sm"
                onClick={handleClose}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ComentModal;
