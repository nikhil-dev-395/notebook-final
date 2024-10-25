import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'

const InputText = (props) => {
    return (
        <View style={styles.container}>
            {
                props.icon && props.icon
            }
            <TextInput
                style={{ flex: 1 }}
                placeholderTextColor={theme.colors.textDark}
                placeholder={props.placeholder}
                ref={props.inputRef}
                {...props} />

        </View>
    )
}

export default InputText

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        borderRadius: theme.radius.xxl,
        borderCurve: "continuous",
        height: hp(7.2),
        paddingHorizontal: 18,
        justifyContent: "center",
        borderWidth: 0.6,
        borderColor: theme.colors.dark,
        height: 50,
        width: "90%",
        marginLeft: 20,
        marginBottom: 15,

    }
})