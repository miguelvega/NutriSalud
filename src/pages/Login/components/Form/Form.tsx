import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues, schema } from "../../model";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input/Input";
import "./Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context";

const Form = () => {
  const { login } = useAuth();
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // verificar con el json obtenido del backend para determinar el rol
    const userRole = "nutricionista"; // o paciente
    login({ role: userRole });
    console.log(data);
    if (userRole.match("paciente")) {
      navigate("/");
    } else {
      navigate("/inicio-medico");
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
    </form>
  );
};

export default Form;
