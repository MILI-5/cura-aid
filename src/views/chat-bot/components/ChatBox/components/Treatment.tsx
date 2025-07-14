import { Alert } from '@/components/ui';
import { useSessionUser } from '@/store/authStore';
import { useHcfHomeStore } from '@/views/Home/store/hcfHomeStore';
import React, { useEffect, useRef } from 'react';
import { BiCalendar, BiCalendarCheck, BiCheckCircle, BiClipboard } from 'react-icons/bi';
import { BsActivity } from 'react-icons/bs';
import { FaAngleRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { FiMessageCircle } from 'react-icons/fi';
import { LuFileSearch } from 'react-icons/lu';

// Add prop types
interface TreatmentProps {
  activeStep?: number;
  setActiveStep?: (step: number) => void;
}

const Treatment: React.FC<TreatmentProps> = ({ activeStep = 0, setActiveStep }) => {

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const { user } = useSessionUser()

    const { claimBarStatus } = useHcfHomeStore()

    const steps = [
        {
            icon: <FiMessageCircle className="w-4 h-4" />,
            title: "Inquiry"
        },
        {
            icon: <LuFileSearch className="w-4 h-4" />,
            title: "Assessment"
        },
        {
            icon: <BiCalendarCheck className="w-4 h-4" />,
            title: "Planning"
        },
        {
            icon: <BiCalendar className="w-4 h-4" />,
            title: "Scheduled"
        },
        {
            icon: <BsActivity className="w-4 h-4" />,
            title: "In Treatment"
        },
        {
            icon: <BiClipboard className="w-4 h-4" />,
            title: "Post Treatment"
        },
        {
            icon: <BiCheckCircle className="w-4 h-4" />,
            title: "Completed"
        }
    ];

    const handleScroll = (amount: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (user?.stage && setActiveStep) {
            const stage = user.stage.replace('_', ' ')
                .split(' ')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            const checkActive = steps.findIndex((data) => data.title == stage);

            if (checkActive === -1) {
                setActiveStep(0)
            } else {
                setActiveStep(checkActive)
            }
        }
    }, [user, setActiveStep]);
    return (

        <div className="bg-white rounded-xl shadow-sm border w-full overflow-x-auto mb-1">
            <div className='flex justify-between w-full items-center px-1'>
                <div>
                    <div onClick={() => handleScroll(-100)} className='flex items-center gap-x-1 text-primary sm:hidden'>
                        <FaArrowLeft />
                    </div>
                </div>
                <h6 className="font-semibold text-gray-800 text-center mb-1 mt-1 text-[13px]">
                    Your Treatment Journey
                </h6>
                <div className=''>
                    <div onClick={() => handleScroll(100)} className='flex items-center gap-x-1 text-primary sm:hidden'>
                        <FaArrowRight />
                    </div>
                </div>
            </div>

            {
                    claimBarStatus && (
                        <div className=' mb-1'>
                            <Alert type='success' className='!rounded-[5px] py-1 text-[12px] mx-2'>
                                Congratulations, you can redeem $100 post treatment invoice.
                            </Alert>
                        </div>
                    )
                }
            <div
                ref={scrollRef} className='max-w-full overflow-y-hidden overflow-x-auto mb-2'>
                <div
                    className="flex items-center gap-4 relative px-2 w-full justify-between min-w-[650px] "
                >
                    {/* Background line */}
                    <div className="absolute top-3 left-0 right-0 h-0.5 bg-primary z-0" />

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center z-1 cursor-pointer"
                            onClick={() => setActiveStep && setActiveStep(index)}
                        >
                            <div
                                className={`w-7 h-7  rounded-full flex items-center justify-center 
            ${index === activeStep
                                        ? 'bg-primary text-white'
                                        : 'bg-white border-2 border-primary text-primary'
                                    }
            transition-all duration-300 hover:scale-110`}
                            >
                                {step.icon}
                            </div>
                            <p className="text-[12px] font-bold text-gray-800 text-center">
                                {step.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Treatment;