import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2, LockKeyhole, Mail, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
import logo from "../assets/logo.svg";
import { useUserStore } from "@/store/useUserStore";

const initialData = {
  fullName: "",
  email: "",
  password: "",
  contact: "",
};

const Signup: FC = () => {
  const [input, setInput] = useState<SignupInputState>(initialData);
  const [errors, setErrors] = useState<Partial<SignupInputState>>({});
  const { loading, signup } = useUserStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // form validation
    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      return;
    }

    //signup api implementation
    await signup(input);

    setInput(initialData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSignupSubmit}
        className="md:p-8 w-full max-w-md  md:border border-gray-200 rounded-lg mx-4"
      >
        <div className="mb-4 flex justify-center">
          <img src={logo} alt="logo" className="w-36" />
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              name="fullName"
              value={input.fullName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="pl-10 focus-visible:ring-1"
            />
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.fullName}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.email}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="pl-10 focus-visible:ring-1"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.password}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              value={input.contact}
              name="contact"
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="pl-10 focus-visible:ring-1"
            />
            <Phone className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.contact}</span>
            )}
          </div>
        </div>
        <div className="mb-10">
          {loading ? (
            <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-orange hover:bg-hoverOrange"
            >
              Signup
            </Button>
          )}
        </div>
        <Separator />
        <p className="mt-2">
          Already registered?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
