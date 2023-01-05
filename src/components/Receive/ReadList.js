import React from 'react'
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext/ThemeContext';

const headers = [
  {id: 1, titulo: 'Producto', name: 'producto'},
  {id: 2, titulo: 'Serial', name: 'serial'},
];

const ReadList = (props) => {
  const {
    read,
    count,
    onReceive
  } = props;
  const {theme: {palette}}= React.useContext(ThemeContext);
  const {width} = useWindowDimensions();
  
  return (
    <View style={styles.width}>
      <View style={styles.container}>
        <Text style={{color: palette.text.primary, fontSize: 16}}>Items Leidos: {read.length}</Text>
        {read.length > 0 && read.length === count && 
          <TouchableOpacity
            style={{...styles.button, backgroundColor: palette.primary.main}}
            onPress={onReceive}
          >
            <Text style={styles.textStyle}>RECIBIR</Text>
          </TouchableOpacity>
        }
      </View>
      {read.length > 0 && (
        <View style={styles.headersContainer}>
          {headers.map((header) => (
            <View key={header.id} style={{width: (width*0.9)/2}}>
              <Text 
                numberOfLines={1} 
                adjustsFontSizeToFit={true} 
                style={{
                  textAlign: 'left', 
                  color: palette.text.primary,
                  fontWeight: 'bold'
                }}
              >
                {header.titulo}
              </Text>
            </View>
          ))}
        </View>
      )}
      <View>
        {read.map((item) => (
          <View key={item.id} style={styles.row}>
            {headers.map((subItem) => (
              <View key={subItem.id} style={{width: (width*0.9)/2}}>
                <Text style={{color: palette.text.primary}}>{item[subItem.name]}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  width: {
    width: '95%',
    justifyContent: 'center',
    paddingHorizontal: 5
  },
  headersContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center'
  },
  rowsContainer: {
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  row : {
    flexDirection: 'row',
    borderBottomWidth: 0.4,
    borderTopWidth: 0.4,
    paddingVertical: 10,
    alignItems: 'center'
  },
  textContainer: {
    paddingHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'space-around'
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
})

export default ReadList;