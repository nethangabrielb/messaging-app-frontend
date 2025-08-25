import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormProps } from "@/types/formProps";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const RegistrationSchema = z.object({
  email: z.email().min(1),
  username: z.string().min(1).trim().nonempty(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

type RegisterDetails = z.infer<typeof RegistrationSchema>;

export function RegisterForm({ ...props }: Readonly<FormProps>) {
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterDetails>({
    resolver: zodResolver(RegistrationSchema),
  });

  const onSubmit = () => {
    const values = getValues();
    console.log(values);
  };

  console.log(errors);

  return (
    <form className={"flex flex-col gap-6"} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create a new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to get started
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="flex justify-between">
            <Label htmlFor="email">Email</Label>
            {errors.email && (
              <p className="text-red-500 text-[10px] translate-y-[4px]">
                Email can't be empty
              </p>
            )}
          </div>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex justify-between">
            <Label htmlFor="username">Username</Label>
            {errors.username && (
              <p className="text-red-500 text-[10px] translate-y-[4px]">
                Username can't be empty and must have a minimum of 6 characters
              </p>
            )}
          </div>
          <Input
            {...register("username")}
            id="username"
            type="username"
            required
          />
        </div>
        <div className="grid gap-3">
          <div>
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            {...register("password")}
            id="password"
            type="password"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
          </div>
          <Input
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <button
          className="underline underline-offset-4 cursor-pointer"
          onClick={() => {
            props.setForm("login");
            reset();
          }}
        >
          Log in
        </button>
      </div>
    </form>
  );
}
