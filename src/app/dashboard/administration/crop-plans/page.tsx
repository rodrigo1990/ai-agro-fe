import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { getToken } from "@/app/lib/sessions";
import Link from "next/link";
import api from "@/lib/axios";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

export const metadata: Metadata = {
    title: "Planes de cultivo | AI-Agro",
};

export default async function CropPlansPage() {
    const token = await getToken();
    const cropPlans = await api.get('/api/crop-plans', {
        headers: { 'Authorization': 'Bearer ' + token.token }
    })
        .then(res => res.data)
        .catch(() => []);

    return (
        <div>
            <PageBreadcrumb pageTitle="Planes de cultivo" />
            <div className="grid grid-cols-1 gap-y-6">
                {cropPlans.length === 0 ? (
                    <p>Ups! Todavía no hay planes de cultivo en el sistema, empezá a agregar aquí!</p>
                ) : (
                    <div>
                        <Table>
                            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                                <TableRow>
                                    <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Nombre de referencia
                                    </TableCell>
                                    <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Cultivo
                                    </TableCell>
                                    <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Campaña
                                    </TableCell>
                                    <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Variedad / Híbrido
                                    </TableCell>
                                    <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Acción
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {cropPlans.map((cropPlan: any) => (
                                    <TableRow key={cropPlan.id}>
                                        <TableCell className="py-3">
                                            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {cropPlan.reference_name ?? '-'}
                                            </p>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <p className="text-gray-600 text-theme-sm dark:text-gray-400">
                                                {cropPlan.crop ?? '-'}
                                            </p>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <p className="text-gray-600 text-theme-sm dark:text-gray-400">
                                                {cropPlan.sowing_season ?? '-'}
                                            </p>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <p className="text-gray-600 text-theme-sm dark:text-gray-400">
                                                {cropPlan.variety_hybrid ?? '-'}
                                            </p>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <Link href={`/dashboard/administration/crop-plans/${cropPlan.id}`} className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                Editar
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Link
                            href="/dashboard/administration/crop-plans/detail"
                            className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-5 py-3.5 mt-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300"
                        >
                            Agregar Plan de cultivo
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
