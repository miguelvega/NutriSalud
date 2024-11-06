import "./Input.css";

interface Props {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ label, type, value, onChange }: Props) => {
  return (
    <div className="box-input">
      <h3 className="label-input">{label}</h3>
      <input
        type={type}
        className="input-base"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
