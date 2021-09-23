import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

interface PopupType {
  content: string;
}

export interface MarkersType {
  position: [number, number];
  popup?: PopupType;
}

interface Props {
  markers?: Array<MarkersType>;
  scrollWheelZoom: boolean;
  zoom: number;
}

const Map: React.FC<Props> = (props) => {
	return (
	<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={props.scrollWheelZoom} id="mapid">
		<TileLayer
		  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		/>
    {
      props.markers && props.markers.map((m) => {
        return (
          <Marker key={`${m.position[0]}.${m.position[1]}`} position={m.position}>
            {
              m.popup && (
                <Popup>
                  { m.popup.content }
                </Popup>
              )
            }
            
          </Marker>
        )
      })
    }
	</MapContainer>
	)
}

export default Map;