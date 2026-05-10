import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import EstablishmentDetailForm from "@/components/establishments/EstablishmentDetailForm";
import { getToken } from "@/app/lib/sessions";
import api from "@/lib/axios";

export const metadata: Metadata = {
    title: "Detalle Establecimiento | AI-Agro",
};

export default async function EstablishmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const token = await getToken();
    const { slug } = await params;
    const id = Number(slug);

    const [establishment, farmers] = await Promise.all([
        api.get('/api/establishment/' + id, {
            headers: { 'Authorization': 'Bearer ' + token.token }
        })
            .then(res => res.data)
            .catch(() => null),
        api.get('/api/farmers', {
            headers: { 'Authorization': 'Bearer ' + token.token }
        })
            .then(res => res.data)
            .catch(() => []),
    ]);

    return (
        <div>
            <PageBreadcrumb pageTitle="Detalle" />
            <div className="grid grid-cols-1 gap-y-6">
                <EstablishmentDetailForm id={id} establishment={establishment} farmers={farmers} />
            </div>
        </div>
    );
}
