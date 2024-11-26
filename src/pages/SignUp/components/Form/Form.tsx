import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues, schema } from "../../model";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input/Input";
import "./Form.css";
import Select from "../Select/Select";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      role: "paciente",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // despues de crear la cuenta debe ir a login para iniciar sesión
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-signup">
      <h1 className="title-signup">Crear Cuenta</h1>
      <Input
        name="name"
        control={control}
        label="Nombre"
        type="text"
        error={errors.name}
      />

      <Input
        name="lastName"
        control={control}
        label="Apellido"
        type="text"
        error={errors.lastName}
      />

      <Input
        name="email"
        control={control}
        label="Correo Electrónico"
        type="email"
        error={errors.email}
      />

      <Input
        name="phone"
        control={control}
        label="Teléfono"
        type="phone"
        error={errors.phone}
      />

      {/* rol */}
      <Select register={register} error={errors.role} />

      <Input
        name="password"
        control={control}
        label="Contraseña"
        type="password"
        error={errors.password}
      />

      <Input
        name="confirmPassword"
        control={control}
        label="Confirma la Contraseña"
        type="password"
        error={errors.confirmPassword}
      />

      <button type="submit" className="btn-submit-signup">
        Crear Cuenta
      </button>
    </form>
  );
};

export default Form;
