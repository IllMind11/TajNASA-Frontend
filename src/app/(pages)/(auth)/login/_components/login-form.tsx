'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useLogin } from '@/api/auth/use-login';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.string().email(),

  password: z.string().min(1, 'Required'),
});

export function LoginForm() {
  const router = useRouter();
  const { mutate: login, isLoading } = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(
      { ...values },
      {
        // eslint-disable-next-line consistent-return
        onError: (error) => {
          if (error.response.status === 401) {
            form.setError('email', { message: '' });
            return form.setError('password', {
              message: 'Email or Password does not match with our records.',
            });
          }

          form.setError('email', { message: '' });
          form.setError('email', { message: 'Unexpected Error!' });
        },

        onSuccess: (data) => {
          document.cookie = `token=${data.token}`;
          router.replace('/');
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          loading={isLoading}
          size="lg"
          className="mt-6 w-full font-semibold"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
