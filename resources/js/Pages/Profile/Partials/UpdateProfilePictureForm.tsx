// // UpdateProfilePictureForm.tsx

// import { useForm, usePage } from '@inertiajs/react';
// import PrimaryButton from '@/Components/PrimaryButton';
// import { Transition } from '@headlessui/react';
// import { useRef, FormEventHandler } from 'react';
// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';

// export default function UpdateProfilePictureForm({
//     className = '',
// }: {
//     className?: string;
// }) {
//     const { props: { auth } } = usePage();
//     const imageInput = useRef<HTMLInputElement>(null);

//     const {
//         data,
//         setData,
//         post,
//         processing,
//         reset,
//         errors,
//     } = useForm({
//         image: null, // Initialize image state to null
//     });

//     const updateProfilePicture: FormEventHandler = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('image', data.image!); // Ensure data.image is not null or undefined

//         try {
//             post(route('profile.update'), formData, {
//                 preserveScroll: true,
//                 onSuccess: () => {
//                     reset(); // Reset form on successful upload
//                     setData('image', null); // Reset image state after upload
//                 },
//                 onError: (errors: any) => {
//                     console.error(errors); // Handle errors as needed
//                 },
//             });
//         } catch (error) {
//             console.error('Error uploading image:', error);
//         }
//     };

//     return (
//         <section className={className}>
//             <header>
//                 <h2 className="text-lg font-medium text-gray-900">
//                     Update Profile Picture
//                 </h2>
//             </header>

//             <form onSubmit={updateProfilePicture} className="mt-6 space-y-6">
//                 <div>
//                     <InputLabel htmlFor="image" value="Profile Picture" />
//                     <input
//                         id="image"
//                         type="file"
//                         ref={imageInput}
//                         onChange={(e) => setData('image', e.target.files![0])} // Set the file object to data.image
//                         className="mt-1 block w-full"
//                     />
//                     <InputError message={errors.image} className="mt-2" />
//                 </div>

//                 <div className="flex items-center gap-4">
//                     <PrimaryButton disabled={processing}>
//                         Upload Picture
//                     </PrimaryButton>

//                     <Transition
//                         show={processing} // Show processing state instead of recentlySuccessful
//                         enter="transition ease-in-out"
//                         enterFrom="opacity-0"
//                         leave="transition ease-in-out"
//                         leaveTo="opacity-0"
//                     >
//                         <p className="text-sm text-gray-600">Uploading...</p>
//                     </Transition>
//                 </div>
//             </form>
//         </section>
//     );
// }


import React, { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { useDropzone } from 'react-dropzone';

import InputError from "@/Components/elements/inputs/InputError";
import InputLabel from "@/Components/elements/inputs/InputLabel";
import PrimaryButton from '@/Components/PrimaryButton';

// Define the types for the user object and image files
type User = {
    image_url: string | null;
};

type Props = {
    auth: {
        user: User;
    };
};

type ImageFile = File & { preview: string };

export default function UpdateProfilePictureForm() {
    const { props } = usePage<Props>();
    const { user } = props.auth;

    const { data, setData, errors, post, progress, processing, recentlySuccessful } = useForm({
        image: null as File | null,
    });

    const [images, setImages] = useState<ImageFile[]>([]);
    const [canCleanImage, setCanCleanImage] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        onDrop: (acceptedFiles: File[]) => {
            const filesWithPreview = acceptedFiles.map((file) =>
                Object.assign(file, { preview: URL.createObjectURL(file) })
            );
            setImages(filesWithPreview);
            setCanCleanImage(true);
            setData('image', acceptedFiles[0]);
        }
    });

    const thumb = images.map((file) => (
        <div key={file.name}>
            <img
                src={file.preview}
                alt={file.name}
                width={300}
                height={300}
                className="h-[200px] w-full overflow-hidden object-contain rounded-xl bg-gray-700"
                onLoad={() => URL.revokeObjectURL(file.preview)}
            />
        </div>
    ));

    const remove = () => {
        setImages([]);
        setCanCleanImage(false);
        setData('image', null);
    };

    useEffect(() => {
        return () => {
            images.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [images]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('profile.update-picture'));
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div>
                <InputLabel htmlFor="image" value="Profile Image (1:1)" />
                <div className="mt-2 grid justify-center rounded-xl border-2 border-dashed px-6 py-2 w-full ">
                    <div className="relative flex items-center h-full w-full min-h-[200px] ">
                        <div
                            {...getRootProps({ className: 'dropzone' })}
                            className="object-cover h-full w-full min-h-[200px] cursor-pointer flex rounded-xl bg-slate-200"
                        >
                            <input type="file" {...getInputProps()} />
                            {images.length > 0 ? (
                                thumb
                            ) : user.image_url ? (
                                <img
                                    src={user.image_url}
                                    alt="Profile Image"
                                    className="h-[200px] w-auto flex overflow-hidden rounded-xl bg-gray-50"
                                />
                            ) : (
                                <span className="mx-auto absolute self-center grid text-center text-gray-900">
                                    Upload Image
                                </span>
                            )}
                        </div>

                        {progress && (
                            <progress value={progress.percentage} className="h-2 bg-emerald-500 absolute top-0 left-0" max="100">
                                {progress.percentage}%
                            </progress>
                        )}
                    </div>
                    {canCleanImage && (
                        <button
                            type="button"
                            className="mt-2 w-[70px] rounded bg-gray-300 py-1 px-2 text-sm text-gray-700 hover:bg-gray-500 hover:text-gray-900"
                            onClick={remove}
                        >
                            Clean
                        </button>
                    )}
                    {!canCleanImage && (
                        <div className="ml-3 mt-1 text-xs font-light text-gray-500 text-center">
                            Drag and drop or click to replace
                        </div>
                    )}
                    <InputError message={errors.image} />
                </div>
            </div>
            <div>
                <PrimaryButton disabled={processing}>Submit</PrimaryButton>
            </div>
        </form>
    );
}
