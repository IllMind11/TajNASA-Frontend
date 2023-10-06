import { RegisterForm } from './_components/register-form';

export default function Register() {
  return (
    <div className="container grid min-h-[65vh] place-items-center">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card/5 p-5 backdrop-blur-[1.7px] md:p-10">
        <h1 className="mb-5 w-full text-center text-2xl font-semibold">
          Register
        </h1>

        <RegisterForm />
      </div>
    </div>
  );
}
