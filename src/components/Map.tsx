import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { CSSProperties } from "react";

const libraries = ["places" as const];

type MapProps = {
    mapContainerStyle?: CSSProperties;
    zoom?: number;
    markers?: google.maps.LatLngLiteral[];
    center?: google.maps.LatLngLiteral;
};

export const Map = ({
    mapContainerStyle = {
        width: "100%",
        height: "100%"
    },
    zoom = 10,
    markers,
    center = {
        lat: 0,
        lng: 0
    }
}: MapProps) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBgwiVWylWV7fBaAQuXt-LaAzKUNoq_eI8",
        libraries
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <div className="h-full w-full">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={zoom}
                center={markers?.[0] || center}
            >
                {markers?.map(marker => {
                    return <MarkerF position={marker} />;
                })}
            </GoogleMap>
        </div>
    );
};
