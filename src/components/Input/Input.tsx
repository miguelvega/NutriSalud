interface Props {
  label: string;
  type: string;
}

export const Input = ({ label, type }: Props) => {
  return (
    <div className="box-input">
      <h3 className="label-input">{label}</h3>
      <input type={type} className="input-base" />
    </div>
  );
};
