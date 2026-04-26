import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React, {Suspense} from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Alert from "@/components/ui/alert/Alert";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import {getToken} from "@/app/lib/sessions";
import api from "@/lib/axios";
import {save} from "@/app/actions/society/save";
import {revalidatePath} from "next/cache";

export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default async function FormElements() {
  const token = await getToken()
  let society = await getSociety()
  async function  getSociety() {
    return await api.get('/api/society/',
        {
          headers: {
            'Authorization': 'Bearer '+token.token,
          }
        })
        .then(res => {
          return res.data;
        })
        .catch(error => {
          return error.response;
        })
  }

    async function  handleSubmit(formData: FormData) {
      'use server'
      const response = await save({
        'name': formData.get('business_name'),
        'tax_id' : formData.get('tax_id'),
      })
      if (response.success) {
        revalidatePath('/dashboard/administration/society')
      }
    }

  return (
    <div>
      <PageBreadcrumb pageTitle="Sociedad" />
      <div>
            <div className="grid xs:grid-cols-1 gap-y-6 xl:grid-cols-2 md:grid-cols-2 md:gap-10">
              <div className="space-y-6">
                <form action={handleSubmit}>
                  <Label>Razón  Social</Label>
                  <Input type="text" name="business_name" defaultValue={society.business_name}/>
                  <Label>Nº de Identificación Fiscal</Label>
                  <Input type="text"   name="tax_id" defaultValue={society.tax_id}/>
                  <Button
                      className="flex items-center
                    gap-3
                    px-3
                    py-2
                    mt-3
                    font-medium
                    text-gray-700
                    rounded-lg
                    group
                    text-theme-sm">
                    Guardar
                  </Button>
                  <Alert variant={'success'} title={'Datos guardados'} message={'Los datos han sido guardados correctamente'} />
                  <Alert variant={'error'} title={'Datos incorrectos'} message={'Los datos ingresados son incorrectos'} />
                </form>
              </div>
              <div className="space-y-6">
                <DropzoneComponent title="Foto de perfil"/>
              </div>
            </div>
          </div>
    </div>
  );
}
