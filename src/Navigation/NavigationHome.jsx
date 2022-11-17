import React, { useState ,useEffect} from 'react'
import {View,Text,StyleSheet,TextInput,TouchableOpacity,ScrollView} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';



function HomeScreen() {
    const [isLoading, setLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState("java");
    const [indetificacion,setIdentifiacaion] =useState()
    const [nombre,setNombre] =useState()
    const [apellido,setApellido] =useState()
    const [correo,setCorreo] =useState()

    const [indetificacionone,setIdentifiacaionone] =useState()
    const [zona,setZona] =useState()
    const [fecha,setFecha] =useState()
    const [valor,setValor] =useState()

  console.log(valor)

    const saveCliente = async () => {
        
        try {
          const response = await axios.post(`https://api-mongodb-production.up.railway.app/api/vendedor`, {
            idvend:indetificacion,
            nombre:nombre,
            apellido:apellido,
            correoe:correo
          });
          alert("Cliente agregado correctamente ...")
          setLoading(true)
        } catch (error) {
            alert("el numero de indentificacion no esta registrado")
            setLoading(false)
        }
        finally{
            
        }
      };

    const getClientePorId = async (id) => {
        
        setLoading(true);
        try {
            if(zona !="sur" && zona !="norte"){
                alert("tiene que ser sur o norte")
              
            const response = await axios.post(`https://api-mongodb-production.up.railway.app/api/venta`, {
            idvend:indetificacionone,
            zona:zona,
            fecha:fecha,
            valorventa:valor 
          })
          
            }
         
        } catch (error) {
          alert("el numero de indentificacion no esta registrado")
        }
        finally{
          setLoading(false);
        }
      };

    return (
        <ScrollView style={{marginTop:100}} >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <View>
       <Text>Registrar Usuario</Text>
        <TextInput
          placeholder='indentificacion'
          keyboardType="numeric"
          style={styles.inputs}
          value={indetificacion}
          onChangeText={setIdentifiacaion}
        />
        <TextInput
          placeholder='Nombre'
          style={styles.inputs}
          onChangeText={setNombre}
          value={nombre}
        />
        <TextInput
          placeholder='Apellido'
          style={styles.inputs}
          onChangeText={setApellido}
          value={apellido}
        />
        <TextInput
          placeholder='Correo'
          style={styles.inputs}
          onChangeText={setCorreo}
          value={correo}
        />

        <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'black'}]}
        onPress={saveCliente}>
        <Text style={{color:'yellow'}}>Registrar</Text>
      </TouchableOpacity>
      </View>



      <View style={{marginTop:10}} >
          <Text>Venta</Text>
        <TextInput
        keyboardType="numeric"
          placeholder='identificacion'
          style={styles.inputs}
          onChangeText={setIdentifiacaionone}
          value={indetificacionone}
        />
        
        <TextInput
          placeholder='zona'
          style={styles.inputs}
          onChangeText={setZona}
          value={zona}
        />

        <TextInput
          placeholder='fecha'
          style={styles.inputs}
          keyboardType=""
          onChangeText={setFecha}
          value={fecha}
        />

            <TextInput
            keyboardType="numeric"
          placeholder='valor venta'
          style={styles.inputs}
          value={valor}
          onChangeText={setValor}
        />

    <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'black'}]}
        onPress={getClientePorId}
         >
        <Text style={{color:'yellow'}}>Registrar producto </Text>
      </TouchableOpacity>
      </View>
      </View>
      </ScrollView>
    );
  }
  
  function SettingsScreen() {
    const [identificacion,setIdentificacion] =useState()
    const  [data,setData]=useState()
        console.log(data)
    const handBuscar =() =>{
            return fetch(`https://api-mongodb-production.up.railway.app/api/getventa/${identificacion}`)
            .then(index => index.json())
            .then(data => {
                if(!data.ok){
                    alert("no se encontro nada")
                }else{
                    setData(data)
                }
            })
            .catch(e =>{
                if(!e.ok){
                    alert("no se encontro ninguna informacion")
                }
            })
        }
          

    return (
    <ScrollView style={{marginTop:50}} >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <TextInput
            keyboardType="numeric"
          placeholder='identificacion'
          style={styles.inputs}
          onChangeText={setIdentificacion}
          value={identificacion}
        />
          <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'black'}]}
        onPress={handBuscar}
         >
        <Text style={{color:'yellow'}} >buscar </Text>
      </TouchableOpacity>
      
      {data?.result.map((index,e) =>(
            <View key={e} style={styles.inputs} >
                <Text>identificacion:  {index.idvend} </Text>
                <Text>fecha :{index.nombre} </Text>
                <Text>valor venta: {index.apellido} </Text>
                <Text>valor venta: {index.correoe} </Text>
            </View>
        ))}

        {data?.venta.map((index,e) =>(
            <View key={e} style={styles.inputs} >
                <Text>zona:  {index.zona} </Text>
                <Text>fecha :{index.fecha} </Text>
                <Text>valor venta: {index.valorventa} </Text>
            </View>
        ))}
      </View>
      </ScrollView>
    );
  }
  
  const Tab = createBottomTabNavigator();
  

const NavigationHome =() =>{



    
    return (
        <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Buscar" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    )
}
export default NavigationHome


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttons:{
      borderRadius:8,
      padding:10,
      justifyContent:'center',
      alignItems:'center',
      height:40,
      marginBottom:10
    },
    inputs:{
      borderWidth:2,
      borderColor:'black',
      marginTop:5,
      textAlign:'center',
      padding:5
    }
  });