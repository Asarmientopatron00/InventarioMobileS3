import {useEffect, useState} from 'react'
import Geolocation from '@react-native-community/geolocation';

const config = {
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
  locationProvider: 'auto',
}

Geolocation.setRNConfiguration(config);

export const useLocation = () => {
  const [state, setState] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    getLocation();
  },[]);

  const success = (position) => {
    const {latitude, longitude} = position.coords;
    setState({
      latitude,
      longitude
    })
  }

  const error = (e) => {
    console.log(e)
  }

  const options = {
    enableHighAccuracy: true
  }

  const getLocation = () => {
    Geolocation.getCurrentPosition(success, error, options)
  }

  return {
    ...state,
    getLocation
  }
}