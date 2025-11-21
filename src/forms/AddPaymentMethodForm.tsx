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
import { CreditCard } from 'lucide-react';

const paymentMethodSchema = z.object({
  nameOnCard: z.string().min(2, { message: 'Name on card is required' }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: 'Invalid card number' }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Invalid expiry date (MM/YY)' }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: 'Invalid CVC' }),
});

export function AddPaymentMethodForm({ onSuccess }: { onSuccess?: () => void }) {
  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      nameOnCard: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  function onSubmit(values: z.infer<typeof paymentMethodSchema>) {
    console.log(values);
    if (onSuccess) {
      onSuccess();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="nameOnCard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name on Card</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input placeholder="****************" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input placeholder="MM/YY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>CVC</FormLabel>
                <FormControl>
                  <Input placeholder="***" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Add Payment Method
        </Button>
      </form>
    </Form>
  );
}

export function AddPaymentMethodFormDialog() {
  return (
    <FormWrapper
      title="Add Payment Method"
      description="Enter your new payment details."
      size="md"
      trigger={
        <Button>
          <CreditCard className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      }
    >
      <AddPaymentMethodForm />
    </FormWrapper>
  );
}
