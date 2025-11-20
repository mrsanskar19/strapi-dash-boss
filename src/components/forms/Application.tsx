import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

// Updated Zod schema
const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().optional(),
  frontendLink: z.string().url({ message: "Enter a valid URL." }).optional(),
  owner: z.string().min(2, { message: "Owner name must be at least 2 characters." }),
  team: z.array(z.string().min(1, { message: "Team member name required." })).optional(),
});

export function ApplicationForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      frontendLink: "",
      owner: "",
      team: [],
    },
  });

  // Dynamic team member fields
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "team",
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="A project management tool" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="frontendLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frontend Website Link</FormLabel>
              <FormControl>
                <Input placeholder="https://projectfrontend.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner</FormLabel>
              <FormControl>
                <Input placeholder="Owner's Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Dynamic Team Members */}
        <div>
          <FormLabel>Team</FormLabel>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center mb-2">
              <FormField
                control={form.control}
                name={`team.${index}`}
                render={({ field }) => (
                  <FormControl>
                    <Input placeholder={`Team member #${index + 1}`} {...field} />
                  </FormControl>
                )}
              />
              <Button type="button" variant="outline" onClick={() => remove(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            
            onClick={() => append("")}
            className="mt-2"
          >
            Add Team Member
          </Button>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
