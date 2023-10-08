import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import type { Dispatch, SetStateAction } from 'react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCountries } from '@/api/common/use-countries';
import { useUpdateUser } from '@/api/common/use-update-user';
import type { User } from '@/api/types';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  photo: z.any(),

  firstname: z
    .string()
    .min(1, 'Required')
    .min(2, 'Name should be at least 2 characters'),

  lastname: z
    .string()
    .min(1, 'Required')
    .min(2, 'Last Name should be at least 2 characters'),

  gender: z.coerce.number().positive({ message: 'Required' }),

  country: z.coerce.number().positive({ message: 'Required' }),

  email: z.string().email(),

  password: z
    .union([
      z
        .string()
        .length(0, { message: 'Password should be at least 6 characters' }),
      z.string().min(6),
    ])
    .optional()
    .transform((e: any) => (e === '' ? undefined : e)),

  phone: z.coerce
    .number()
    .positive({ message: 'Required' })
    .min(12345, 'Phone number should contain at least 5 numbers')
    .max(123456789012, 'Phone number should be less than 12'),
});

type UpdateUserFormProps = {
  user: User;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export function UpdateUserForm({ user, setDialogOpen }: UpdateUserFormProps) {
  const router = useRouter();

  const { mutate: updateUser, isLoading } = useUpdateUser({
    onSuccess: () => {
      router.refresh();
      setDialogOpen(false);
    },
  });
  const { data: countries } = useCountries();

  const imageRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photo: '',
      firstname: user.firstname,
      lastname: user.lastname,
      gender: Number(user.gender),
      country: Number(user.country),
      email: user.email,
      phone: Number(user.phone),
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateUser({ ...values, photo: imageRef?.current?.files?.[0] || null });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-5">
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input
                    accept="image/*"
                    type="file"
                    {...field}
                    ref={imageRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Male</SelectItem>
                    <SelectItem value="2">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries?.data.map((country) => (
                      <SelectItem
                        key={country.id}
                        value={country.id.toString()}
                      >
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="000000000"
                    {...field}
                    value={field.value ?? ''}
                  />
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
                  <Input
                    type="password"
                    placeholder="*****"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          loading={isLoading}
          size="lg"
          variant="outline"
          className="mt-6 w-full font-semibold"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
