import { Control, Controller, FieldError } from "react-hook-form";
import { FormValues } from "../../model";
import "./Input.css";

interface Props {
  name: keyof FormValues;
  control: Control<FormValues>;
  label: string;
  type?: string;
  error?: FieldError;
}

const Input = ({ name, control, label, type, error }: Props) => {
  return (
    <div className="form-group">
      <label className="label-login" htmlFor={name}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            {...field}
            className={`form-control ${error ? "is-invalid" : ""} `}
          />
        )}
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
};

export default Input;
