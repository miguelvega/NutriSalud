import { ReactNode } from "react";

interface Props {
  label?: string;
  color: string;
  parentMethod: () => void;
  children: ReactNode;
}

export const Button = ({ label, color, parentMethod, children }: Props) => {
  return (
    <button>
      {label}
      {children}
    </button>
  );
};
