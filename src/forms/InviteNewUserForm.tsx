import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormWrapper } from './FormWrapper';

const inviteUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  role: z.string().optional(),
});

export function InviteNewUserForm() {
  const form = useForm<z.infer<typeof inviteUserSchema>>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: '',
      role: 'viewer',
    },
  });

  function onSubmit(values: z.infer<typeof inviteUserSchema>) {
    console.log(values);
    // Handle invite user logic here
  }

  return (
    <FormWrapper
      title="Invite New User"
      description="Enter the email of the user you want to invite."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Add a role selector if you have different user roles */}
          <Button type="submit" className="w-full">
            Send Invitation
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
