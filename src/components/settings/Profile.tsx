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
      console.log(values);

      formData.append("username", values.username.toString());
      formData.append("bio", values.bio?.toString() ?? "");
      formData.append("file", values.file ?? "");

      return fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users/${user?.data[0]?.id}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token") as string
            )}`,
          },
          body: formData,
        }
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
      className="flex justify-around w-full gap-4 p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4 max-w-full">
        <div className="flex flex-col gap-1">
          <Label className="font-extralight ml-1 text-sm">Username</Label>
          <Input
            className="font-light"
            {...register("username")}
            // value={user?.data[0].username}
          ></Input>
          {errors.username && (
            <p className="text-red-500 text-[9px] translate-y-[4px] translate-x-[4px]">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label className="font-extralight ml-1 text-sm">Bio</Label>
          <Textarea
            // value={user?.data[0].bio}
            className="font-light w-[234px]"
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
          className="w-[150px] h-[150px] rounded-full relative hover:bg-neutral-500 hover:opacity-70"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={avatarUploadHandler}
        >
          <img
            src={`${
              filePreview
                ? URL.createObjectURL(filePreview)
                : `${import.meta.env.VITE_R2_PUBLIC_URL}/${
                    user?.data[0].avatar
                  }`
            }`}
            alt="user avatar"
            className="w-[150px] h-[150px] rounded-full object-cover"
          />
          <Pencil
            className={clsx(
              "absolute top-[40%] left-[40%] size-[32px]",
              hover ? "!opacity-100 visible stroke-white" : "invisible"
            )}
            ref={editAvatarBtn}
          ></Pencil>
        </button>
        <p className="font-light text-sm">Profile avatar</p>
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
