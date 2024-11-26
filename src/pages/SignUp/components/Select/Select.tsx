import { FieldError } from "react-hook-form";
import "./Select.css";

interface Option {
  value: string;
  label: string;
}

interface Props {
  register: any;
  options: Option[];
  error?: FieldError;
  id?: string; // Opcional para personalizar el id
  name: string; // Nombre del campo que se pasa al register
}

const Select = ({ register, options, error, id = "select", name }: Props) => {
  return (
    <div className="form-group">
      <label className="label-signup" htmlFor={id}>
        Rol
      </label>
      <select
        id={id}
        {...register(name)}
        className={`form-control ${error ? "is-invalid" : ""}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="invalid-feedback">{error.message}</span>}
    </div>
  );
};

export default Select;
