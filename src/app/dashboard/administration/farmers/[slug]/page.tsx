import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import FarmerDetailForm from "@/components/farmers/FarmerDetailForm";
import {getToken} from "@/app/lib/sessions";
import api from "@/lib/axios";
export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default async function FormElements({params}:{params: Promise<{slug: string}>}) {
    const token = await getToken()
    let { slug } = await params
    slug = Number(slug)
    let farmer = await getFarmer(slug)
    console.log('farmer')
    console.log(farmer)
    async function  getFarmer(slug) {
        return await api.get('/api/farmer/'+slug,
            {
                headers: {
                    'Authorization': 'Bearer '+token.token,
                }
            })
            .then(res => {
                return res.data;
            })
            .catch(error => {
                return error.response;
            })
    }
  return (
    <div>
      <PageBreadcrumb pageTitle="Detalle" />
      <div className="grid grid-cols-1 gap-y-6">
          <FarmerDetailForm id={slug} farmer={farmer} />
      </div>
    </div>
  );
}
