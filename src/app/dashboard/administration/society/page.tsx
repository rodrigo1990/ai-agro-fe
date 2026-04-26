import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React, {Suspense} from "react";
import SocietyForm from "@/components/society/SocietyForm";
import Loading from "@/app/dashboard/loading";
import api from "@/lib/axios";
import {getToken} from "@/app/lib/sessions";

export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
      "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};


export default async function FormElements() {
    const token = await getToken()
    let society = await getSociety()
    async function  getSociety() {
        return await api.get('/api/society/',
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
        <PageBreadcrumb pageTitle="Sociedad" />
        <Suspense fallback={<Loading text={'Cargando'}/>}>
          <div>
            <SocietyForm society={society}/>
          </div>
        </Suspense>
      </div>
  );
}
