import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormProps } from "@/types/formProps";

export function RegisterForm({ ...props }: Readonly<FormProps>) {
  return (
    <form
      className={"flex flex-col gap-6"}
      onSubmit={props.handleSubmit(props.onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create a new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to get started
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            {...props.register("email")}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            {...props.register("username")}
            id="username"
            type="username"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            {...props.register("password")}
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
            {...props.register("confirmPassword")}
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
            props.reset();
          }}
        >
          Log in
        </button>
      </div>
    </form>
  );
}
