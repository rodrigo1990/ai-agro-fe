import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { getToken } from "@/app/lib/sessions";
import Link from "next/link";
import api from "@/lib/axios";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

export const metadata: Metadata = {
    title: "Campañas | AI-Agro",
};

export default async function CampaignsPage() {
    const token = await getToken();
    const campaigns = await api.get('/api/campaigns', {
        headers: { 'Authorization': 'Bearer ' + token.token }
    })
        .then(res => res.data)
        .catch(() => []);

    return (
        <div>
            <PageBreadcrumb pageTitle="Campañas" />
            <div className="grid grid-cols-1 gap-y-6">
                {campaigns.length === 0 ? (
                    <p>Ups! Todavía no hay campañas en el sistema, empezá a agregar aquí!</p>
                ) : (
                    <div>
                        <Table>
                            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                                <TableRow>
                                    <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Productor
                                    </TableCell>
                                    <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Establecimiento
                                    </TableCell>
                                    <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Lote
                                    </TableCell>
                                    <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Variedad / Híbrido
                                    </TableCell>
                                    <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Fecha siembra
                                    </TableCell>
                                    <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Acción
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {campaigns.map((campaign: any) => (
                                    <TableRow key={campaign.id}>
                                        <TableCell className="py-3">
                                            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {campaign.farmer?.name} {campaign.farmer?.last_name}
                                            </p>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <p className="text-gray-600 text-theme-sm dark:text-gray-400">
                                                {campaign.establishment?.name ?? '-'}
                                            </p>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <p className="text-gray-600 text-theme-sm dark:text-gray-400">
                                                {campaign.plot?.name ?? '-'}
                                            </p>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <p className="text-gray-600 text-theme-sm dark:text-gray-400">
                                                {campaign.variety_hybrid ?? '-'}
                                            </p>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <p className="text-gray-600 text-theme-sm dark:text-gray-400">
                                                {campaign.sowing_date ?? '-'}
                                            </p>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <Link href={`/dashboard/administration/campaigns/${campaign.id}`} className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                Editar
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Link
                            href="/dashboard/administration/campaigns/detail"
                            className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-5 py-3.5 mt-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300"
                        >
                            Agregar Campaña
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
