import React, { useEffect, useState } from "react"
import { View, Button, ActivityIndicator, Text, Alert, StyleSheet } from "react-native"
import * as Location from "expo-location"

import Colors from "../constants/Colors"
import MapPreview from "./MapPreview"


const LocationPicker = props => {
    const [pickedLocation, setPickedLocation] = useState()
    const [isFetching, setIsFetching] = useState(false)

    const mapPickedLocation = props.navigation.getParam("pickedLocation")

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation)
        }
    }, [mapPickedLocation])

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
                lng: location.coords.longitude
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

    const pickOnMapHandler = () => {
        props.navigation.navigate("Map")
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview
                style={styles.locationPreview}
                location={pickedLocation}
                onPress={pickOnMapHandler}
            >
                {isFetching ? (
                    <ActivityIndicator size="large" color={Colors.primary} />
                ) : (
                    <Text>No location yet</Text>
                )}
            </MapPreview>
            <View style={styles.actions}>
                <Button title="Get user location" color={Colors.primary} onPress={getLocationHandler} />
                <Button title="Choose on map" color={Colors.primary} onPress={pickOnMapHandler} />
            </View>
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
    actions: {
        justifyContent: "space-around",
        flexDirection: "row",
        width: "100%"
    }
})

export default LocationPicker