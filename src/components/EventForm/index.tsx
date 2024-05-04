import { createEvent } from "../../lib/api/events.api";
import { uploadFileToStorage } from "../../lib/api/storage.api";
import { useMainStore } from "../../lib/store/store";
import { Button } from "../UI/Button";
import Modal from "../UI/Modal";
import { DateLocationStep } from "./steps/DateLocationStep.tsx";
import { DetailsStep } from "./steps/DetailsStep";
import { ParticipantsStep } from "./steps/ParticipantsStep";
import { mutate } from "swr";
import { USER_CREATED_EVENTS } from "../../lib/paths";
import { useMemo } from "react";

const steps = [
    {
        label: "Details",
        headerText: "What is your event about?",
        component: <DetailsStep />
    },
    {
        label: "Date and location",
        headerText: "When and where will it take place?",
        component: <DateLocationStep />
    },
    {
        label: "Participants",
        headerText: "Who should join it?",
        component: <ParticipantsStep />
    }
];

type StepProps = {
    index: number;
    label: string;
};
const Step = ({ label, index }: StepProps) => {
    const currentStep = useMainStore(state => state.currentEventFormStep);
    const isActive = currentStep === index;
    return (
        <div>
            <div className={`border-2 ${isActive ? "border-crimson" : "border-darkGray"}`}></div>
            {isActive && <p className="mt-1 text-xs text-crimson">{label}</p>}
        </div>
    );
};

const StepsBar = () => {
    const currentStep = useMainStore(state => state.currentEventFormStep);
    return (
        <div className="flex flex-col gap-2">
            <p className="font-medium">{steps[currentStep].headerText}</p>
            <div className="grid grid-cols-3 gap-4">
                {steps.map((step, index) => (
                    <Step label={step.label} index={index} key={index} />
                ))}
            </div>
        </div>
    );
};

const StepButtons = () => {
    const currentStep = useMainStore(state => state.currentEventFormStep);
    const setCurrentStep = useMainStore(state => state.setCurrentEventFormStep);
    const resetForm = useMainStore(state => state.resetForm);
    const setIsFormOpen = useMainStore(state => state.setIsEventFormOpen);
    const user = useMainStore(state => state.user)!;

    const coverImage = useMainStore(state => state.coverImageFile);

    const editedEvent = useMainStore(state => state.editedEvent);

    const isStepFormValid = useMemo(() => {
        if (currentStep === 0) {
            return (
                !!editedEvent.title.trim().length &&
                !!editedEvent.category &&
                !!editedEvent.description.trim().length
            );
        }
        if (currentStep === 1) {
            return !!editedEvent.date && !!editedEvent.location;
        }
    }, [editedEvent, currentStep]);

    const handleCancel = () => {
        setIsFormOpen(false);
        resetForm();
    };

    const handleGoBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleCreateEvent = async () => {
        const eventData = { ...useMainStore.getState().editedEvent };
        if (coverImage) {
            const imageUrl = await uploadFileToStorage(coverImage);
            eventData.coverImage = imageUrl;
        }
        createEvent(eventData, user);
        mutate(USER_CREATED_EVENTS(user.id));
        handleCancel();
    };
    return (
        <div className="flex justify-end gap-6">
            {currentStep !== 0 && (
                <Button variant="unstyled" onClick={handleGoBack}>
                    Back
                </Button>
            )}

            <Button variant="unstyled" onClick={handleCancel}>
                Cancel
            </Button>

            {currentStep === steps.length - 1 ? (
                <Button variant="primary" onClick={handleCreateEvent}>
                    Create event
                </Button>
            ) : (
                <Button variant="primary" onClick={handleNext} disabled={!isStepFormValid}>
                    Next
                </Button>
            )}
        </div>
    );
};

const EventForm = () => {
    const currentStep = useMainStore(state => state.currentEventFormStep);
    return (
        <>
            <StepsBar />
            {steps[currentStep].component}
            <StepButtons />
        </>
    );
};

export const EventFormModal = () => {
    const setEventFormOpen = useMainStore(state => state.setIsEventFormOpen);
    const isOpen = useMainStore(state => state.isEventFormOpen);

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => setEventFormOpen(false)}
            onOpen={() => setEventFormOpen(true)}
            isFullScreen
        >
            <div className="flex flex-col gap-6 px-4 py-6">
                <EventForm />
            </div>
        </Modal>
    );
};
