import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker ,InfoWindow } from "google-maps-react";
import Geocode from "react-geocode";

const TripMap = props => {
  console.log(props);
  const [destinations, setDestinations] = useState(null);
  let trips = props.trips.results;
  // trips.length = 3;
  console.log(trips);
  useEffect(() => {
    Geocode.setApiKey(process.env.REACT_APP_G_API);
    Geocode.enableDebug();
    async function getCoords (tripObj){
      let test = await Geocode.fromAddress(tripObj.destination).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          return {...tripObj, coords:{lat,lng}}
        }
        
      );
      // console.log(test);
      return test;
    }
    //need to reduce tip to take out duplicates;
    let knownTrips = {}
    let filteredTrips = trips.filter((tripObj,index) => {
      if(knownTrips[tripObj.destination]){
        return false;
      } else {
        knownTrips[tripObj.destination] = true;
        return true
      }
    })
    Promise.all(filteredTrips.map(trip => getCoords(trip))).then(vals => {
      setDestinations(vals)
    })

    
  }, []);
  const mapStyle={height:300,width:300,position:'static'}
  return (
    <Map
      google={props.google}
      style={mapStyle}
      containerStyle={{ position: "static" }}
      zoom={3}
      initialCenter={{ lat: 37.9072, lng: -95.0369 }}
    >
      {destinations
        ? destinations.map((dest, index) => (
            <Marker
              className="bg-green-800"
              key={index}
              title={dest.destination}
              name={dest.destination}
              position={{ lat: dest.coords.lat, lng: dest.coords.lng }}
            ></Marker>
          ))
        : null}
    </Map>
    // <div style={{width:"400px",height:"400px", backgroundColor:'blue'}}></div>
  );
};
//I reduced the amount of available calls per day, dont forget!
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_G_API
})(TripMap);
