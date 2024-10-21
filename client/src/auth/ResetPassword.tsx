import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole } from "lucide-react";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword: FC = () => {
  const loading = false;
  const [newPassword, setNewPassword] = useState<string>("");
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <form className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg mx-4">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Reset Password</h1>
          <p className="text-sm text-gray-600">
            Enter your new password to reset old one
          </p>
        </div>
        <div className="relative w-full">
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            className="pl-10"
          />
          <LockKeyhole className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
        </div>
        {loading ? (
          <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full bg-orange hover:bg-hoverOrange"
          >
            Reset Password
          </Button>
        )}
        <span className="text-center">
          Back to{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ResetPassword;
