import Button from "@/components/ui/button/Button";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TextAreaInput from "@/components/form/form-elements/TextAreaInput";
import { Metadata } from "next";
import React from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import {getToken} from "@/app/lib/sessions";

export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function FormElements() {
    async function handleSubmit(formData: FormData) {
        'use server'

        const rawFormData = Object.fromEntries(formData)
        console.log('token in page')
        const token = await getToken()

        console.log(token)
        console.log(rawFormData)

        const response = await fetch('http://localhost:3000/api/dashboard/administration/farmers',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rawFormData)
        })

    }
  return (
    <div>
      <PageBreadcrumb pageTitle="Detalle" />
      <div className="grid grid-cols-1 gap-y-6">
          <form action={handleSubmit}>
            <div className="grid md:grid-cols-2 md:gap-10 gap-y-4">
                <div>
                    <Label>Nombre</Label>
                    <Input type="text" name="name"/>
                </div>
                <div>
                    <Label>Apellido</Label>
                    <Input type="text" name="last_name" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-y-6">
              <div>
                  <Label>CUIT</Label>
                  <Input type="text" name="cuit"/>
              </div>
              <div className="grid md:grid-cols-2 md:gap-10 gap-y-4">
                  <div>
                      <Label>Usuario productor ai-agro</Label>
                      <Input type="text" />
                  </div>
                  <div>
                      <Label>Código externo</Label>
                      <Input type="text" name="ext_code"/>
                  </div>
              </div>
              <div>
                  <Label>Observaciones</Label>
                  <TextAreaInput />
              </div>
          </div>
          <div className="flex justify-end">
              <Button className="float-right">Guardar productor</Button>
          </div>
          </form>
      </div>
    </div>
  );
}
