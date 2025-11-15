"use server";

import postgres from "postgres";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

const UpdateVoice = FormSchema.omit({ id: true, date: true });
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
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

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateVoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountIncents = amount * 100;
  try {
    await sql`update invoices set customer_id = ${customerId}, amount = ${amountIncents}, status = ${status} where id = ${id}`;
  } catch (error) {
    console.log(error);
    // return { message: "Database error, failed to update invoice" };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  await sql`delete from invoices where id = ${id}`;
  revalidatePath("/dashboard/invoices");
}
