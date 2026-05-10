import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import EstablishmentDetailForm from "@/components/establishments/EstablishmentDetailForm";
import { getToken } from "@/app/lib/sessions";
import api from "@/lib/axios";

export const metadata: Metadata = {
    title: "Nuevo Establecimiento | AI-Agro",
};

export default async function NewEstablishmentPage() {
    const token = await getToken();
    const farmers = await api.get('/api/farmers', {
        headers: { 'Authorization': 'Bearer ' + token.token }
    })
        .then(res => res.data)
        .catch(() => []);

    return (
        <div>
            <PageBreadcrumb pageTitle="Nuevo Establecimiento" />
            <div className="grid grid-cols-1 gap-y-6">
                <EstablishmentDetailForm id={null} establishment={null} farmers={farmers} />
            </div>
        </div>
    );
}
