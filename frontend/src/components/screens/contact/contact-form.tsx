'use client';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { postContactForm } from '@/api/contactPage';
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
import { Textarea } from '@/components/ui/textarea';

export const ContactForm = () => {
  const { toast } = useToast();
  const formSchema = z.object({
    email: z.string().email({
      message: 'Please enter a valid email address',
    }),
    message: z.string().min(10, {
      message: 'Message must be at least 10 characters long',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      message: '',
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      const res = await postContactForm(data);
      console.log(res);
      toast({
        title: 'Successfully!',
        description: 'Your message has been sent successfully',
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error!',
        description: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-[40rem] space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="IssacNewton@gmail.com" {...field} />
              </FormControl>
              {/* <FormDescription>we'll never share your email.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="If a thing is not moving, then it will not move unless something moves it"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>Please enter a message.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
