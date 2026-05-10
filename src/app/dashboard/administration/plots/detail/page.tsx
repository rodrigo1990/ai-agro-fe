import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import PlotDetailForm from "@/components/plots/PlotDetailForm";
import { getToken } from "@/app/lib/sessions";
import api from "@/lib/axios";

export const metadata: Metadata = {
    title: "Nuevo Lote | AI-Agro",
};

export default async function NewPlotPage() {
    const token = await getToken();
    const [farmers, establishments] = await Promise.all([
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
            <PageBreadcrumb pageTitle="Nuevo Lote" />
            <div className="grid grid-cols-1 gap-y-6">
                <PlotDetailForm id={null} plot={null} farmers={farmers} establishments={establishments} />
            </div>
        </div>
    );
}
