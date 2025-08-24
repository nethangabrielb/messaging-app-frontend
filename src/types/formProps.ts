import type {
  FieldValues,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";

type FormProps = {
  setForm: React.Dispatch<React.SetStateAction<"login" | "register">>;
  register: UseFormRegister<FieldValues>;
  reset: UseFormReset<FieldValues>;
};

export type { FormProps };
