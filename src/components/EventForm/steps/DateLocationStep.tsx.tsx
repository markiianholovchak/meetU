import { EVENT_LOCATION_TYPES } from "../../../lib/constants/event.constants";
import { RadioGroupInput } from "../../UI/RadioGroup";
import { WithLabel } from "../../UI/WithLabel";
import { useMainStore } from "../../../lib/store/store";
import { Input } from "../../UI/Input";
import dayjs from "dayjs";
import { TimePicker } from "../../TimePicker";
import { Time } from "@internationalized/date";

export const DateLocationStep = () => {
    const editedEvent = useMainStore(state => state.editedEvent)!;
    const setLocationType = useMainStore(state => state.setEditedEventLocationType)!;
    const setLocation = useMainStore(state => state.setEditedEventLocation);
    const setDate = useMainStore(state => state.setEditedEventDate);
    const setStartTime = useMainStore(state => state.setEditedEventStartTime);
    const setEndTime = useMainStore(state => state.setEditedEventEndTime);

    const locationPlaceholder =
        editedEvent.locationType === "online" ? "Link to your event" : "Address for your event";

    const startTime = editedEvent.startTime
        ? new Time(...editedEvent.startTime.split(":").map(time => parseInt(time)))
        : null;
    const endTime = editedEvent.endTime
        ? new Time(...editedEvent.endTime.split(":").map(time => parseInt(time)))
        : null;

    return (
        <div className="flex flex-col gap-4 ">
            <WithLabel label="Date">
                <div className="flex items-center gap-2">
                    <div className="w-max rounded-md bg-darkGray p-1">
                        <input
                            value={dayjs(editedEvent.date).format("YYYY-MM-DD")}
                            onChange={e => {
                                setDate(new Date(e.target.value));
                            }}
                            type="date"
                            className="bg-transparent text-sm"
                        />
                    </div>
                    from
                    <TimePicker
                        value={startTime}
                        onChange={value => {
                            setStartTime(value.toString().split(":").slice(0, 2).join(":"));
                        }}
                    />
                    to
                    <TimePicker
                        value={endTime}
                        onChange={value => {
                            setEndTime(value.toString().split(":").slice(0, 2).join(":"));
                        }}
                    />
                </div>
            </WithLabel>

            <WithLabel label="Location">
                <RadioGroupInput<EventLocationType>
                    selected={editedEvent.locationType}
                    onChange={type => type && setLocationType(type)}
                    options={EVENT_LOCATION_TYPES}
                />
            </WithLabel>
            <Input
                value={editedEvent.location}
                onChange={setLocation}
                placeholder={locationPlaceholder}
            />
        </div>
    );
};
