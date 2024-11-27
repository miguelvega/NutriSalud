import { Control, Controller, FieldError, Path } from "react-hook-form";
import { FormValues } from "../../model";
import "./Input.css";

interface Props {
  name: Path<FormValues>;
  control: Control<FormValues>;
  label: string;
  step?: number;
  min?: number;
  max?: number;
  type?: string;
  error?: FieldError;
}

const Input = ({
  name,
  control,
  label,
  type,
  error,
  step,
  min,
  max,
}: Props) => {
  return (
    <div className="form-group">
      <label className="label-signup" htmlFor={name}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            step={step}
            min={min}
            max={max}
            {...field}
            onChange={(e) => {
              if (type === "number") {
                field.onChange(
                  e.target.value ? parseFloat(e.target.value) : ""
                );
              } else {
                field.onChange(e.target.value);
              }
            }} // Convert to number
            className={`form-control ${error ? "is-invalid" : ""} `}
          />
        )}
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
};

export default Input;
