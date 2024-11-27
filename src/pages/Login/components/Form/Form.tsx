import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues, schema } from "../../model";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input/Input";
import "./Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context";
import { Toast } from "../../../../components/Toast/Toast";

const Form = () => {
  const { login } = useAuth();
  let toastMessage = "";

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // verificar con el json obtenido del backend para determinar el rol
    try {
      const response = await fetch(
        `http://localhost:8000/usuario/login?email=${data.email}&password=${data.password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("Resultado:", result);

      if (!result.ok) {
        toastMessage = "No se ha podido ingresar,ingrese bien las credenciales";
      } else {
        toastMessage = "Se ha ingresado a la aplicación";
        const userRole = result.user.role;
        const userId = result.user._id; // Obtén el id del usuario
        const userName = result.user.name;
        login({ role: userRole, id: userId, name: userName }); // Pasa el role y el id
        if (userRole.match("paciente")) {
          navigate("/");
        } else {
          navigate("/inicio-medico");
        }
      }

      // navigate("/");
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-login">
      <h1 className="title-login">Iniciar Sesión</h1>
      <Input
        name="email"
        control={control}
        label="Correo Electrónico"
        type="text"
        error={errors.email}
      />

      <Input
        name="password"
        control={control}
        label="Contraseña"
        type="password"
        error={errors.password}
      />

      <div className="box-bottom">
        <button className="btn-submit-login" type="submit">
          Ingresar
        </button>
        <Link to="/signup" className="link-signup">
          Crear Cuenta
        </Link>
      </div>

      {/* Toast */}
      {toastMessage.length >= 0 ? (
        <Toast message={toastMessage} duration={1000} onClose={() => {}} />
      ) : (
        <></>
      )}
    </form>
  );
};

export default Form;
