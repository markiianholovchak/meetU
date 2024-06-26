import { DesktopNavbar, Navbar } from "../components/Navbar";
import { useMainStore } from "../lib/store/store";
import { useEffect, useMemo, useState } from "react";
import { Input } from "../components/UI/Input";
import { IoIosSearch } from "react-icons/io";
import { EventCard } from "../components/EventCard";
import { useSearchEvents } from "../lib/hooks/api/useSearchEvents";
import { coordinatesToAddress } from "../lib/helpers";
import { IoClose } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { EventCardsContainer } from "../components/UI/EventCardsContainer";
import useDeviceType from "../lib/hooks/useDeviceType";

const CATEGORIES = ["Sport", "Culture", "Drinks", "Science", "Clubs", "Travel"];

type CategoryChipProps = {
    category: string;
    onClick?: (category: string) => void;
    withCloseButton?: boolean;
    onClose?: () => void;
};
const CategoryChip = ({ category, onClick, withCloseButton, onClose }: CategoryChipProps) => {
    return (
        <div
            className="flex items-center gap-1 rounded bg-crimson px-3 py-1 text-center text-xs"
            onClick={() => onClick?.(category)}
        >
            {category}
            {withCloseButton && (
                <IoClose
                    onClick={e => {
                        e.stopPropagation();
                        onClose?.();
                    }}
                />
            )}
        </div>
    );
};

const CategoriesList = () => {
    const setCategoryFilter = useMainStore(state => state.setCategoryFilter);
    return (
        <div className="flex gap-2 overflow-auto">
            {CATEGORIES.map(category => (
                <CategoryChip key={category} category={category} onClick={setCategoryFilter} />
            ))}
        </div>
    );
};

export const HomePage = () => {
    const user = useMainStore(state => state.user);
    const [query, setQuery] = useState("");
    const categoryFilter = useMainStore(state => state.categoryFilter);
    const setCategoryFilter = useMainStore(state => state.setCategoryFilter);
    const userLocation = useMainStore(state => state.userLocation);
    const setUserLocation = useMainStore(state => state.setUserLocation);
    const { data: events, isLoading } = useSearchEvents(categoryFilter);
    const { isMobile } = useDeviceType();

    const filteredData = useMemo(() => {
        if (!query) return events;

        return events?.filter(event => {
            return (event.title + event.description + event.category + event.location)
                .toLowerCase()
                .includes(query.toLowerCase());
        });
    }, [events, query]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async position => {
            const coords: MapCoordinates = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            const result = await coordinatesToAddress(coords);
            setUserLocation({
                address: result,
                coordinates: coords
            });
        });
    }, [setUserLocation]);

    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-5">
                    {userLocation && (
                        <div className="flex w-max max-w-[200px] items-center gap-2 truncate rounded-xl bg-darkGray px-2 py-1">
                            <FaMapMarkerAlt className="flex-shrink-0" />
                            <p className="truncate">{userLocation.address}</p>
                        </div>
                    )}

                    <div className="flex justify-between">
                        <p className="text-2xl font-semibold">
                            {user ? `Hey, ${user.name}` : "Welcome to meetU!"}
                        </p>
                        {!isMobile && <DesktopNavbar />}
                    </div>
                    <Input
                        value={query}
                        onChange={setQuery}
                        placeholder="Search events..."
                        leftIcon={<IoIosSearch className="h-6 w-6" />}
                    />
                    <CategoriesList />
                    <div className="flex items-center justify-between gap-2 md:flex-col md:items-start">
                        <p className="font-semibold">Explore events: </p>
                        {categoryFilter && (
                            <CategoryChip
                                withCloseButton
                                category={categoryFilter}
                                onClose={() => setCategoryFilter(null)}
                            />
                        )}
                    </div>
                    <EventCardsContainer>
                        {isLoading && <p>Loading...</p>}
                        {filteredData?.map(event => {
                            return <EventCard key={event.id} event={event} />;
                        })}
                        {!isLoading && !filteredData?.length && (
                            <p className="text-gray-100 opacity-50">No events found...</p>
                        )}
                    </EventCardsContainer>
                </div>
            </div>
            {isMobile && <Navbar />}
        </>
    );
};
