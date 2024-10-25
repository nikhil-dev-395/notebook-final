import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'

const Button = ({ loading = false, buttonTitle, onPress =()=>{} }) => {

    if (loading) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <Pressable style={styles.button} onPress={onPress} >
            <Text style={styles.buttonTitle}>
                {buttonTitle || "Button "}
            </Text>
        </Pressable>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.background,
        width: "80%",
        padding: 15,
        borderRadius: theme.radius.xxl,
        marginVertical: 10,
        alignSelf: "center",
        justifyContent: "center",
    },
    buttonTitle: { 
        textAlign: "center",
        color: theme.colors.textLight,
        fontSize: theme.radius.xxl,
        fontWeight: theme.fonts.extrabold,
    }
})