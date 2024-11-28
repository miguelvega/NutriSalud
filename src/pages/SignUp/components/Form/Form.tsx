import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues, schema, isPaciente, isNutricionista } from "../../model"; // Ajusta la ruta según tu estructura de archivos
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import Select from "../Select/Select";
import "./Form.css";

const Form = () => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      role: "paciente",
      fecha_nacimiento: "",
      password: "",
      confirmPassword: "",
      talla: 0, // Inicializa según el rol
      peso: 0,
    },
  });

  console.log(errors);

  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    const { confirmPassword, ...new_data } = data;
    console.log(new_data);
    try {
      const response = await fetch("http://localhost:8000/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(new_data),
      });

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("Resultado:", result);
      navigate("/login");
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
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
      <Input
        name="fecha_nacimiento"
        control={control}
        label="Fecha de Nacimiento"
        type="date"
        error={errors.fecha_nacimiento}
      />

      <Select
        name="role"
        id="role"
        register={register}
        options={[
          { value: "paciente", label: "Paciente" },
          { value: "nutricionista", label: "Nutricionista" },
        ]}
        error={errors.role}
      />

      {isPaciente(watch()) && (
        <>
          <Input
            name="talla"
            control={control}
            label="Talla (en cm)"
            type="number"
            min={0}
            max={250}
            step={1}
            //@ts-ignore
            error={errors?.talla}
          />

          <Input
            name="peso"
            control={control}
            label="Peso (en Kg)"
            type="number"
            min={1}
            max={200}
            step={0.1}
            //@ts-ignore
            error={errors?.peso}
          />
        </>
      )}

      {isNutricionista(watch()) && (
        <>
          <Input
            name="experiencia"
            control={control}
            label="Experiencia en años"
            type="number"
            min={0}
            max={50}
            step={1}
            //@ts-ignore
            error={errors?.experiencia}
          />
        </>
      )}

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
