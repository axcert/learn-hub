import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import Logo from '../../../public/asset/Logo.png';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
            <Link href="/" className="flex items-center">
                <img className="h-9 w-auto fill-current text-gray-800" src={Logo} alt="Logo" />
                <div className="w-[53.02px] h-[31px] text-center text-blue-700 text-2xl font-bold font-['Poppins']">LMS</div>
            </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
