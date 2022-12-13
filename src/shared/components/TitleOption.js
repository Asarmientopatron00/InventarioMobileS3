import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/themeContext/ThemeContext';
import { Text, View, StyleSheet } from 'react-native';

export const TitleOption = ({title, center}) => {
  const {theme: {palette}} = useContext(ThemeContext)
  return (
    <View>
      <Text style={{...styles.title, color: palette.text.primary, textAlign: center?'center':'left'}}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20
  }
});