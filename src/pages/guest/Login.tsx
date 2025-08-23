import { useState } from "react";
import { MessageCircle } from "lucide-react";

import { LoginForm } from "@/components/forms/LoginForm";
import { RegisterForm } from "@/components/forms/RegisterForm";

export default function LoginPage() {
  // Add react-hook-form and tanstack query logic for login and registration
  const [form, setForm] = useState<"login" | "register">("login");

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <p className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <MessageCircle className="size-4" />
            </div>
            WhisperChat
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {form === "login" ? (
              <LoginForm setForm={setForm} />
            ) : (
              form === "register" && (
                <RegisterForm setForm={setForm}></RegisterForm>
              )
            )}
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/graphics.gif"
          alt="Login placeholder"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.9] dark:grayscale"
        />
      </div>
    </div>
  );
}
