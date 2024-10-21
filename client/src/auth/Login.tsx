import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { LoginInputState, userLoginSchema } from "@/schema/userSchema";
import logo from "../assets/logo.svg";

const initialData = {
  email: "",
  password: "",
};

const Login: FC = () => {
  const [input, setInput] = useState<LoginInputState>(initialData);
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }
    console.log(input);
    setInput(initialData);
  };

  const loading = false;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleLoginSubmit}
        className="md:p-8 w-full max-w-md  md:border border-gray-200 rounded-lg mx-4"
      >
        <div className="mb-4 flex justify-center">
          <img src={logo} alt="logo" className="w-36" />
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
              Login
            </Button>
          )}
          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <Separator />
        <p className="mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
