import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CheckboxComponents from "@/components/form/form-elements/CheckboxComponents";
import DefaultInputs from "@/components/form/form-elements/DefaultInputs";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import FileInputExample from "@/components/form/form-elements/FileInputExample";
import InputGroup from "@/components/form/form-elements/InputGroup";
import InputStates from "@/components/form/form-elements/InputStates";
import RadioButtons from "@/components/form/form-elements/RadioButtons";
import SelectInputs from "@/components/form/form-elements/SelectInputs";
import TextAreaInput from "@/components/form/form-elements/TextAreaInput";
import ToggleSwitch from "@/components/form/form-elements/ToggleSwitch";
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
              <div>
                  <Label>Observaciones</Label>
                  <TextAreaInput />
              </div>
          </div>
      </div>
    </div>
  );
}
