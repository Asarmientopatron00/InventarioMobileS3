import React, { useContext } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../contexts/authContext/AuthContext';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import { ESTADOS_SOLICITUD_ACCESO } from '../shared/constants/constants';
import { optionStyles } from '../theme/OptionTheme';

const Hello = () => {
  const {access_status, getStatus, user} = useContext(AuthContext);
  const {theme: {palette}} = useContext(ThemeContext);

  return (
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
        <Text style={{color: palette.text.primary, fontWeight: 'bold'}}>
          ESTADO SOLICITUD ACCESO: {ESTADOS_SOLICITUD_ACCESO.map((status) => status.id === access_status ? status.nombre.toUpperCase() : '')}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{...styles.button, backgroundColor: 'green'}}
            onPress={() => getStatus(user.id)}
          >
            <Text style={styles.textStyle}>CONSULTAR PERMISO</Text>
          </TouchableOpacity>
        </View>
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

export default Hello;