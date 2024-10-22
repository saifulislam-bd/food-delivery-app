import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { FC, useState, useRef, ChangeEvent, KeyboardEvent } from "react";

const VerifyEmail: FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
    // move to the next otp field when  a digit is entered
    if (value !== "" && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };
  // move to the previous otp field when  a digit is deleted
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const loading = false;

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="p-8 rounded-md max-w-md flex flex-col gap-10 border border-gray-200">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Verify your email</h1>
          <p className="text-sm text-gray-600">
            Enter the six digit code sent to your email
          </p>
        </div>
        <form className="">
          <div className="flex justify-between gap-2">
            {otp.map((letter: string, idx: number) => (
              <Input
                key={idx}
                ref={(element) =>
                  (inputRef.current[idx] = element as HTMLInputElement)
                }
                type="text"
                maxLength={1}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(idx, e.target.value)
                }
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(idx, e)
                }
                value={letter}
                className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
          {loading ? (
            <Button
              disabled
              className="w-full bg-orange hover:bg-hoverOrange mt-6"
            >
              <Loader2 className="h-4 w-4 mr-2  animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-orange hover:bg-hoverOrange mt-6"
            >
              Verify
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};
export default VerifyEmail;
