import { EVENT_ACCESS_TYPES } from "../../../lib/constants/event.constants";
import { RadioGroupInput } from "../../UI/RadioGroup";
import { WithLabel } from "../../UI/WithLabel";
import { useMainStore } from "../../../lib/store/store";
import { Input } from "../../UI/Input";
import { Checkbox } from "../../UI/Checkbox";
import { useState } from "react";

export const ParticipantsStep = () => {
    const editedEvent = useMainStore(state => state.editedEvent)!;
    const setAccessType = useMainStore(state => state.setEditedEventAccessType);
    const setMaxParticipants = useMainStore(state => state.setEditedEventMaxParticipants);

    const [limitParticipants, setLimitParticipants] = useState(false);
    return (
        <div className="flex flex-col gap-4 ">
            <WithLabel label="Access to the event">
                <RadioGroupInput<EventAccessType>
                    selected={editedEvent.accessType}
                    onChange={type => setAccessType(type)}
                    options={EVENT_ACCESS_TYPES}
                />
            </WithLabel>

            {editedEvent.accessType === "public" && (
                <div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={limitParticipants}
                            onChange={value => {
                                setLimitParticipants(value);
                                if (!value) setMaxParticipants(undefined);
                            }}
                            id="limitParticipants"
                        />
                        <label htmlFor="limitParticipants" className="text-sm">
                            Limited number of participants
                        </label>
                    </div>
                    <p className="mb-1 text-xs text-gray-100 opacity-50">
                        How many people can attend your event?
                    </p>
                    {limitParticipants && (
                        <Input
                            type="number"
                            value={editedEvent.maxParticipants?.toString() || ""}
                            onChange={value => setMaxParticipants(parseInt(value))}
                            placeholder="Max number of participants"
                        />
                    )}
                </div>
            )}
        </div>
    );
};
