import {
    DateSegment as DateSegmentType,
    TimeFieldState,
    useTimeFieldState
} from "@react-stately/datepicker";
import {
    TimeValue,
    useDateSegment,
    useTimeField,
    type AriaTimeFieldProps
} from "@react-aria/datepicker";
import React from "react";

function DateSegment({ segment, state }: { segment: DateSegmentType; state: TimeFieldState }) {
    const ref = React.useRef(null);
    const { segmentProps } = useDateSegment(segment, state, ref);

    return (
        <div
            {...segmentProps}
            ref={ref}
            className={`segment ${segment.isPlaceholder ? "placeholder" : ""}`}
        >
            {segment.text}
        </div>
    );
}

type TimePickerProps = AriaTimeFieldProps<TimeValue>;

export const TimePicker = (props: TimePickerProps) => {
    const state = useTimeFieldState({
        ...props,
        locale: "en-GB"
    });

    const ref = React.useRef(null);
    const { labelProps, fieldProps } = useTimeField(props, state, ref);

    return (
        <div className="flex items-center rounded-md bg-darkGray px-2 py-1 text-sm">
            <span {...labelProps}>{props.label}</span>
            <div {...fieldProps} ref={ref} className="flex">
                {state.segments.map((segment, i) => (
                    <DateSegment key={i} segment={segment} state={state} />
                ))}
                {/* {state.isInvalid && <span aria-hidden="true">🚫</span>} */}
            </div>
        </div>
    );
};
