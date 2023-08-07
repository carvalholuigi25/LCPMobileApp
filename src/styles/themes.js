/* src: https://reactnavigation.org/docs/themes/ */

import { LoadSessions } from "../sessions";

export const myThemes = {
    dark: {
        dark: true,
        colors: {
            primary: 'rgb(255, 45, 85)',
            background: 'black',
            color: 'white',
            card: 'rgb(0, 0, 0)',
            text: 'white',
            border: 'rgb(199, 199, 204)',
            notification: 'rgb(255, 69, 58)',
            picker: 'black',
            button: '#444950'
        }
    },
    light: {
        dark: false,
        colors: {
            primary: 'rgb(255, 45, 85)',
            background: 'rgb(242, 242, 242)',
            color: 'black',
            card: 'rgb(255, 255, 255)',
            text: 'black',
            border: 'rgb(199, 199, 204)',
            notification: 'rgb(255, 69, 58)',
            picker: 'black',
            button: '#2196F3'
        }
    }
};

export const aryThemes = require('../data/themes.json');

export const setPropStyleTheme = (theme, propname) => {
    var pval = "";
    var isDark = theme == "dark" ? true : false;

    if (propname == "background") {
        pval = isDark ? myThemes.dark.colors.background : myThemes.light.colors.background;
    } else if (propname == "color") {
        pval = isDark ? myThemes.dark.colors.color : myThemes.light.colors.color;
    } else if (propname == "picker") {
        pval = isDark ? myThemes.dark.colors.picker : myThemes.light.colors.picker;
    } else if (propname == "button") {
        pval = isDark ? myThemes.dark.colors.button : myThemes.light.colors.button;
    } else {
        pval = isDark ? myThemes.dark.colors.text : myThemes.light.colors.text;
    }

    return pval;
}
