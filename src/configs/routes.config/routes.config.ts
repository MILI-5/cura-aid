import authRoute from './authRoute'
import type { Routes, Meta } from '@/@types/routes'
import { lazy, LazyExoticComponent } from 'react';
import Dashboard from '@/views/Dashboard';

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'dashboard',
        path: '/dashboard',
        component: Dashboard as unknown as LazyExoticComponent<<T extends Meta>(props: T) => JSX.Element>,
        authority: [],
        meta: {
            layout: 'blank',
        },
    },
    {
        key: 'patients',
        path: '/patients',
        component: lazy(() => import('@/views/Patients')) as unknown as LazyExoticComponent<<T extends Meta>(props: T) => JSX.Element>,
        authority: [],
    },
    {
        key: 'doctors',
        path: '/doctors',
        component: lazy(() => import('@/views/Doctors')) as unknown as LazyExoticComponent<<T extends Meta>(props: T) => JSX.Element>,
        authority: [],
    },
    {
        key: 'appointments',
        path: '/appointments',
        component: lazy(() => import('@/views/Appointments')) as unknown as LazyExoticComponent<<T extends Meta>(props: T) => JSX.Element>,
        authority: [],
    },
    {
        key: 'billing',
        path: '/billing',
        component: lazy(() => import('@/views/Billing')) as unknown as LazyExoticComponent<<T extends Meta>(props: T) => JSX.Element>,
        authority: [],
    },
    {
        key: 'medicalRecords',
        path: '/medical-records',
        component: lazy(() => import('@/views/MedicalRecords')) as unknown as LazyExoticComponent<<T extends Meta>(props: T) => JSX.Element>,
        authority: [],
    },
];
