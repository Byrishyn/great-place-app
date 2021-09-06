import React, { useState } from "react"
import { View, Button, ActivityIndicator, Text, Alert, StyleSheet } from "react-native"
import * as Location from "expo-location"

import Colors from "../constants/Colors"
import MapPreview from "./MapPreview"


const LocationPicker = props => {
    const [pickedLocation, setPickedLocation] = useState()
    const [isFetching, setIsFetching] = useState(false)
    const getLocationHandler = async () => {
        const result = await Location.requestForegroundPermissionsAsync()
        if (!result.granted) {
            Alert.alert(
                "Permission unsufficient",
                "Need location permission",
                [{ text: "Ok" }]
            )
            return;
        }
        try {
            setIsFetching(true)
            const location = await Location.getCurrentPositionAsync({})
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.latitude
            })
        } catch (err) {
            Alert.alert(
                "An error occured",
                "Could not get location, try again later",
                [{ text: "Okay" }]
            )
        }
        setIsFetching(false)
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.locationPreview} location={pickedLocation}>
                {isFetching ? (
                    <ActivityIndicator size="large" color={Colors.primary} />
                ) : (
                    <Text>No location yet</Text>
                )}
            </MapPreview>
            <Button title="Get user location" color={Colors.primary} onPress={getLocationHandler} />
        </View >
    )
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    locationPreview: {
        marginBottom: 10,
        width: "100%",
        height: 150,
        borderColor: "#ccc",
        borderWidth: 1,
    },
})

export default LocationPicker