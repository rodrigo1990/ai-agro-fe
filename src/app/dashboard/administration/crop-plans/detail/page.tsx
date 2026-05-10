import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import CropPlanDetailForm from "@/components/crop-plans/CropPlanDetailForm";

export const metadata: Metadata = {
    title: "Nuevo Plan de cultivo | AI-Agro",
};

export default async function NewCropPlanPage() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Nuevo Plan de cultivo" />
            <div className="grid grid-cols-1 gap-y-6">
                <CropPlanDetailForm id={null} cropPlan={null} />
            </div>
        </div>
    );
}
