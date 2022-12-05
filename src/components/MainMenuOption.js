import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { mainStyles } from '../theme/AppTheme';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';

export const MainMenuOption = ({iconName, itemTitle, onPress}) => {
  const {theme: {palette}} = useContext(ThemeContext);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={mainStyles.menuButton}
    >
      <View style={mainStyles.LateralMenuIcon}>
        {iconName.length>0 &&
        <Icon
          name={iconName}
          size={25}
          color={palette.sidebar.textColor}
          style={{marginRight: 10}}
        /> }
        <Text 
          adjustsFontSizeToFit 
          style={{
            ...mainStyles.menuItem, 
            color: palette.sidebar.textColor,
            fontWeight: 'bold'
          }}
        >
          {itemTitle}
        </Text>
      </View>
      <Icon
        name='chevron-forward-outline'
        size={25}
        color={palette.sidebar.textColor}
        style={{opacity: 0.5}}
      />
    </TouchableOpacity>
  );
};