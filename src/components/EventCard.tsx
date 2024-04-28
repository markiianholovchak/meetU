export const EventCard = () => {
    return (
        <div
            className=" relative h-[160px] w-full "
            style={{
                backgroundImage:
                    "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }}
        >
            <img
                src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="absolute bottom-0 left-0 right-0 top-0 z-[-1] h-full w-full rounded-xl object-cover object-center"
                alt="Event cover"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 z-[-1] rounded-xl bg-black opacity-40"></div>

            <div className="z-10 px-3 py-2 text-xs">
                <p>02 Mar 2024</p>
            </div>
        </div>
    );
};
