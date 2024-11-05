import "./BoxInfo.css";

interface Props {
  title: string;
  information: string;
}

export const BoxInfo = ({ title, information }: Props) => {
  return (
    <div className="BoxInfo">
      <button className="TitleBoxInfo">{title}</button>
      <p className="TextBoxInfo">{information}</p>
    </div>
  );
};
