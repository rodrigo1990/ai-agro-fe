import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import { Metadata } from "next";
import React from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function FormElements() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Sociedad" />
      <div className="grid xs:grid-cols-1 gap-y-6 xl:grid-cols-2 md:grid-cols-2 md:gap-10">
            <div className="space-y-6">
                <Label>Razón  Social</Label>
                <Input type="text" />
                <Label>Nº de Identificación Fiscal</Label>
                <Input type="text" />
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
                    text-theme-sm"
                >
                    Guardar
                </Button>
            </div>
            <div className="space-y-6">
              {/*<InputGroup />*/}
              {/*<FileInputExample />*/}
              {/*<CheckboxComponents />*/}
              {/*<RadioButtons />*/}
              {/*<ToggleSwitch />*/}
              <DropzoneComponent title="Foto de perfil"/>
            </div>
      </div>
    </div>
  );
}
