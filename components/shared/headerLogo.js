import React from "react";
import { View, Image, StyleSheet } from "react-native";

function HeaderLogo({ imageSrc }) {
    return (
        <View>
            <Image style={styles.logoStyles} source={imageSrc} />
        </View>
    );
};

const styles = StyleSheet.create({
    logoStyles: {
        height: 40,
        width: 180,
    },
});

export default HeaderLogo