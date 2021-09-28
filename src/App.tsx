import './App.css';
import Map, { MarkersType } from './components/Map';
const App = () => {

  const markers: Array<MarkersType> = [
    {
      position: [51.505, -0.09],
      popup: {
        content: 'First marker'
      }
    },
    {
      position: [51.500, -0.09],
      popup: {
        content: 'Second marker'
      }
    }
  ]

  return (
      <div id="main">
        <Map 
          markers={markers} 
          scrollWheelZoom={true}
          zoom={13}
          center={[51.505, -0.09]}
        />
      </div>
  );
}

export default App;