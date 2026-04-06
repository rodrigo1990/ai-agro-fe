import Button from "@/components/ui/button/Button";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TextAreaInput from "@/components/form/form-elements/TextAreaInput";
import { Metadata } from "next";
import React from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";

export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function FormElements() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Productores" />
      <div className="grid grid-cols-1 gap-y-6">
            <div className="grid md:grid-cols-2 md:gap-10 gap-y-4">
                <div>
                    <Label>Nombre</Label>
                    <Input type="text" />
                </div>
                <div>
                    <Label>Apellido</Label>
                    <Input type="text" />
                </div>
            </div>
          <div className="grid grid-cols-1 gap-y-6">
              <div>
                  <Label>CUIT</Label>
                  <Input type="text" />
              </div>
              <div className="grid md:grid-cols-2 md:gap-10 gap-y-4">
                  <div>
                      <Label>Usuario productor ai-agro</Label>
                      <Input type="text" />
                  </div>
                  <div>
                      <Label>Código externo</Label>
                      <Input type="text" />
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
      </div>
    </div>
  );
}
