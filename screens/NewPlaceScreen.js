import React, { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from "react-native"
import Colors from "../constants/Colors"

const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState("")

    const changeTextHandler = text => {
        setTitleValue(text)
    }

    const onSaveHandler = () => {

    }
    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.textInput} onChangeText={changeTextHandler} value={titleValue}/>
                <Button title="Save place" color={Colors.primary} onPress={onSaveHandler} />
            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = {
    headerTitle: "Add place"
}

const styles = StyleSheet.create({
    form : {
        margin: 30
    },
    label : {
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