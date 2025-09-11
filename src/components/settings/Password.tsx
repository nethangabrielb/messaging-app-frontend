import useUser from "@/hooks/useUser";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const PasswordSchema = z
  .object({
    password: z
      .string({ error: "Current password can't be empty" })
      .min(8, { message: "Password fields must have 8 characters minimum" })
      .nullable(),
    newPassword: z
      .string()
      .min(8, { message: "Password field must have 8 characters minimum" })
      .refine((val) => val.trim().length >= 1, {
        message: "New password can't be empty",
      }),
    confirmNewPassword: z
      .string()
      .min(8, { message: "Password field must have 8 characters minimum" })
      .refine((val) => val.trim().length >= 1, {
        message: "New password can't be empty",
      }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password did not match",
    path: ["confirmNewPassword"],
  });

type Password = z.infer<typeof PasswordSchema>;

const Password = () => {
  const [serverError, setServerError] = useState<null | string>(null);
  const { user } = useUser();
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: () => {
      const values = getValues();
      return fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users/${
          user?.data[0].id
        }?editPassword=true`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token") as string
            )}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
    },
    onSuccess: async (res) => {
      const data = await res.json();
      if (data.status === 401) {
        setServerError(data.message);
      } else {
        toast.success(data.message);
        reset();
        setServerError(null);
      }
    },
    onError: () => {
      toast.error(
        "There is an unexpected error in the server. Please try again!"
      );
    },
  });

  const onSubmit = () => {
    mutation.mutate();
  };

  return (
    <form
      className="flex flex-col justify-start gap-4 p-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-fit flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label className="font-extralight ml-1 text-sm">
            Current password
          </Label>
          <Input
            type="password"
            className={clsx(
              "font-light",
              errors.password || (serverError && "border-red-500 !ring-red-500")
            )}
            {...register("password")}
            onChange={() => {
              if (serverError) {
                setServerError(null);
              }
            }}
          ></Input>
          {errors.password && (
            <p className="text-red-500 text-[9px] translate-y-[4px] translate-x-[4px]">
              {errors.password.message}
            </p>
          )}
          {serverError && (
            <p className="text-red-500 text-[9px] translate-y-[4px] translate-x-[4px]">
              {serverError}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label className="font-extralight ml-1 text-sm">New Password</Label>
          <Input
            type="password"
            className={clsx(
              "font-light",
              errors.newPassword && "border-red-500 !ring-red-500"
            )}
            {...register("newPassword")}
          ></Input>
          {errors.newPassword && (
            <p className="text-red-500 text-[9px] translate-y-[4px] translate-x-[4px]">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label className="font-extralight ml-1 text-sm">
            Confirm new password
          </Label>
          <Input
            type="password"
            className={clsx(
              "font-light",
              errors.confirmNewPassword && "border-red-500 !ring-red-500"
            )}
            {...register("confirmNewPassword")}
          ></Input>
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-[9px] translate-y-[4px] translate-x-[4px]">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>
        <Button type="submit" disabled={mutation.isPending}>
          Change password
        </Button>
      </div>
    </form>
  );
};

export default Password;
