
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import UpdateProfileInformation from '../../Profile/Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from '../../Profile/Partials/UpdatePasswordForm';
import DeleteUserForm from '../../Profile/Partials/DeleteUserForm';
import ProfileManageLayout from '@/Layouts/ProfileManageLayout';

export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    return (
        <ProfileManageLayout
            user={auth.user}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformation
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </ProfileManageLayout>
    );
}
