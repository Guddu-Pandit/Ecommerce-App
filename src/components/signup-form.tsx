"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function SignupPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [error, setError] = useState("");

const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  const form = e.target as HTMLFormElement;
  const name = (form.elements.namedItem("name") as HTMLInputElement).value;
  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
  const password = (form.elements.namedItem("password") as HTMLInputElement).value;

  // 1. Sign up user
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    setError(error.message);
    return;
  }

  // 2. Store name + email in profiles table
  if (data.user) {
    await supabase.from("profiles").insert({
      id: data.user.id,
      name,
      email,
    });
    console.log("User profile created");
  }

  router.push("/login");
};


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">

          {/* LEFT IMAGE */}
          <div className="bg-muted relative hidden md:block">
            <img
              src="/signin-image.webp"
              alt="Image"
              className="absolute inset-0 w-full object-cover dark:brightness-[0.2] dark:grayscale mt-7"
            />
          </div>

          {/* RIGHT FORM */}
          <form onSubmit={handleSignup} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold text-teal-700">Create New Account</h1>
                <p className="text-muted-foreground text-balance">
                  Sign up to start shopping with us
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="name"
                  placeholder="John Doe"
                  required
                  name="name"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  name="email"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" required 
                placeholder="password"
                name="password"
                />
              </Field>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Field>
                <Button className="cursor-pointer bg-teal-700 hover:bg-teal-800" type="submit">
                  Sign Up
                </Button>
              </Field>

              <FieldSeparator>
                Already have an account?
              </FieldSeparator>

              <FieldDescription className="text-center">
                <a href="/login" className="hover:text-teal-800">Login here</a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
