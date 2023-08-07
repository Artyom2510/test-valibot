'use client';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { type Output, object, string, minLength, email } from 'valibot';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const formSchema = object({
  email: string('Your email must be a string.', [
    minLength(1, 'Please enter your email.'),
    email('The email address is badly formatted.'),
  ]),
  password: string('Your password must be a string.', [
    minLength(1, 'Please enter your password.'),
    minLength(8, 'You password must have 8 characters or more.'),
  ]),
});

type FormSchema = Output<typeof formSchema>;

export default function Home() {
  const [open, setOpen] = useState(false);
  const form = useForm<FormSchema>({
    resolver: valibotResolver(formSchema),
    mode: 'onBlur',
  });
  const { control, handleSubmit } = form;

  const handleTglDialog = () => {
    setOpen(prev => !prev);
  };

  const onSubmit = (values: FormSchema) => {
    handleTglDialog();
  };

  return (
    <>
      <div className='mx-auto w-96 pt-8'>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
            <h3>Test Valibot</h3>
            <FormField
              control={control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </div>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>How is it different from Zod?</AlertDialogTitle>
            <AlertDialogDescription>
              The functionality of Valibot is very similar to Zod. The biggest
              difference is the modular design of our API and the ability to
              reduce the bundle size to a minimum through code splitting.
              Depending on the schema, Valibot can reduce the bundle size up to
              98% compared to Zod. Especially for client-side validation of
              forms, this can be a big advantage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleTglDialog}>
              Okay
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
