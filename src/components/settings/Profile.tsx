import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import useUser from "@/hooks/useUser";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ProfileInputRow = ({
  label,
  value,
  bio,
}: {
  label: string;
  value: string;
  bio: boolean;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Label className="font-extralight ml-1 text-sm">{label}</Label>
      {!bio ? (
        <Input value={value} className="font-light"></Input>
      ) : (
        <Textarea value={value} className="font-light"></Textarea>
      )}
    </div>
  );
};

const Profile = () => {
  const { user } = useUser();

  return (
    <form className="flex justify-around w-full gap-4 p-4 ">
      <div className="flex flex-col gap-4">
        <ProfileInputRow
          label="Username"
          value={user?.data[0].username}
          bio={false}
        ></ProfileInputRow>
        <ProfileInputRow
          label="Bio"
          value={user?.data[0].bio}
          bio={true}
        ></ProfileInputRow>
        <Button className="w-fit">Update profile</Button>
      </div>

      <div className="flex flex-col items-center gap-2">
        <img
          src={`${import.meta.env.VITE_R2_PUBLIC_URL}/${user?.data[0].avatar}`}
          alt="user avatar"
          className="w-[150px] h-auto rounded-full object-contain"
        />
        <p className="font-light text-sm">Profile avatar</p>
      </div>
    </form>
  );
};

export default Profile;
