import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoid2FsdGVycnJ3IiwiYSI6ImNrZ3pmNmpudzEzYWUydG9lcjE3aG5kajQifQ.NRU8YKz5OEJHRoups2j4aA';

class Application extends React.Component {
    // Code from the next few steps will go here
    constructor(props) {
        // super(props);
        this.state = {
          lng: 21.3036,
          lat: 46.1927,
          zoom: 18.00
        };
      }

      componentDidMount() {
        const map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [this.state.lng, this.state.lat],
          zoom: this.state.zoom
        });

        map.on('move', () => {
            this.setState({
              lng: map.getCenter().lng.toFixed(4),
              lat: map.getCenter().lat.toFixed(4),
              zoom: map.getZoom().toFixed(2)
            });
          });

      }

      render() {
        return (
          <div>
            <div className='sidebarStyle'>
              <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
            </div>
            <div ref={el => this.mapContainer = el} className='mapContainer' />
          </div>
        )
      }


  }
  
  ReactDOM.render(<Application />, document.getElementById('app'));