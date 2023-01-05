import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ReadList from '../components/Receive/ReadList';
import ReceiveForm from '../components/Receive/ReceiveForm';
import { AuthContext } from '../contexts/authContext/AuthContext';
import { RemisionContext } from '../contexts/remisionContext/RemisionContext';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import { MessageModal } from '../shared/components/MessageModal';
import MyPicker from '../shared/components/MyPicker';
import { TitleOption } from '../shared/components/TitleOption';
import { optionStyles } from '../theme/OptionTheme';
import { LoadingScreen } from './LoadingScreen';
import { useLocation } from '../shared/hooks/useLocation';

const MyProductPicker = (props) => {
  const {theme: {palette}} = React.useContext(ThemeContext);
  const {
    title,
    prompt,
    selected,
    onSelect,
    defaultLabel,
    options,
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
            label={`${option.nombre} - (${option.rango})`} 
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

const initialSelect = {
  remision: null,
  producto: {
    id: null,
    tipo: null
  }
}

const Receive = () => {
  const [selected, setSelected] = useState(initialSelect);
  const [read, setRead] = useState([]);
  const {user} = useContext(AuthContext);
  const {onGetRemisiones, datos, status, selectedRow, onRead, onAccept} = useContext(RemisionContext);
  const {theme: {palette}} = useContext(ThemeContext);
  const {latitude, longitude} = useLocation();

  useEffect(() => {
    onGetRemisiones({usuario: user.id, reload: false})
  },[]);

  useEffect(() => {
    if(selectedRow && selectedRow.length>0){
      addToReadList(selectedRow)
    }
  },[selectedRow])

  const productos = useMemo(() => {
    return datos.find((data) => data.numero_remision === selected.remision)?.productos??[]
  },[selected.remision]);

  const count = useMemo(() => {
    return datos.find((data) => data.numero_remision === selected.remision)?.cuenta??0
  },[selected.remision]);

  const onSelectRemision = (remision) => {
    setSelected({
      ...initialSelect,
      remision
    })
    setRead([])
  }

  const onSelectProducto = (producto) => {
    const proT = productos.find((pro) => pro.id === producto)
    setSelected({
      ...selected,
      producto: {
        id: producto,
        tipo: proT?.tipo??''
      }
    })
  }

  const addToReadList = (list) => {
    const newRead = [...read];
    const newArr = [];
    list.forEach((item) => {
      const index = newRead.findIndex((it) => it.id === item.id);
      if(!~index){
        const data = {
          id: item.id,
          producto: item.detalle.nombre,
          serial: item.serial
        }
        newArr.splice(0, 0, data);
      }
    })
    setRead([...newArr, ...newRead])
  }

  const onReadAll = () => {
    const data = {
      numero_remision: selected.remision,
      producto_id: selected.producto.id,
      tipo: selected.producto.tipo,
      todos: true
    }
    onRead({data})
  }

  const onReceive = () => {
    const rem = datos.find((data) => data.numero_remision === selected.remision);
    if(rem){
      const data = {
        id: rem.id,
        action: 'Confirm',
        latitude,
        longitude
      }
      onAccept({data, reinitialize})
    }
  }

  const reinitialize = () => {
    setSelected(initialSelect);
    setRead([]);
    onGetRemisiones({usuario: user.id, reload: false})
  }

  return (
    status === 'loading' ? 
      <LoadingScreen/> 
    :
      <ScrollView
        style={optionStyles.globalMargin}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => onGetRemisiones({usuario: user.id, reload: true})}
          />
        }
      >
        <View style={{...optionStyles.mainContainer, backgroundColor: palette.background.default}}>
          <TitleOption title='Recibir'/>
          <MyPicker
            title='Remisiones'
            prompt='Remisiones'
            selected={selected.remision}
            onSelect={onSelectRemision}
            keyValueLabel='nombre'
            keyValue='numero_remision'
            defaultLabel='Seleccione una remisión'
            options={datos}
          />
          {productos.length > 0 && (
            <MyProductPicker
              title='Productos'
              prompt='Productos'
              selected={selected.producto.id}
              onSelect={onSelectProducto}
              keyValueLabel='nombre'
              keyValue='id'
              defaultLabel='Seleccione un producto'
              options={productos}
            />
          )}
          {selected.producto.id && 
            <>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={{...styles.button, backgroundColor: palette.primary.main}}
                  onPress={onReadAll}
                >
                  <Text style={styles.textStyle}>LEER TODOS</Text>
                </TouchableOpacity>
              </View>
              <ReceiveForm
                producto={selected.producto}
                remision={selected.remision}
              />
            </>
          }
          {selected.remision &&
            <ReadList
              read={read}
              count={count}
              onReceive={onReceive}
            />
          }
        </View>
        <MessageModal />
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
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