import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import PlotDetailForm from "@/components/plots/PlotDetailForm";
import { getToken } from "@/app/lib/sessions";
import api from "@/lib/axios";

export const metadata: Metadata = {
    title: "Detalle Lote | AI-Agro",
};

export default async function PlotDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const token = await getToken();
    const { slug } = await params;
    const id = Number(slug);

    const [plot, farmers, establishments] = await Promise.all([
        api.get('/api/plot/' + id, {
            headers: { 'Authorization': 'Bearer ' + token.token }
        })
            .then(res => res.data)
            .catch(() => null),
        api.get('/api/farmers', {
            headers: { 'Authorization': 'Bearer ' + token.token }
        })
            .then(res => res.data)
            .catch(() => []),
        api.get('/api/establishments', {
            headers: { 'Authorization': 'Bearer ' + token.token }
        })
            .then(res => res.data)
            .catch(() => []),
    ]);

    return (
        <div>
            <PageBreadcrumb pageTitle="Detalle" />
            <div className="grid grid-cols-1 gap-y-6">
                <PlotDetailForm id={id} plot={plot} farmers={farmers} establishments={establishments} />
            </div>
        </div>
    );
}
