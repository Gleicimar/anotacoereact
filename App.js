import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text,TextInput, View,AsyncStorage,TouchableOpacity} from 'react-native';
import React,{useState,useEffect} from 'react'




const styles = StyleSheet.create({
  header:{
    width:'100%',
    backgroundColor:'#069',
    padding:10,
    marginTop:25
  },
  anotacao:{
    fontSize:22,
    marginTop:25

  },
  btnAnotacao:{
    position:'absolute',
    width:50,
    color:'white',
    backgroundColor:'#069',
    height:50,
    borderRadius:25,
    border:2,
    right:25,
    bottom:20,
  },
  btnTexto:{
    textAlign:'center',
    left:2,
    top:2,
    fontSize:30,
    color:'white',
    
  },
  btnSalvar:{
    position:'absolute',
    width:70,
    backgroundColor:'#069',
    height:40,
    padding:10,
    right:20,
    bottom:20,
  }
});
export default function App() {
  const [estado,setarEstado]= useState('leitura');
 const [anotacao,setarAnotacao]= useState('');
 useEffect(()=>{
  //quando iniciar ler a anotação
  (async()=>{
    const anotacaoLeitura =await AsyncStorage.getItem('anotacao');
    setarAnotacao(anotacaoLeitura);
  })();
} ,[]);
setData =async()=>{
  try{
    await AsyncStorage.setItem('anotacao',anotacao)
  }catch(error){

  }
  alert('Sua anotação foi salva');

}
 function atualizarTexto(){
setData()
  setarEstado('leitura') }
if(estado=='leitura'){
  return (
    <View style={{flex:1}}>
      <StatusBar style='hidden'/>
      <View style={styles.header}>
        <Text style={{textAlign:'center',color:'white', fontSize:22}}>Aplicativo Anotação</Text>
        </View>
          {
            (anotacao != '')?
        <View>
          <Text style={{padding:20,color:'#333',}}>{anotacao}</Text>
       </View>
       :
       <View>
       <Text style={{padding:20,color:'#333',opacity:0.3}}>Nenhuma anotação encontrada!</Text>
    </View>
          }
        <TouchableOpacity style={styles.btnAnotacao}onPress={()=>setarEstado('atualizando')} >
          {
            (anotacao == "")?
            <Text style={styles.btnTexto}>+</Text>
            :
            <Text style={{fontSize:12,color:'white',marginTop:15,textAlign:'center'}}>Editar</Text>

          }
        </TouchableOpacity>
      </View>
    
  )
}else if(estado == 'atualizando'){
  return (
    <View style={{flex:1}}>
      <StatusBar style='hidden'/>
      <View style={styles.header}>
        <Text style={{textAlign:'center',color:'white', fontSize:22}}>Aplicativo Anotação</Text>
        </View>
        <View>
          <TextInput autoFocus={true}  onChangeText={(text)=>setarAnotacao(text)} multiline={true} numberOfLines={5} value={anotacao}></TextInput>

        </View>
        <TouchableOpacity style={styles.btnSalvar}onPress={()=>atualizarTexto()} >
         <Text style={{textAlign:'center',color:'white',}}>Salvar</Text>
        </TouchableOpacity>
      </View>
    
  )
  
}

}


