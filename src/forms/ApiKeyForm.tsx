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

const apiKeySchema = z.object({
  name: z.string().min(2, { message: 'API key name must be at least 2 characters' }),
  permissions: z.string().optional(),
});

export function ApiKeyForm() {
  const form = useForm<z.infer<typeof apiKeySchema>>({
    resolver: zodResolver(apiKeySchema),
    defaultValues: {
      name: '',
      permissions: 'read-only',
    },
  });

  function onSubmit(values: z.infer<typeof apiKeySchema>) {
    console.log(values);
    // Handle API key creation logic here
  }

  return (
    <FormWrapper
      title="Create API Key"
      description="Enter a name for your new API key."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Key Name</FormLabel>
                <FormControl>
                  <Input placeholder="My new API key" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Add more fields for permissions, etc. if needed */}
          <Button type="submit" className="w-full">
            Create API Key
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
