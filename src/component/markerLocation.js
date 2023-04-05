import React from 'react'
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import { Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';

const MarkerLocation = ({ location, region, city }) => {
    const map = useMap();
    if (location) map.flyTo(location, 18);
  
    const customIcon = new Icon({
      iconUrl: iconMarker,
      iconSize: [30, 35]
    })
  
    return location ? (
      <Marker
        draggable
        position={location}
        icon={customIcon}
      >
        <Popup>{region}, {city}</Popup>
      </Marker>
    ) : null;
  }

export default MarkerLocation;