import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import CampaignDetailForm from "@/components/campaigns/CampaignDetailForm";
import { getToken } from "@/app/lib/sessions";
import api from "@/lib/axios";

export const metadata: Metadata = {
    title: "Nueva Campaña | AI-Agro",
};

export default async function NewCampaignPage() {
    const token = await getToken();

    const [farmers, establishments, plots, cropPlans] = await Promise.all([
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
            <PageBreadcrumb pageTitle="Nueva Campaña" />
            <div className="grid grid-cols-1 gap-y-6">
                <CampaignDetailForm
                    id={null}
                    campaign={null}
                    farmers={farmers}
                    establishments={establishments}
                    plots={plots}
                    cropPlans={cropPlans}
                />
            </div>
        </div>
    );
}
