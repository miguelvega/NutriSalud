import { FieldError } from "react-hook-form";
import "./Select.css";

interface Props {
  register: any;
  error?: FieldError;
}

const Select = ({ register, error }: Props) => {
  return (
    <div className="form-group">
      <label className="label-signup" htmlFor="role">
        Rol
      </label>
      <select
        id="role"
        {...register("role")}
        className={`form-control ${error ? "is-invalid" : ""}`}
      >
        <option value="paciente">Paciente</option>
        <option value="nutricionista">Nutricionista</option>
      </select>
      {error && <span className="invalid-feedback">{error.message}</span>}
    </div>
  );
};

export default Select;
