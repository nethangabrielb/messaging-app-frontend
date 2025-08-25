import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { FormProps } from "@/types/formProps";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

const RegistrationSchema = z.object({
  email: z.email().min(1),
  username: z.string().min(1).trim().nonempty(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

type RegisterDetails = z.infer<typeof RegistrationSchema>;

export function RegisterForm({ ...props }: Readonly<FormProps>) {
  const [passwordsEqual, setPasswordsEqual] = useState<boolean>(true);

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

    // Check if both passwords are not the same
    if (values.password !== values.confirmPassword) {
      setPasswordsEqual(false);
      return;
    }

    console.log(values);
  };

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
              <p className="text-red-500 text-[9px] translate-y-[4px]">
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
            className={clsx(errors.email && "border-red-500 !ring-red-500")}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex justify-between">
            <Label htmlFor="username">Username</Label>
            {errors.username && (
              <p className="text-red-500 text-[9px] translate-y-[4px]">
                Username can't be empty
              </p>
            )}
          </div>
          <Input
            {...register("username")}
            id="username"
            type="username"
            required
            className={clsx(errors.username && "border-red-500 !ring-red-500")}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            {errors.password ? (
              <p className="text-red-500 text-[9px] translate-y-[4px]">
                Passwords must be at least 8 characters
              </p>
            ) : (
              !passwordsEqual && (
                <p className="text-red-500 text-[9px] translate-y-[4px]">
                  Passwords do not match
                </p>
              )
            )}
          </div>
          <Input
            {...register("password")}
            id="password"
            type="password"
            required
            className={clsx(
              errors.password ||
                (!passwordsEqual && "border-red-500 !ring-red-500")
            )}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex justify-between">
            <Label htmlFor="confirmPassword" className="w-fit">
              Confirm Password
            </Label>
            {errors.confirmPassword ? (
              <p className="text-red-500 text-[9px] translate-y-[4px]">
                Passwords must be at least 8 characters
              </p>
            ) : (
              !passwordsEqual && (
                <p className="text-red-500 text-[9px] translate-y-[4px]">
                  Passwords do not match
                </p>
              )
            )}
          </div>
          <Input
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
            required
            className={clsx(
              errors.confirmPassword ||
                (!passwordsEqual && "border-red-500 !ring-red-500")
            )}
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
