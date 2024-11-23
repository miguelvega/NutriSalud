import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues, schema } from "../../model";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input/Input";
import "./Form.css";

const Form = () => {
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
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <button className="btn-submit" type="submit">
        Ingresar
      </button>
    </form>
  );
};

export default Form;
