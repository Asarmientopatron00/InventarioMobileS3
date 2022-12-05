import React, {createContext, useReducer} from "react";
import {themeReducer} from "./themeReducer";

export const lighTheme = {
	currentTheme: "light",
	dark: false,
	dividerColor: 'rgba(0,0,0,0.7)',
	colors: {
		primary: 'black',
		background: 'black',
		card: 'black',
		text: 'black',
		border: 'black',
		notification: 'black'
	},
	palette: {
		grayBottoms: '#999',
		redBottoms: '#be1e2d',
		colorHover: '#4992de',
		enviaEmailBottoms: '#043927',
		background: {
			paper: '#fff',
			default: '#f4f7fe',
		},
		primary: {
			main: '#0c4f7f',
			contrastText: '#fff',
		},
		secondary: {
			main: '#F04F47',
		},
		sidebar: {
			bgColor: '#f4f7fe',
			textColor: '#0c4f7f',
			fontSize: '14px',
			fontWeight: '600',
		},
		text: {
			primary: '#000',
			secondary: '#74788d',
			disabled: '#909098',
			hint: '#777B7C',
			white: '#fff',
		},
		boxes: {
			success: '#46AD47',
			error: '#930000'
		}
 	},
}

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
	const [theme, dispatch] = useReducer(themeReducer, lighTheme);

	return (
		<ThemeContext.Provider value={{theme}}>
			{children}
		</ThemeContext.Provider>
	);
}