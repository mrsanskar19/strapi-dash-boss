import { SignupForm } from '@/forms/SignupForm';
import { ApplicationForm } from '@/forms/ApplicationForm';
import { FormWrapper } from '@/forms/FormWrapper';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { BillingAddressFormDialog } from '@/forms/BillingAddressForm';
import { AddPaymentMethodFormDialog } from '@/forms/AddPaymentMethodForm';
import { DeletePaymentMethodAlertDialog } from '@/forms/DeletePaymentMethodAlert';

export default function Signup() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <SignupForm />

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <FormWrapper
          title="Create New Application"
          description="Give your new application a name and a description."
          onClose={() => console.log('Application form closed')}
          size="lg"
          trigger={
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Application
            </Button>
          }
        >
          <ApplicationForm onSuccess={() => console.log('Application created!')} />
        </FormWrapper>

        <BillingAddressFormDialog />
        <AddPaymentMethodFormDialog />
        <DeletePaymentMethodAlertDialog onDelete={() => console.log('Payment method deleted!')} />
      </div>
    </div>
  );
}
