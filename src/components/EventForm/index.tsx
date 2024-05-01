import { createEvent } from "../../lib/api/events";
import { useMainStore } from "../../lib/store/store";
import { Button } from "../UI/Button";
import Modal from "../UI/Modal";
import { DateLocationStep } from "./steps/DateLocationStep.tsx";
import { DetailsStep } from "./steps/DetailsStep";
import { ParticipantsStep } from "./steps/ParticipantsStep";

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

    const handleCreateEvent = () => {
        createEvent(useMainStore.getState().editedEvent);
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
                <Button variant="primary" onClick={handleNext}>
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
