import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from '../assets/icons'
import { hp, wp } from '../helpers/common'
import { useRouter } from 'expo-router'

const BackButton = () => {
    const router = useRouter()
    return (
        <Pressable style={styles.backArrow} onPress={()=>router.back()}>
            <Icon name="BackArrow" />

        </Pressable>
    )
}

export default BackButton

const styles = StyleSheet.create({
    backArrow: {
        alignSelf: "flex-start",
        marginHorizontal: wp(5),
        marginTop: hp(1),
        backgroundColor: "#d1d5db",
        padding: wp(2),
        borderRadius: 16,
        elevation: 2,
        shadowColor: "#000",
    }
});