"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // -------------------------
  // Email + Password Login
  // -------------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("Logging in with:", email, password);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("Login response:", data, error);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Successfully logged in
    window.location.href = "/";
  };

  // -------------------------
  // Google Login
  // -------------------------
  const loginWithGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `/homepage`,
        },
      });
    } catch (err) {
      console.error("Google login error", err);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleLogin} className="p-6 md:p-8">
            <FieldGroup>
              {/* Heading */}
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold text-teal-700">
                  Welcome back
                </h1>
                <p className="text-muted-foreground">Login to your account</p>
              </div>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>

              {/* Error message */}
              {error && <p className="text-red-600 text-sm">{error}</p>}

              {/* Login button */}
              <Field>
                <Button
                  className="cursor-pointer bg-teal-700 hover:bg-teal-800"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Field>

              <FieldSeparator>Or continue with</FieldSeparator>

              {/* Google Login */}
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  className="cursor-pointer hover:text-teal-700 hover:border-teal-700 gap-2"
                  onClick={loginWithGoogle}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>

              {/* Link to signup */}
              <FieldDescription className="text-center">
                Don’t have an account?{" "}
                <a href="/signup" className="hover:text-teal-800">
                  Sign up
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* Right Image */}
          <div className="bg-muted relative hidden md:block">
            <img
              src="/signin-image.webp"
              alt="Image"
              className="absolute inset-0 w-full object-cover dark:brightness-[0.2] dark:grayscale mt-7"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By logging in, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
