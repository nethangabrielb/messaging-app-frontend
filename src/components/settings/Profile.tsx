import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import useUser from "@/hooks/useUser";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";

const Profile = () => {
  const { user } = useUser();
  const [hover, setHover] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const editAvatarBtn = useRef<SVGSVGElement | null>(null);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const { watch, getValues, setValue, register, handleSubmit } = useForm({
    defaultValues: {
      username: user?.data[0]?.username,
      bio: user?.data[0]?.bio,
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
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = () => {
    const values = getValues();
    console.log(values);
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
        </div>
        <div className="flex flex-col gap-1">
          <Label className="font-extralight ml-1 text-sm">Bio</Label>
          <Textarea
            // value={user?.data[0].bio}
            className="font-light w-[234px]"
            {...register("bio")}
          ></Textarea>
        </div>
        <Button className="w-fit">Update profile</Button>
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
              file
                ? URL.createObjectURL(file)
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
