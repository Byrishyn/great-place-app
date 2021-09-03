import React, { useState } from "react"
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker"

import Colors from "../constants/Colors";

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState()
    const takeImageHandler = async () => {
        const result = await ImagePicker.requestCameraPermissionsAsync()
        if (!result.granted) {
            Alert.alert(
                "Permission unsufficient",
                "Need camera permission",
                [{ text: "Ok" }]
            )
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        })

        if (!image.cancelled) {
            setPickedImage(image.uri)
        }
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imageContainer}>
                {!pickedImage ? (
                    <Text>No image picked yet</Text>
                ) : (
                    <Image style={styles.image} source={{ uri: pickedImage }} />
                )}
            </View>
            <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: "center"
    },
    imageContainer: {
        width: "100%",
        height: 200,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
        borderWidth: 1
    },
    image: {
        width: "100%",
        height: "100%"
    }
})

export default ImgPicker