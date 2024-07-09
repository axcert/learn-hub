import SuccessAlert from "./SuccessAlert";
import DangerAlert from "./DangerAlert";

// {flash:PageProps["flash"]}
export default function FlashAlerts({ flash }: any) {
    return (
        <>
            {flash?.success && (
                <SuccessAlert title="Success" message={flash?.success} />
            )}

            {flash?.error && (
                <DangerAlert title="Error" message={flash?.error} />
            )}
        </>
    );
}
