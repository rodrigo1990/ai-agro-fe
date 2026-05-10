'use client'
import React, { useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Select from "@/components/form/Select";
import Switch from "@/components/form/switch/Switch";
import { saveOrUpdate } from "@/app/actions/plots/saveOrUpdate";
import Alert from "@/components/ui/alert/Alert";
import Loading from "@/app/dashboard/loading";

export default function PlotDetailForm(
    { id, plot, farmers, establishments }: { id: number | null, plot: any, farmers: any[], establishments: any[] }
) {
    const [idState] = useState<number | null>(id);
    const [farmerId, setFarmerId] = useState<string>(plot?.farmer_id?.toString() ?? '');
    const [establishmentId, setEstablishmentId] = useState<string>(plot?.establishment_id?.toString() ?? '');
    const [name, setName] = useState<string>(plot?.name ?? '');
    const [active, setActive] = useState<boolean>(plot?.active ?? true);
    const [area, setArea] = useState<string>(plot?.area?.toString() ?? '');
    const [latitude, setLatitude] = useState<string>(plot?.latitude?.toString() ?? '');
    const [longitude, setLongitude] = useState<string>(plot?.longitude?.toString() ?? '');
    const [externalCode, setExternalCode] = useState<string>(plot?.external_code ?? '');
    const [success, setSuccess] = useState(false);
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const farmerOptions = farmers.map(f => ({
        value: f.id.toString(),
        label: `${f.name} ${f.last_name}`,
    }));

    const establishmentOptions = establishments
        .filter(e => farmerId === '' || e.farmer_id.toString() === farmerId)
        .map(e => ({
            value: e.id.toString(),
            label: e.name,
        }));

    const handleSubmit = async (event) => {
        setLoading(true);
        const response = await saveOrUpdate({
            id: idState,
            farmer_id: parseInt(farmerId),
            establishment_id: parseInt(establishmentId),
            name,
            active,
            area: parseFloat(area),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            external_code: externalCode,
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
                                    onChange={(val) => { setFarmerId(val); setEstablishmentId(''); }}
                                    placeholder="Seleccioná un productor"
                                />
                            </div>
                            <div>
                                <Label>Establecimiento</Label>
                                <Select
                                    options={establishmentOptions}
                                    defaultValue={establishmentId}
                                    onChange={(val) => setEstablishmentId(val)}
                                    placeholder="Seleccioná un establecimiento"
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-10 gap-y-4">
                            <div>
                                <Label>Nombre</Label>
                                <Input type="text" name="name" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <Label>Código externo</Label>
                                <Input type="text" name="external_code" defaultValue={externalCode} onChange={(e) => setExternalCode(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <Label>Superficie (ha)</Label>
                            <Input type="number" name="area" defaultValue={area} onChange={(e) => setArea(e.target.value)} />
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-10 gap-y-4">
                            <div>
                                <Label>Latitud</Label>
                                <Input type="number" name="latitude" defaultValue={latitude} onChange={(e) => setLatitude(e.target.value)} />
                            </div>
                            <div>
                                <Label>Longitud</Label>
                                <Input type="number" name="longitude" defaultValue={longitude} onChange={(e) => setLongitude(e.target.value)} />
                            </div>
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
                        <Button>Guardar lote</Button>
                    </div>
                </form>
            )}
        </div>
    );
}
