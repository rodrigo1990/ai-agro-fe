'use client'
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import { Metadata } from "next";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import {save} from "@/app/actions/society/save";
import {get} from "@/app/actions/society/get";
import Alert from "@/components/ui/alert/Alert";
import Loading from "@/app/dashboard/loading";
import TextAreaInput from "@/components/form/form-elements/TextAreaInput";

export const metadata: Metadata = {
    title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
    description:
        "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};


export default function FarmerDetailForm({farmer}: { farmer: any}) {
    console.log('farmer from detail form')
    console.log(farmer)
    const [name, setName] = useState(farmer?.business_name);
    const [taxId, setTaxId] = useState(farmer?.tax_id);
    const [successs, setSuccesss] = useState(false);
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(false);

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
                (<Loading text={'Cargando'}/>)
                : (
                    <form action={handleSubmit}>
                        <div className="grid md:grid-cols-2 md:gap-10 gap-y-4">
                            <div>
                                <Label>Nombre</Label>
                                <Input type="text" name="name" defaultValue={farmer?.name}/>
                            </div>
                            <div>
                                <Label>Apellido</Label>
                                <Input type="text" name="last_name" defaultValue={farmer?.last_name}/>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-y-6">
                            <div>
                                <Label>CUIT</Label>
                                <Input type="text" name="cuit"  defaultValue={farmer?.tax_id}/>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-10 gap-y-4">
                                <div>
                                    <Label>Usuario productor ai-agro</Label>
                                    <Input type="text" />
                                </div>
                                <div>
                                    <Label>Código externo</Label>
                                    <Input type="text" name="ext_code" defaultValue={farmer?.external_code}/>
                                </div>
                            </div>
                            <div>
                                <Label>Observaciones</Label>
                                <TextAreaInput  description={farmer?.notes}/>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button className="float-right">Guardar productor</Button>
                        </div>
                    </form>
                )}


        </div>
    );
}
