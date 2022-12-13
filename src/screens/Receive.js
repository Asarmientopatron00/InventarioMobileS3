import { Picker } from '@react-native-picker/picker';
import React, { useContext, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../contexts/authContext/AuthContext';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import { TitleOption } from '../shared/components/TitleOption';
import { optionStyles } from '../theme/OptionTheme';
import { LoadingScreen } from './LoadingScreen';

const options = [
  {id: 1, nombre: 'JavaScript'},
  {id: 2, nombre: 'Python'},
  {id: 3, nombre: 'TypeScript'},
  {id: 4, nombre: 'C++'},
  {id: 5, nombre: 'C#'},
  {id: 6, nombre: 'Php'},
  {id: 7, nombre: 'Ruby'},
  {id: 8, nombre: 'Go'},
  {id: 9, nombre: 'C'},
  {id: 10, nombre: 'R'},
  {id: 11, nombre: 'Swift'},
  {id: 12, nombre: 'Kotlin'},
  {id: 13, nombre: 'Ruby'},
  {id: 14, nombre: 'Rust'},
  {id: 15, nombre: 'Scala'},
];

const Receive = () => {
  const {access_status} = useContext(AuthContext);
  const {theme: {palette}} = useContext(ThemeContext);
  const [status, setStatus] = useState('ok');
  const [selected, setSelected] = useState();

  return (
    status === 'loading' ? 
      <LoadingScreen/> 
    :
      <ScrollView
        style={optionStyles.globalMargin}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => console.log(access_status)}
          />
        }
      >
        <View style={{...optionStyles.mainContainer, backgroundColor: palette.background.default}}>
          <TitleOption title='Recibir'/>
          <Text style={{color: palette.text.primary}}>Remisiones</Text>
          <Picker
            prompt='Remisiones'
            selectedValue={selected}
            onValueChange={(value) => setSelected(value)}
            style={{
              backgroundColor: palette.background.default,
            }}
            dropdownIconColor='black'
          >
            {options.map((option) => (
              <Picker.Item 
                key={option.id} 
                label={option.nombre} 
                value={option.id}
                style={{
                  color: 'black',
                  backgroundColor: palette.background.default
                }}
              />
            ))}
          </Picker>
        </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginLeft: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalLabel: {
    marginBottom: 1,
    fontSize: 10
  },
  modalTittle: {
    marginBottom: 25,
    fontSize: 20,
    fontWeight: 'bold'
  },
  modalInput : {
    borderRadius: 10,
    borderBottomWidth: 1,
    marginBottom: 15,
    height: 30,
    paddingBottom: 5,
    paddingLeft: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputView: {
    width: '50%'
  },
  inputAndPicker : {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  }
});

export default Receive;