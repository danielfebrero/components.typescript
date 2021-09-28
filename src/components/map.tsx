import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

interface PopupType {
  content: string;
}

export interface MarkersType {
  position: [number, number];
  popup?: PopupType;
}

interface Props {
  markers?: MarkersType[];
  scrollWheelZoom: boolean;
  zoom: number;
  center: [number, number];
}

const Map: React.FC<Props> = (props) => {
	return (
	<MapContainer center={props.center} zoom={props.zoom} scrollWheelZoom={props.scrollWheelZoom} id="mapid">
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