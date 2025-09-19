import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import useUser from "@/hooks/useUser";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const ProfileSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username can't be empty" })
    .refine((val) => val.trim().length >= 1, {
      message: "Username can't be empty",
    }),
  bio: z.string().nullable(),
  email: z
    .email()
    .min(1, { message: "Email can't be empty" })
    .refine((val) => val.trim().length >= 1, {
      message: "Username can't be empty",
    }),
  file: z
    .file()
    .refine((file) => file.size <= 2097152, {
      error: "Avatar must be 2MB or smaller.",
    })
    .optional(),
});

type Profile = z.infer<typeof ProfileSchema>;

const Profile = () => {
  const { user } = useUser();
  const [hover, setHover] = useState<boolean>(false);
  const [filePreview, setFilePreview] = useState<File | null>(null);
  const editAvatarBtn = useRef<SVGSVGElement | null>(null);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>({
    defaultValues: {
      username: user?.data[0]?.username,
      bio: user?.data[0]?.bio,
      file: undefined,
    },
    resolver: zodResolver(ProfileSchema),
  });
  const mutator = useMutation({
    mutationFn: () => {
      const values = getValues();
      const formData = new FormData();

      formData.append("username", values.username.toString());
      formData.append("bio", values.bio?.toString() ?? "");
      formData.append("file", values.file ?? "");

      return fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users/${user?.data[0]?.id}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token") as string,
            )}`,
          },
          body: formData,
        },
      );
    },
    onSuccess: async (res) => {
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    },
  });

  useEffect(() => {
    setValue("username", user?.data[0]?.username);
    setValue("bio", user?.data[0]?.bio);
    setValue("email", user?.data[0]?.email);
  }, [user]);

  const avatarUploadHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    avatarInputRef?.current?.click();
  };

  const uploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].size <= 2097152) {
        setValue("file", e.target.files[0], { shouldValidate: true });
        setFilePreview(e.target.files[0]);
      } else {
        toast.error("Avatar must be 2MB or smaller.");
      }
    }
  };

  const onSubmit = () => {
    mutator.mutate();
  };

  return (
    <form
      className="flex w-full flex-col-reverse items-center justify-end gap-4 p-4 text-center md:flex-row md:items-start md:justify-around md:text-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex max-w-full flex-col items-center gap-4 md:items-start">
        <div className="flex flex-col gap-1">
          <Label className="ml-1 text-center text-sm font-extralight">
            Username
          </Label>
          <Input className="font-light" {...register("username")}></Input>
          {errors.username && (
            <p className="translate-x-[4px] translate-y-[4px] text-[9px] text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label className="ml-1 text-sm font-extralight">Email</Label>
          <Input className="font-light" {...register("email")}></Input>
          {errors.email && (
            <p className="translate-x-[4px] translate-y-[4px] text-[9px] text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label className="ml-1 text-sm font-extralight">Bio</Label>
          <Textarea
            className="w-[234px] font-light"
            {...register("bio")}
          ></Textarea>
        </div>
        <Button
          className="w-fit"
          disabled={(errors.username && true) || mutator.isPending}
        >
          Update profile
        </Button>
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          className="relative h-[150px] w-[150px] rounded-full hover:bg-neutral-500 hover:opacity-70"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={avatarUploadHandler}
        >
          <img
            src={`${
              filePreview
                ? URL.createObjectURL(filePreview)
                : user?.data[0].avatar
                  ? `${import.meta.env.VITE_R2_PUBLIC_URL}/${
                      user?.data[0].avatar
                    }`
                  : "default.jpg"
            }`}
            alt="user avatar"
            className="h-[150px] w-[150px] rounded-full object-cover"
          />
          <Pencil
            className={clsx(
              "absolute top-[40%] left-[40%] size-[32px]",
              hover ? "visible stroke-white !opacity-100" : "invisible",
            )}
            ref={editAvatarBtn}
          ></Pencil>
        </button>
        <p className="text-sm font-light">Profile avatar</p>
        <Input
          type="file"
          name="avatar"
          id="avatar"
          className="invisible"
          ref={avatarInputRef}
          onChange={uploadAvatar}
          accept="image/*"
        />
      </div>
    </form>
  );
};

export default Profile;
