import React from 'react'
import { Picker } from '@react-native-picker/picker';
import { Text } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext/ThemeContext';

const MyPicker = (props) => {
  const {theme: {palette}} = React.useContext(ThemeContext);
  const {
    title,
    prompt,
    selected,
    onSelect,
    defaultLabel,
    options,
    keyValueLabel,
    keyValue
  } = props;
  return (
    <>
      <Text style={{color: palette.text.primary}}>{title}</Text>
      <Picker
        prompt={prompt}
        selectedValue={selected}
        onValueChange={(value) => onSelect(value)}
        style={{
          backgroundColor: palette.background.default,
        }}
        dropdownIconColor='black'
      >
        <Picker.Item
          label={defaultLabel}
          value={null}
          style={{
            color: 'gray',
            backgroundColor: palette.background.default
          }}
        />
        {options.map((option) => (
          <Picker.Item 
            key={option.id} 
            label={option[keyValueLabel].toString()} 
            value={option[keyValue]}
            style={{
              color: 'black',
              backgroundColor: palette.background.default
            }}
          />
        ))}
      </Picker>
    </>
  )
}

export default MyPicker;
