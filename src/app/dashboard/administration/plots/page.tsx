import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { getToken } from "@/app/lib/sessions";
import Link from "next/link";
import api from "@/lib/axios";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

export const metadata: Metadata = {
    title: "Lotes | AI-Agro",
};

export default async function PlotsPage() {
    const token = await getToken();
    const plots = await api.get('/api/plots', {
        headers: { 'Authorization': 'Bearer ' + token.token }
    })
        .then(res => res.data)
        .catch(() => []);

    return (
        <div>
            <PageBreadcrumb pageTitle="Lotes" />
            <div className="grid grid-cols-1 gap-y-6">
                {plots.length === 0 ? (
                    <p>Ups! Todavía no hay lotes en el sistema, empezá a agregar aquí!</p>
                ) : (
                    <div>
                        <Table>
                            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                                <TableRow>
                                    <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Nombre
                                    </TableCell>
                                    <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Superficie (ha)
                                    </TableCell>
                                    <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Acción
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {plots.map((plot) => (
                                    <TableRow key={plot.id}>
                                        <TableCell className="py-3">
                                            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {plot.name}
                                            </p>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <p className="text-gray-600 text-theme-sm dark:text-gray-400">
                                                {plot.area}
                                            </p>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <Link href={`/dashboard/administration/plots/${plot.id}`} className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                Editar
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Link
                            href="/dashboard/administration/plots/detail"
                            className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-5 py-3.5 mt-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300"
                        >
                            Agregar Lote
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
