"use client";

import { SigninForm } from "@/src/components/auth/signin-form.component";
import React from "react";

export default function SigninPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SigninForm />
    </div>
  );
}
