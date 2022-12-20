import React from 'react';
import { Formik } from 'formik';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import * as yup from 'yup';
import { ThemeContext } from '../../contexts/themeContext/ThemeContext';
import { RemisionContext } from '../../contexts/remisionContext/RemisionContext';

const validationSchema = yup.object({
  serial_inicial: yup
    .string()
    .required('Requerido'),
  serial_final: yup
    .string()
    .nullable(),
});

const ReceiveForm = (props) => {
  const {
    producto,
    remision
  } = props;
  const {theme: {palette}} = React.useContext(ThemeContext);
  const {onRead} = React.useContext(RemisionContext);
  
  return (
    <Formik
      validationSchema={validationSchema}
      validateOnBlur={false}
      initialValues={{
        serial_inicial: '',
        serial_final: '',
      }}
      onSubmit={(data, actions) => {
        data.numero_remision = remision;
        data.producto_id = producto.id;
        data.tipo = producto.tipo;
        onRead({data})
        actions.resetForm();
      }}
    >
      {({handleChange, values, handleSubmit, errors}) => (
        <View style={styles.headerContainer}>
          <View style={styles.filterContainer}>
            <View style={styles.filterRow}>
              <View style={styles.labelAndInput}>
                <Text style={{color: palette.text.primary}}>Serie Inicial</Text>
                <View style={{width: '100%'}}>
                  <TextInput
                    value={values.serial_inicial}
                    editable
                    onChangeText={handleChange('serial_inicial')}
                    onSubmitEditing={handleSubmit}
                    style={{color: palette.text.hint, height: 35, padding: 2, ...styles.border}}
                  />
                  {errors.serial_inicial&&<Text style={{color: palette.secondary.main, fontSize: 9}}>{errors.serial_inicial}</Text>}
                </View>
              </View>
              <View style={styles.labelAndInput}>
                <Text style={{color: palette.text.primary}}>Serie Final</Text>
                <View style={{width: '100%'}}>
                  <TextInput
                    value={values.serial_final}
                    editable
                    onChangeText={handleChange('serial_final')}
                    onSubmitEditing={handleSubmit}
                    style={{color: palette.text.hint, height: 35, padding: 2, ...styles.border}}
                  />
                  {errors.serial_final&&<Text style={{color: palette.secondary.main, fontSize: 9}}>{errors.serial_final}</Text>}
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  filterContainer: {
    width: '80%',
    paddingHorizontal: 10
  },
  filterRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  labelAndInput: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '50%',
    marginHorizontal: 6
  },
  border: {
    borderBottomWidth: 0.5,
    width: '100%',
    maxWidth: '100%'
  }
});

export default ReceiveForm;