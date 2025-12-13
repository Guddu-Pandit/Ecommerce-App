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

// 👉 Dialog imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function SignupPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [error, setError] = useState("");
  const [successOpen, setSuccessOpen] = useState(false); // ✅ popup state

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        name,
        email,
      });

      // ✅ OPEN POPUP
      setSuccessOpen(true);
    }
  };

  return (
    <>
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
                  <h1 className="text-2xl font-bold text-teal-700">
                    Create New Account
                  </h1>
                  <p className="text-muted-foreground">
                    Sign up to start shopping with us
                  </p>
                </div>

                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input name="name" required placeholder="John Doe" />
                </Field>

                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input name="email" type="email" required />
                </Field>

                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input name="password" type="password" required />
                </Field>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <Button type="submit" className="bg-teal-700 hover:bg-teal-800">
                  Sign Up
                </Button>

                <FieldSeparator>Already have an account?</FieldSeparator>

                <FieldDescription className="text-center">
                  <a href="/login" className="hover:text-teal-800">
                    Login here
                  </a>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* ✅ SUCCESS POPUP */}
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle className="text-teal-700">
              Account Created Successfully 🎉
            </DialogTitle>
            <DialogDescription>
              Please check your email to verify your account.
            </DialogDescription>
          </DialogHeader>

          <Button
            className="mt-4 bg-teal-700 cursor-pointer hover:bg-teal-800"
            onClick={() => router.push("/login")}
          >
            Go to Login
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
