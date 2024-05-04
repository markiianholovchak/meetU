import { useMemo } from "react";
import { Input } from "../../UI/Input";
import { TextArea } from "../../UI/TextArea";
import { Select } from "../../UI/Select";
import { WithLabel } from "../../UI/WithLabel";
import { useMainStore } from "../../../lib/store/store";
import { CATEGORIES } from "../../../lib/constants/event.constants";

export const DetailsStep = () => {
    const editedEvent = useMainStore(state => state.editedEvent)!;
    const setTitle = useMainStore(state => state.setEditedEventTitle);
    const setDescription = useMainStore(state => state.setEditedEventDescription);
    const setCategory = useMainStore(state => state.setEditedEventCategory);
    const setCoverImageFile = useMainStore(state => state.setCoverImageFile);

    const categoryOptions: SelectItem<string>[] = useMemo(() => {
        return CATEGORIES.map(category => {
            return {
                label: category,
                value: category
            };
        });
    }, []);
    return (
        <div className="flex flex-col gap-4 ">
            <Input
                value={editedEvent.title}
                onChange={setTitle}
                label="Title"
                placeholder="Add a catching title"
            />

            <WithLabel label="Category">
                <Select<string>
                    selected={editedEvent.category}
                    onChange={category => category && setCategory(category)}
                    placeholder="Select category"
                    options={categoryOptions}
                />
            </WithLabel>

            <TextArea
                value={editedEvent.description}
                onChange={setDescription}
                label="Description"
                placeholder="What will happen on your event?"
            />

            <WithLabel label="Cover image">
                <input type="file" onChange={e => setCoverImageFile(e.target.files?.[0] || null)} />
            </WithLabel>
        </div>
    );
};
