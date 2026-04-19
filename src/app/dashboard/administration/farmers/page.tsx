import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import {getToken} from "@/app/lib/sessions";
import Link from "next/link";
import api from "@/lib/axios";

export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default async function FormElements() {
    const token = await getToken()
    const farmers = await api.get('/api/farmers',
        {
            headers: {
                'Authorization': 'Bearer '+token.token,
            }
        })
        .then(res => {
            console.log(res.data);
            return res.data;
        })
        .catch(error => {
            console.log(error);
            return error.response;
        })

    console.log('response')
    console.log(farmers)
  return (
    <div>
      <PageBreadcrumb pageTitle="Productores" />
      <div className="grid grid-cols-1 gap-y-6">

          {farmers.length === 0 ? (
            <p>Ups! Todavia no hay productores en el sistema, empezá a agregar aqui!</p>
          ) : (
              <div>
                <ul>
                  {farmers.map((farmer) => (
                    <li key={farmer.id}>{farmer.name}</li>
                  ))}
                </ul>
                <Link href="/dashboard/administration/farmers/detail">agregar productos</Link>
              </div>
          )}

      </div>
    </div>
  );
}
