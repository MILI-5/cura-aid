import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { lazy } from 'react';

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'patients',
        path: '/patients',
        component: lazy(() => import('@/views/Patients')),
        authority: [],
    },
    {
        key: 'doctors',
        path: '/doctors',
        component: lazy(() => import('@/views/Doctors')),
        authority: [],
    },
    {
        key: 'appointments',
        path: '/appointments',
        component: lazy(() => import('@/views/Appointments')),
        authority: [],
    },
    {
        key: 'billing',
        path: '/billing',
        component: lazy(() => import('@/views/Billing')),
        authority: [],
    },
    {
        key: 'medicalRecords',
        path: '/medical-records',
        component: lazy(() => import('@/views/MedicalRecords')),
        authority: [],
    },
];
