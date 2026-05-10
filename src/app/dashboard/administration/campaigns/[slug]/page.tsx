import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import CampaignDetailForm from "@/components/campaigns/CampaignDetailForm";
import { getToken } from "@/app/lib/sessions";
import api from "@/lib/axios";

export const metadata: Metadata = {
    title: "Detalle Campaña | AI-Agro",
};

export default async function CampaignDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const token = await getToken();
    const { slug } = await params;
    const id = Number(slug);

    const [campaign, farmers, establishments, plots, cropPlans] = await Promise.all([
        api.get('/api/campaign/' + id, { headers: { 'Authorization': 'Bearer ' + token.token } })
            .then(res => res.data).catch(() => null),
        api.get('/api/farmers', { headers: { 'Authorization': 'Bearer ' + token.token } })
            .then(res => res.data).catch(() => []),
        api.get('/api/establishments', { headers: { 'Authorization': 'Bearer ' + token.token } })
            .then(res => res.data).catch(() => []),
        api.get('/api/plots', { headers: { 'Authorization': 'Bearer ' + token.token } })
            .then(res => res.data).catch(() => []),
        api.get('/api/crop-plans', { headers: { 'Authorization': 'Bearer ' + token.token } })
            .then(res => res.data).catch(() => []),
    ]);

    return (
        <div>
            <PageBreadcrumb pageTitle="Detalle" />
            <div className="grid grid-cols-1 gap-y-6">
                <CampaignDetailForm
                    id={id}
                    campaign={campaign}
                    farmers={farmers}
                    establishments={establishments}
                    plots={plots}
                    cropPlans={cropPlans}
                />
            </div>
        </div>
    );
}
