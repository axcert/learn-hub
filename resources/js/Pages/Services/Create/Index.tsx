import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";


export default function CreateService(){
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        admin_id: '',
        teacher_id: '',
        experience: '',
        hourly_rate: '',
    });

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('services.store'));
    }

    return (
        <GuestLayout>
             <Head title="Service" />

             <form onSubmit={submit}>
             <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Description" />
                    <TextInput
                        id="description"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        autoComplete="description"
                        onChange={(e) => setData('description', e.target.value)}
                        required
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="admin_id" value="admin_id" />
                    <TextInput
                        id="admin_id"
                        name="admin_id"
                        value={data.admin_id}
                        className="mt-1 block w-full"
                        autoComplete="admin_id"
                        onChange={(e) => setData('admin_id', e.target.value)}
                        required
                    />
                    <InputError message={errors.admin_id} className="mt-2" />
                </div>

             </form>
        </GuestLayout>
    )


}