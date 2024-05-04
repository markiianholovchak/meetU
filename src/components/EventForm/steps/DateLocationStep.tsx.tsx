import { EVENT_LOCATION_TYPES } from "../../../lib/constants/event.constants";
import { RadioGroupInput } from "../../UI/RadioGroup";
import { WithLabel } from "../../UI/WithLabel";
import { useMainStore } from "../../../lib/store/store";
import dayjs from "dayjs";
import { TimePicker } from "../../TimePicker";
import { Time } from "@internationalized/date";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox } from "@headlessui/react";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { coordinatesToAddress } from "../../../lib/helpers";

const LocationAutocomplete = () => {
    const setLocation = useMainStore(state => state.setEditedEventLocation);
    const setCoordinates = useMainStore(state => state.setEditedEventCoordinates);

    const {
        value,
        suggestions: { data },
        setValue
    } = usePlacesAutocomplete({
        callbackName: "YOUR_CALLBACK_NAME",

        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300
    });

    const getCoordinates = async (description: string) => {
        const geoCode = await getGeocode({ address: description });
        const { lat, lng } = getLatLng(geoCode[0]);
        setCoordinates({ lat, lng });
    };

    const handleSelect = (description: string) => {
        setValue(description);
        setLocation(description);
        getCoordinates(description);
    };

    const getAddressByUserLocation = async () => {
        navigator.geolocation.getCurrentPosition(async position => {
            const result = await coordinatesToAddress({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            console.log(result);
            setValue(result);
            setLocation(result);
        });
    };

    return (
        <div>
            <div className="relative">
                <Combobox>
                    <div className="flex items-center gap-2 rounded-md bg-darkGray px-3 py-2">
                        <Combobox.Input
                            value={value}
                            onChange={e => {
                                setValue(e.target.value);
                            }}
                            className={`w-full bg-transparent placeholder:text-sm placeholder:text-primaryText placeholder:opacity-50`}
                            placeholder={"Search locations"}
                        />
                        <Combobox.Options className="absolute left-0 top-full flex flex-col gap-2 bg-darkGray p-4">
                            {data.map(place => {
                                return (
                                    <Combobox.Option
                                        value={place}
                                        onClick={() => handleSelect(place.description)}
                                    >
                                        {({ active }) => (
                                            <p
                                                className={`border-b border-b-border py-1 ${active ? " text-crimson" : ""}`}
                                            >
                                                {place.description}
                                            </p>
                                        )}
                                    </Combobox.Option>
                                );
                            })}
                        </Combobox.Options>
                    </div>
                </Combobox>
            </div>
            <Button
                variant="unstyled"
                className="text-sm text-gray-100 opacity-50"
                onClick={getAddressByUserLocation}
            >
                Use my location
            </Button>
        </div>
    );
};

export const DateLocationStep = () => {
    const editedEvent = useMainStore(state => state.editedEvent)!;
    const setLocationType = useMainStore(state => state.setEditedEventLocationType)!;
    const setLocation = useMainStore(state => state.setEditedEventLocation);
    const setDate = useMainStore(state => state.setEditedEventDate);
    const setStartTime = useMainStore(state => state.setEditedEventStartTime);
    const setEndTime = useMainStore(state => state.setEditedEventEndTime);

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
            {editedEvent.locationType === "online" ? (
                <Input
                    value={editedEvent.location}
                    onChange={setLocation}
                    placeholder="Link to your event"
                />
            ) : (
                <LocationAutocomplete />
            )}
        </div>
    );
};
