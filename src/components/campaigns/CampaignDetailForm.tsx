'use client'
import React, { useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Select from "@/components/form/Select";
import Switch from "@/components/form/switch/Switch";
import { saveOrUpdate } from "@/app/actions/campaigns/saveOrUpdate";
import Alert from "@/components/ui/alert/Alert";
import Loading from "@/app/dashboard/loading";
import TextAreaInput from "@/components/form/form-elements/TextAreaInput";

export default function CampaignDetailForm(
    { id, campaign, farmers, establishments, plots, cropPlans }: {
        id: number | null,
        campaign: any,
        farmers: any[],
        establishments: any[],
        plots: any[],
        cropPlans: any[],
    }
) {
    const [idState] = useState<number | null>(id);
    const [farmerId, setFarmerId] = useState<string>(campaign?.farmer_id?.toString() ?? '');
    const [establishmentId, setEstablishmentId] = useState<string>(campaign?.establishment_id?.toString() ?? '');
    const [plotId, setPlotId] = useState<string>(campaign?.plot_id?.toString() ?? '');
    const [cropPlanId, setCropPlanId] = useState<string>(campaign?.crop_plan_id?.toString() ?? '');
    const [targetSowingDate, setTargetSowingDate] = useState<string>(campaign?.target_sowing_date ?? '');
    const [sowingDate, setSowingDate] = useState<string>(campaign?.sowing_date ?? '');
    const [emergenceDate, setEmergenceDate] = useState<string>(campaign?.emergence_date ?? '');
    const [dds, setDds] = useState<string>(campaign?.dds?.toString() ?? '');
    const [gm, setGm] = useState<string>(campaign?.gm?.toString() ?? '');
    const [varietyHybrid, setVarietyHybrid] = useState<string>(campaign?.variety_hybrid ?? '');
    const [sowingSystem, setSowingSystem] = useState<string>(campaign?.sowing_system ?? '');
    const [des, setDes] = useState<string>(campaign?.des?.toString() ?? '');
    const [targetSownArea, setTargetSownArea] = useState<string>(campaign?.target_sown_area?.toString() ?? '');
    const [externalCode, setExternalCode] = useState<string>(campaign?.external_code ?? '');
    const [notes, setNotes] = useState<string>(campaign?.notes ?? '');
    const [active, setActive] = useState<boolean>(campaign?.active ?? true);
    const [success, setSuccess] = useState(false);
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const farmerOptions = farmers.map(f => ({
        value: f.id.toString(),
        label: `${f.name} ${f.last_name}`,
    }));

    const establishmentOptions = establishments
        .filter(e => farmerId === '' || e.farmer_id?.toString() === farmerId)
        .map(e => ({
            value: e.id.toString(),
            label: e.name,
        }));

    const plotOptions = plots
        .filter(p => establishmentId === '' || p.establishment_id?.toString() === establishmentId)
        .map(p => ({
            value: p.id.toString(),
            label: p.name,
        }));

    const cropPlanOptions = cropPlans.map(cp => ({
        value: cp.id.toString(),
        label: cp.reference_name || `${cp.crop} ${cp.sowing_season}`,
    }));

    const handleSubmit = async (event: any) => {
        setLoading(true);
        const response = await saveOrUpdate({
            id: idState,
            farmer_id: farmerId !== '' ? parseInt(farmerId) : null,
            establishment_id: establishmentId !== '' ? parseInt(establishmentId) : null,
            plot_id: plotId !== '' ? parseInt(plotId) : null,
            crop_plan_id: cropPlanId !== '' ? parseInt(cropPlanId) : null,
            target_sowing_date: targetSowingDate || null,
            sowing_date: sowingDate || null,
            emergence_date: emergenceDate || null,
            dds: dds !== '' ? parseInt(dds) : null,
            gm: gm !== '' ? parseFloat(gm) : null,
            variety_hybrid: varietyHybrid || null,
            sowing_system: sowingSystem || null,
            des: des !== '' ? parseFloat(des) : null,
            target_sown_area: targetSownArea !== '' ? parseFloat(targetSownArea) : null,
            external_code: externalCode || null,
            notes: notes || null,
            active,
        });

        if (response.success) {
            setSuccess(true);
            setAlert(false);
            window.scrollTo(0, 0);
        } else {
            setSuccess(false);
            setAlert(true);
        }
        setLoading(false);
    };

    return (
        <div>
            {loading ? (
                <Loading text={'Cargando'} />
            ) : (
                <form action={handleSubmit}>
                    {success && (
                        <Alert variant={'success'} title={'Datos guardados'} message={'Los datos han sido guardados correctamente'} />
                    )}
                    {alert && (
                        <Alert variant={'error'} title={'Datos incorrectos'} message={'Los datos ingresados son incorrectos'} />
                    )}
                    <div className="grid grid-cols-1 gap-y-6">
                        <div className="grid md:grid-cols-2 md:gap-10 gap-y-4">
                            <div>
                                <Label>Productor</Label>
                                <Select
                                    options={farmerOptions}
                                    defaultValue={farmerId}
                                    onChange={(val) => { setFarmerId(val); setEstablishmentId(''); setPlotId(''); }}
                                    placeholder="Seleccioná un productor"
                                />
                            </div>
                            <div>
                                <Label>Establecimiento</Label>
                                <Select
                                    options={establishmentOptions}
                                    defaultValue={establishmentId}
                                    onChange={(val) => { setEstablishmentId(val); setPlotId(''); }}
                                    placeholder="Seleccioná un establecimiento"
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-10 gap-y-4">
                            <div>
                                <Label>Lote</Label>
                                <Select
                                    options={plotOptions}
                                    defaultValue={plotId}
                                    onChange={(val) => setPlotId(val)}
                                    placeholder="Seleccioná un lote"
                                />
                            </div>
                            <div>
                                <Label>Plan de cultivo</Label>
                                <Select
                                    options={cropPlanOptions}
                                    defaultValue={cropPlanId}
                                    onChange={(val) => setCropPlanId(val)}
                                    placeholder="Seleccioná un plan de cultivo"
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 md:gap-10 gap-y-4">
                            <div>
                                <Label>Fecha objetivo de siembra</Label>
                                <Input type="date" name="target_sowing_date" defaultValue={targetSowingDate} onChange={(e) => setTargetSowingDate(e.target.value)} />
                            </div>
                            <div>
                                <Label>Fecha de siembra</Label>
                                <Input type="date" name="sowing_date" defaultValue={sowingDate} onChange={(e) => setSowingDate(e.target.value)} />
                            </div>
                            <div>
                                <Label>Fecha de emergencia</Label>
                                <Input type="date" name="emergence_date" defaultValue={emergenceDate} onChange={(e) => setEmergenceDate(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-10 gap-y-4">
                            <div>
                                <Label>Variedad / Híbrido</Label>
                                <Input type="text" name="variety_hybrid" defaultValue={varietyHybrid} onChange={(e) => setVarietyHybrid(e.target.value)} />
                            </div>
                            <div>
                                <Label>Sistema de siembra</Label>
                                <Input type="text" name="sowing_system" defaultValue={sowingSystem} onChange={(e) => setSowingSystem(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-10 gap-y-4">
                            <div>
                                <Label>Superficie objetivo (ha)</Label>
                                <Input type="number" name="target_sown_area" defaultValue={targetSownArea} onChange={(e) => setTargetSownArea(e.target.value)} />
                            </div>
                            <div>
                                <Label>Código externo</Label>
                                <Input type="text" name="external_code" defaultValue={externalCode} onChange={(e) => setExternalCode(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 md:gap-10 gap-y-4">
                            <div>
                                <Label>DDS (días desde siembra)</Label>
                                <Input type="number" name="dds" defaultValue={dds} onChange={(e) => setDds(e.target.value)} />
                            </div>
                            <div>
                                <Label>GM (grupo de madurez)</Label>
                                <Input type="number" name="gm" defaultValue={gm} onChange={(e) => setGm(e.target.value)} />
                            </div>
                            <div>
                                <Label>DES (densidad efectiva de siembra)</Label>
                                <Input type="number" name="des" defaultValue={des} onChange={(e) => setDes(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <Label>Observaciones</Label>
                            <TextAreaInput value={notes} onChange={(val) => setNotes(val)} />
                        </div>
                        <div>
                            <Switch
                                label="Activo"
                                defaultChecked={active}
                                onChange={(checked) => setActive(checked)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <Button>Guardar campaña</Button>
                    </div>
                </form>
            )}
        </div>
    );
}
