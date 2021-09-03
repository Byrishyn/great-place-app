import React from "react"
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"

import Colors from "../constants/Colors";

const ImgPicker = props => {

    const takeImageHandler =  async () => {
        const result = await ImagePicker.requestCameraPermissionsAsync()
        if (result.granted){
            ImagePicker.launchCameraAsync()
        } else {
            Alert.alert(
                "Permission unsufficient",
                "Need camera permission",
                [{text:"Ok"}]
            )
        }
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imageContainer}>
                <Text>No image picked yet</Text>
                <Image style={styles.image} />
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