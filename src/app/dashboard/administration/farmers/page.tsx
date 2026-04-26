import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import {getToken} from "@/app/lib/sessions";
import Link from "next/link";
import api from "@/lib/axios";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/ui/table";
import Image from "next/image";
import Badge from "@/components/ui/badge/Badge";

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
                  <Table>
                      {/* Table Header */}
                      <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                          <TableRow>
                              <TableCell
                                  isHeader
                                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                              >
                                  Name
                              </TableCell>
                              <TableCell
                                  isHeader
                                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                              >
                                  Action
                              </TableCell>
                          </TableRow>
                      </TableHeader>

                      {/* Table Body */}

                      <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                          {farmers.map((farmer) => (
                              <TableRow key={farmer.id} className="">
                                  <TableCell className="py-3">
                                      <div className="flex items-center gap-3">
                                          <div>
                                              <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                  {farmer.name}
                                              </p>
                                          </div>
                                      </div>
                                  </TableCell>
                                  <TableCell className="py-3">
                                      <div className="flex items-center gap-3">
                                          <div>
                                              <Link href={`/dashboard/administration/farmers/detail/${farmer.id}`} className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                  Editar
                                              </Link>
                                          </div>
                                      </div>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
                <Link
                    href="/dashboard/administration/farmers/detail"
                    className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 px-5 py-3.5 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 ">
                    Agregar Productor
                </Link>
              </div>
          )}

      </div>
    </div>
  );
}
