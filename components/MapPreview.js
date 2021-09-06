import React from "react"
import { StyleSheet, View, Image } from "react-native"
import vars from "../env"

const MapPreview = props => {
    let imageUri;

    if (props.location) {
        imageUri = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${vars.googleApiKey}`
    } return (
        <View style={{...styles.mapPreview, ...props.style}}>
            {props.location ? (
                <Image source={imageUri} style={styles.imagePreview} />
            ) : (
                props.children
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: "center",
        alignItems: "center"
    },
    imagePreview: {
        width: "100%",
        height: "100%"
    }
})

export default MapPreview