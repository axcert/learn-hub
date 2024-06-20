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
