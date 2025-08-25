import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormProps } from "@/types/formProps";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

type LoginDetails = z.infer<typeof LoginSchema>;

const LoginSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(8),
});

export function LoginForm({ ...props }: Readonly<FormProps>) {
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginDetails>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = () => {
    const values = getValues();
    console.log(values);
  };

  console.log(errors);

  return (
    <form className={"flex flex-col gap-6"} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {errors.password && (
              <p className="text-red-500 text-[9px] translate-y-[4px]">
                Password must be at least 8 characters
              </p>
            )}
          </div>
          <Input
            {...register("password")}
            id="password"
            type="password"
            required
            className={clsx(errors.password && "border-red-500 !ring-red-500")}
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <button
          className="underline underline-offset-4 cursor-pointer"
          onClick={() => {
            props.setForm("register");
            reset();
          }}
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
