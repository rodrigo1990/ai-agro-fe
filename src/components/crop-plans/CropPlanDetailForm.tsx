'use client'
import React, { useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Switch from "@/components/form/switch/Switch";
import { saveOrUpdate } from "@/app/actions/crop-plans/saveOrUpdate";
import Alert from "@/components/ui/alert/Alert";
import Loading from "@/app/dashboard/loading";

export default function CropPlanDetailForm(
    { id, cropPlan }: { id: number | null, cropPlan: any }
) {
    const [idState] = useState<number | null>(id);
    const [crop, setCrop] = useState<string>(cropPlan?.crop ?? '');
    const [sowingSeason, setSowingSeason] = useState<string>(cropPlan?.sowing_season ?? '');
    const [cycle, setCycle] = useState<string>(cropPlan?.cycle ?? '');
    const [referenceName, setReferenceName] = useState<string>(cropPlan?.reference_name ?? '');
    const [varietyHybrid, setVarietyHybrid] = useState<string>(cropPlan?.variety_hybrid ?? '');
    const [sowingDistanceCm, setSowingDistanceCm] = useState<string>(cropPlan?.sowing_distance_cm?.toString() ?? '');
    const [targetDensitySeedsHa, setTargetDensitySeedsHa] = useState<string>(cropPlan?.target_density_seeds_ha?.toString() ?? '');
    const [targetDensityKgHa, setTargetDensityKgHa] = useState<string>(cropPlan?.target_density_kg_ha?.toString() ?? '');
    const [targetSowingDate, setTargetSowingDate] = useState<string>(cropPlan?.target_sowing_date ?? '');
    const [active, setActive] = useState<boolean>(cropPlan?.active ?? true);
    const [success, setSuccess] = useState(false);
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: any) => {
        setLoading(true);
        const response = await saveOrUpdate({
            id: idState,
            crop,
            sowing_season: sowingSeason,
            cycle,
            reference_name: referenceName,
            variety_hybrid: varietyHybrid,
            sowing_distance_cm: sowingDistanceCm !== '' ? parseFloat(sowingDistanceCm) : null,
            target_density_seeds_ha: targetDensitySeedsHa !== '' ? parseFloat(targetDensitySeedsHa) : null,
            target_density_kg_ha: targetDensityKgHa !== '' ? parseFloat(targetDensityKgHa) : null,
            target_sowing_date: targetSowingDate || null,
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
                                <Label>Cultivo</Label>
                                <Input type="text" name="crop" defaultValue={crop} onChange={(e) => setCrop(e.target.value)} />
                            </div>
                            <div>
                                <Label>Campaña</Label>
                                <Input type="text" name="sowing_season" defaultValue={sowingSeason} onChange={(e) => setSowingSeason(e.target.value)} placeholder="Ej: 2024/25" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-10 gap-y-4">
                            <div>
                                <Label>Ciclo</Label>
                                <Input type="text" name="cycle" defaultValue={cycle} onChange={(e) => setCycle(e.target.value)} placeholder="Ej: largo, corto" />
                            </div>
                            <div>
                                <Label>Nombre de referencia</Label>
                                <Input type="text" name="reference_name" defaultValue={referenceName} onChange={(e) => setReferenceName(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <Label>Variedad / Híbrido</Label>
                            <Input type="text" name="variety_hybrid" defaultValue={varietyHybrid} onChange={(e) => setVarietyHybrid(e.target.value)} />
                        </div>
                        <div className="grid md:grid-cols-3 md:gap-10 gap-y-4">
                            <div>
                                <Label>Distancia de siembra (cm)</Label>
                                <Input type="number" name="sowing_distance_cm" defaultValue={sowingDistanceCm} onChange={(e) => setSowingDistanceCm(e.target.value)} />
                            </div>
                            <div>
                                <Label>Densidad objetivo (semillas/ha)</Label>
                                <Input type="number" name="target_density_seeds_ha" defaultValue={targetDensitySeedsHa} onChange={(e) => setTargetDensitySeedsHa(e.target.value)} />
                            </div>
                            <div>
                                <Label>Densidad objetivo (kg/ha)</Label>
                                <Input type="number" name="target_density_kg_ha" defaultValue={targetDensityKgHa} onChange={(e) => setTargetDensityKgHa(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <Label>Fecha objetivo de siembra</Label>
                            <Input type="date" name="target_sowing_date" defaultValue={targetSowingDate} onChange={(e) => setTargetSowingDate(e.target.value)} />
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
                        <Button>Guardar plan de cultivo</Button>
                    </div>
                </form>
            )}
        </div>
    );
}
