import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
// import icons from "../assets/icons/index.jsx"
import Icon from '../assets/icons/index.jsx';
const TabBar = ({ state, descriptors, navigation }) => {
    const grayColor = "gray";
    const primaryColor = "blue";

    const icons = {


        index: 'HomeIcon',
        AiChat: 'AiIcon',
        Quick: 'QuickNote',
        Search: 'SearchIcon',
        Account: 'User',
    };

    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel ?? options.title ?? route.name;

                if (["_sitemap", "+not-found"].includes(route.name)) return null;

                const isFocused = state.index === index;
                const iconColor = isFocused ? primaryColor : grayColor;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.name}
                        style={styles.tabBarItem}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    >
                        {/* <AntDesign name={icons[route.name]} size={20} color={iconColor} /> */}

                        <Icon name={icons[route.name]} size={20} color={iconColor} />

                        {/* <Text style={[styles.tabLabel, { color: isFocused ? '#673ab7' : '#222' }]}>
                            {label}
                        </Text> */}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default TabBar;

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        flexDirection: "row",
        bottom: 0,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f0f9ff",
        marginHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 20,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },
    tabBarItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },
    tabLabel: {
        fontSize: 12,
    },
});
