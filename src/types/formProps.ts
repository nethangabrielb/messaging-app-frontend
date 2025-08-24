import type {
  FieldValues,
  UseFormRegister,
  UseFormReset,
  UseFormHandleSubmit,
} from "react-hook-form";

type FormProps = {
  setForm: React.Dispatch<React.SetStateAction<"login" | "register">>;
  register: UseFormRegister<FieldValues>;
  reset: UseFormReset<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>;
  onSubmit: () => void;
};

export type { FormProps };
