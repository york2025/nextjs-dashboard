"use server";

import postgres from "postgres";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from 'next-auth'
import { defaultMaxListeners } from "events";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({ invalid_type_error: "Please select a customer" }),
  amount: z.coerce.number().gt(0, "Please enter an amount greater than 0$"),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select a invoice status",
  }),
  date: z.string(),
});
export type State = {
  errors?: { customerId?: string[]; amount?: string[]; status?: string[] };
  message?: string | null;
};

const CreateInvoice = FormSchema.omit({ id: true, date: true });

const UpdateVoice = FormSchema.omit({ id: true, date: true });
export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountIncents = amount * 100;
  const date = new Date().toLocaleString();

  try {
    await sql`insert into invoices (customer_id, amount, status, date) values (${customerId}, ${amountIncents}, ${status}, ${date})`;
  } catch (error) {
    console.log(error);
    return { message: "Database error, failed to create invoice" };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateVoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountIncents = amount * 100;
  try {
    await sql`update invoices set customer_id = ${customerId}, amount = ${amountIncents}, status = ${status} where id = ${id}`;
  } catch (error) {
    console.log(error);
    return { message: "Database error, failed to update invoice" };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  await sql`delete from invoices where id = ${id}`;
  revalidatePath("/dashboard/invoices");
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return "Invalid credentials"
        default:
          return "Something went wrong"
      }
    }
    throw error
  }
}
