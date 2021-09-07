import React, { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from "react-native"
import { useDispatch } from "react-redux"

import Colors from "../constants/Colors"
import * as placesActions from "../store/place-actions"
import ImagePicker from "../components/ImagePicker"
import LocationPicker from "../components/LocationPicker"

const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState("")
    const [imageSelected, setImageSelected] = useState()
    const dispatch = useDispatch()

    const changeTextHandler = text => {
        setTitleValue(text)
    }

    const onSaveHandler = () => {
        dispatch(placesActions.addPlace(titleValue, imageSelected))
        props.navigation.goBack()
    }

    const imageTakenHandler = (imageUri) => {
        setImageSelected(imageUri)
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.textInput} onChangeText={changeTextHandler} value={titleValue} />
                <ImagePicker onImageTaken={imageTakenHandler} />
                <LocationPicker navigation={props.navigation} />
                <Button title="Save place" color={Colors.primary} onPress={onSaveHandler} />
            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = {
    headerTitle: "Add place"
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
})

export default NewPlaceScreen;