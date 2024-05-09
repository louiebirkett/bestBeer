import './styles/styles.css'
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

import BuildMap from './components/map';
import SideBar from './components/sidebar';

function App() {
  const position = {lat: 61.2176, lng: -149.8997};

  return (
    <div>
      <SideBar/>
      <div className='mapContainer'>
        <BuildMap/>
      </div>
    </div>
  );
}

export default App;