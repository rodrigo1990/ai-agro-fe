'use client'
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import { Metadata } from "next";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import {save} from "@/app/actions/society/save";
import {getId} from "@/app/actions/society/getId";
import Alert from "@/components/ui/alert/Alert";
import Loading from "@/app/dashboard/loading";

export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};


export default function SocietyForm() {
    const [name, setName] = useState(null);
    const [taxId, setTaxId] = useState(null);
    const [successs, setSuccesss] = useState(false);
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getSociety () {
            setLoading(true)
            const society = await getId()
            setName(society.content.business_name)
            setTaxId(society.content.tax_id)
            setLoading(false)
        }
        getSociety()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        const response = await save({
            'name': name,
            'tax_id' : taxId
        })

        if (response.success) {
            setSuccesss(true)
            setAlert(false)
        }else{
            setSuccesss(false)
            setAlert(true)
        }
        setLoading(false)
    }

    return (
      <div>
            {loading ?
                (<Loading text={'Cargando...'}/>)
                : (
                <div className="grid xs:grid-cols-1 gap-y-6 xl:grid-cols-2 md:grid-cols-2 md:gap-10">
                    <div className="space-y-6">
                        <Label>Razón  Social</Label>
                        <Input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
                        <Label>Nº de Identificación Fiscal</Label>
                        <Input type="text" defaultValue={taxId} onChange={(e) => setTaxId(e.target.value)} />
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
                            onClick={handleSubmit}
                        >
                            Guardar
                        </Button>

                        {successs && (
                            <Alert variant={'success'} title={'Datos guardados'} message={'Los datos han sido guardados correctamente'} />
                        )}
                        {alert && (
                            <Alert variant={'error'} title={'Datos incorrectos'} message={'Los datos ingresados son incorrectos'} />
                        )}
                    </div>
                    <div className="space-y-6">
                        <DropzoneComponent title="Foto de perfil"/>
                    </div>
                </div>
            )}


      </div>
  );
}
