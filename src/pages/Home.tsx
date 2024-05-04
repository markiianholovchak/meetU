import { Navbar } from "../components/Navbar";
import { useMainStore } from "../lib/store/store";
import { useMemo, useState } from "react";
import { Input } from "../components/UI/Input";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineSort } from "react-icons/md";
import { EventCard } from "../components/EventCard";
import { useSearchEvents } from "../lib/hooks/api/useSearchEvents";

const CATEGORIES = ["Sport", "Culture", "Drinks", "Science", "Clubs", "Travel"];

type CategoryChipProps = {
    category: string;
};
const CategoryChip = ({ category }: CategoryChipProps) => {
    return <div className="rounded bg-crimson px-3 py-1 text-center text-xs">{category}</div>;
};

const CategoriesList = () => {
    return (
        <div className="flex gap-2 overflow-auto">
            {CATEGORIES.map(category => (
                <CategoryChip key={category} category={category} />
            ))}
        </div>
    );
};

export const HomePage = () => {
    const user = useMainStore(state => state.user);
    const [query, setQuery] = useState("");
    const { data: events, isLoading } = useSearchEvents(query);

    const filteredData = useMemo(() => {
        return events?.filter(event => {
            return (
                event.title.includes(query) ||
                event.description.includes(query) ||
                event.category.includes(query) ||
                event.location.includes(query)
            );
        });
    }, [events, query]);
    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-5">
                    <p className="text-2xl font-semibold">Hey, {user?.name}!</p>
                    <Input
                        value={query}
                        onChange={setQuery}
                        placeholder="Search events..."
                        leftIcon={<IoIosSearch className="h-6 w-6" />}
                    />
                    <CategoriesList />
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Events in your location: </p>
                        <div className="flex items-center justify-center gap-2 rounded-md bg-darkGray px-2 py-1 text-xs">
                            Order by
                            <MdOutlineSort className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mb-8 flex flex-col gap-4">
                        {isLoading && <p>Loading...</p>}
                        {filteredData?.map(event => {
                            return <EventCard key={event.id} event={event} />;
                        })}
                    </div>
                </div>
            </div>
            <Navbar />
        </>
    );
};
