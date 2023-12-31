'use client';

import { LoginForm } from './_components/login-form';

export default function Register() {
  return (
    <div className="container grid min-h-[65vh] place-items-center">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-5 backdrop-blur-[1.7px] md:p-10">
        <h1 className="mb-5 w-full text-center text-2xl font-semibold">
          Login
        </h1>

        <LoginForm />

        <div className="mt-5">
          <p>Demo User:</p>
          <p>
            Email: <strong>admin@admin.com</strong>
          </p>
          <p>
            Password: <strong>password</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
