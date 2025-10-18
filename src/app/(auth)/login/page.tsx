/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/authSlice";

// ✅ Zod schema for login validation
const loginFormValidation = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
});

// ✅ Default form values
const loginFormDefaultValue = {
  email: "",
};

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loginUser, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormValidation),
    defaultValues: loginFormDefaultValue,
  });

  const onSubmit = async (values: FieldValues) => {
    const toastId = toast.loading("Logging you in...");
    try {
      const response = (await loginUser(values).unwrap()) as any;
      toast.success(response?.message || "Login successful", { id: toastId });
      dispatch(setUser({ token: response?.token }));
      router.replace("/products");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Invalid credentials", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-semibold text-[#373240] mb-1">Login</h3>
          <p className="text-[#373240]/60 text-base">
            Please enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              disabled={isLoading}
              className={`mt-1 ${
                errors.email ? "border-red-500 focus:ring-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading} className="w-full mt-3 ">
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
