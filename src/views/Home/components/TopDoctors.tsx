import { apiGetDoctors } from '@/services/DoctorService';
import React, { useEffect, useState } from 'react';
import { CgLock } from 'react-icons/cg';
import { LuBuilding2 } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '@/components/ui/Card';

interface TopDoctorsProps {
    hcfData: {
        doctors: any
    }
}
const TopDoctors: React.FC<TopDoctorsProps> = ({ hcfData }) => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState<any[]>([]);

    useEffect(() => {
        if (hcfData?.doctors?.length) {
            setDoctors(hcfData?.doctors?.slice(0, 3) || [])
        }
    }, [hcfData])

    console.log('doctors', doctors)


    useEffect(() => {
        const callApi = async () => {
            if (doctors.length < 3) {
                const limit = 3 - doctors.length;
                try {
                    const data = await apiGetDoctors({ page: 1, limit, search: '' })
                    if (data?.data) {
                        setDoctors((prv: any[]) => [...prv, ...data.data])
                    }
                } catch (err) {
                    console.log('error', err);
                }
            }
        }

        callApi();
    }, [doctors])

    return (
        <div className="w-full bg-transparent py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-2xl md:text-4xl font-bold text-center mb-12 text-white">
                    Top Doctors
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.slice(0, 3).map((doctor) => (
                        <GlassCard
                            key={doctor._id}
                            className="hover:shadow-xl transition-all duration-300 overflow-hidden group p-4"
                        >
                            {/* <div className="relative h-64 overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200">
                                <img
                                    src={doctor.profileImage}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        e.target.src = 'https://doctoryouneed.org/wp-content/uploads/2020/08/dummy_gn-300x300.jpg';
                                    }}
                                />
                            </div> */}

                            <div className="p-3">
                                <h2 className="text-xl font-bold text-primary mb-2">{doctor.name}</h2>
                                <p className="text-sm text-primary/80 mb-4">{doctor.designation || 'Specialist'}</p>

                                <div className="space-y-3">
                                    <InfoRow
                                        icon={<CgLock className="w-4 h-4" />}
                                        label="Experience"
                                        value={doctor.experience?.surgeries || 'N/A'}
                                    />
                                    <InfoRow
                                        icon={<LuBuilding2 className="w-4 h-4" />}
                                        label="Hospital"
                                        value={doctor.hospitals?.[0] || 'N/A'}
                                        className="line-clamp-1"
                                    />
                                </div>

                                <button
                                    onClick={() => navigate(`/doctors/${doctor._id}`)}
                                    className="mt-6 w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                                >
                                    More details
                                </button>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <button
                        onClick={() => navigate(`/doctors`)}
                        className="bg-white hover:bg-primary/5 text-primary border border-primary/20 px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                        Load More
                    </button>
                </div>
            </div>
        </div>
    );
};

const InfoRow: React.FC<{ icon: React.ReactNode; label: string; value: string; className?: string }> = ({ icon, label, value, className = '' }) => (
    <div className="flex items-center text-sm">
        <div className="text-primary/60">{icon}</div>
        <span className="ml-2 text-gray-500">{label}:</span>
        <span className={`ml-2 text-gray-700 font-medium truncate ${className}`}>{value}</span>
    </div>
);

export default TopDoctors;