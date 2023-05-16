import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode, setLanguage } from '../redux/actions';

export default function OptionPopup({ displayStyle, setDisplayStyle, toggleDisplay, pageState }) {
    const dispatch = useDispatch();
    const { darkMode, language } = useSelector((state) => state);

    const theme = [
        { label: 'Light', value: 0},
        { label: 'Dark', value: 1}
    ];
    const lang = [
        { label: 'English', value: 0},
        { label: 'Indonesia', value: 1}
    ];

  return (
    <TouchableOpacity 
        activeOpacity={0} 
        style={[styles.container, {display: displayStyle}]} 
        onPress={() => setDisplayStyle("none")}>
            <View style={darkMode ? styles.popup_theme_dark : styles.popup_theme}>
                <Text style={darkMode ? styles.popup_theme_title_dark : styles.popup_theme_title}>Select option</Text>
                {pageState === "theme" ? (
                    <RadioForm style={styles.popup_radio_button}>
                        {theme.map((obj, i) => (
                            <RadioButton key={i}>
                                <RadioButtonInput
                                obj={obj}
                                index={i}
                                buttonSize={16}
                                buttonWrapStyle={{marginBottom: 8}}
                                isSelected={darkMode === i}
                                onPress={() => {
                                    dispatch(setDarkMode(i))
                                    toggleDisplay()}}
                                />
                                <RadioButtonLabel
                                obj={obj}
                                index={i}
                                labelHorizontal={true}
                                labelStyle={{fontSize: 16, marginTop: -8, color: darkMode ? "#FFF" : "#000"}}
                                />
                            </RadioButton>
                        )
                        )}
                    </RadioForm>
                ) : pageState === "lang" ? (
                    <RadioForm style={styles.popup_radio_button}>
                        {lang.map((obj, i) => (
                            <RadioButton key={i}>
                                <RadioButtonInput
                                obj={obj}
                                index={i}
                                buttonSize={16}
                                buttonWrapStyle={{marginBottom: 8}}
                                isSelected={language === i}
                                onPress={() => {
                                    dispatch(setLanguage(i))
                                    toggleDisplay()}}
                                />
                                <RadioButtonLabel
                                obj={obj}
                                index={i}
                                labelHorizontal={true}
                                labelStyle={{fontSize: 16, marginTop: -8, color: darkMode ? "#FFF" : "#000"}}
                                />
                            </RadioButton>
                        )
                        )}
                    </RadioForm>
                ) : (<View></View>)}
            </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(52, 52, 52, 0.8)",
    },
    popup_theme: {
        width: "80%",
        height: "20%",
        borderRadius: 15,
        paddingHorizontal: 30,
        paddingVertical: 25,
        backgroundColor: "white",
    },
    popup_theme_dark: {
        width: "80%",
        height: "20%",
        borderRadius: 15,
        paddingHorizontal: 30,
        paddingVertical: 25,
        backgroundColor: "#111827",
    },
    popup_theme_title: {
        fontSize: 18,
        fontWeight: "600"
    },
    popup_theme_title_dark: {
        fontSize: 18,
        fontWeight: "600",
        color: "white"
    },
    popup_radio_button: {
        marginTop: 20
    },
})