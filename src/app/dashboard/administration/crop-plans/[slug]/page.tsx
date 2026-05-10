import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import CropPlanDetailForm from "@/components/crop-plans/CropPlanDetailForm";
import { getToken } from "@/app/lib/sessions";
import api from "@/lib/axios";

export const metadata: Metadata = {
    title: "Detalle Plan de cultivo | AI-Agro",
};

export default async function CropPlanDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const token = await getToken();
    const { slug } = await params;
    const id = Number(slug);

    const cropPlan = await api.get('/api/crop-plan/' + id, {
        headers: { 'Authorization': 'Bearer ' + token.token }
    })
        .then(res => res.data)
        .catch(() => null);

    return (
        <div>
            <PageBreadcrumb pageTitle="Detalle" />
            <div className="grid grid-cols-1 gap-y-6">
                <CropPlanDetailForm id={id} cropPlan={cropPlan} />
            </div>
        </div>
    );
}
