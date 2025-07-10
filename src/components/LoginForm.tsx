import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Alert,
  AlertTitle,
} from "./ui/alert";
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useAuth } from "../hooks/useAuth"
import { AlertCircleIcon } from "lucide-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    if (data.email != 'admin@gmail.com' && data.password != 'admin') {
      setErrorMessage('Email Or Password Not Match!');
      return;
    }

    const token: string = crypto.randomUUID();
    login(token);
    navigate('/products');
    return;
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
          </form>
          {errorMessage && (
            <div className="grid w-full max-w-xl items-start gap-4 mt-4">
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle className="font-semibold">{errorMessage}</AlertTitle>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
