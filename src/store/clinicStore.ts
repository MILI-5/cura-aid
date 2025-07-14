import { create } from 'zustand';

export type Clinic = {
  id: string;
  name: string;
  logo: string;
  theme: {
    primary: string;
    secondary: string;
    background: string;
  };
};

const mockClinics: Clinic[] = [
  {
    id: 'clinic1',
    name: 'Sunrise Health',
    logo: '/public/img/logo/logo-light-full.png',
    theme: { primary: '#2563eb', secondary: '#06b6d4', background: '#f0f9ff' },
  },
  {
    id: 'clinic2',
    name: 'Wellness Plus',
    logo: '/public/img/logo/logo-dark-full.png',
    theme: { primary: '#16a34a', secondary: '#f59e42', background: '#f7fee7' },
  },
];

export const useClinicStore = create<{
  clinics: Clinic[];
  currentClinic: Clinic;
  setClinic: (id: string) => void;
}>(() => ({
  clinics: mockClinics,
  currentClinic: mockClinics[0],
  setClinic: (id) => {
    const found = mockClinics.find(c => c.id === id);
    if (found) {
      useClinicStore.setState({ currentClinic: found });
    }
  },
})); 