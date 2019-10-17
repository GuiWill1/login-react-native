import React, {Component} from 'react';
import { Container, Body, Content, Button, Text ,Form,Input,Item,Label} from 'native-base';
import Colors from '../../constants/Colors';
import {TextInputMask} from 'react-native-masked-text'
import {Card} from 'react-native-elements';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
  
} from 'react-native';
//const {navigation} = this.props;

import firebase from 'firebase';
import '@firebase/firestore';

const db = firebase.firestore()


class Cadastro extends Component{
    constructor(props) {
        super(props);
     
      
        
        this.state = {
            nome:"",
            sobrenome:"",
            telefone1: "",
            telefone2: "",
            senha:"",

            isEditing:false,

        }
      }
      componentDidMount(){
        this.getDados()
      }
getDados(){
 
  const { navigation } = this.props;
  var nome = navigation.getParam('nome')
  var sobrenome = navigation.getParam('sobrenome') 
  var telefone1 = navigation.getParam('telefone1') 
  var telefone2 = navigation.getParam('telefone2') 
  console.log(nome,sobrenome,telefone1,telefone2)

  if(nome){
    this.setState({
      isEditing:true,
      nome: this.state.nome = nome,
      sobrenome: this.state.sobrenome = sobrenome,
      telefone1: this.state.telefone1 = telefone1,
      telefone2: this.state.telefone2 = telefone2,

      loading:false
    })
  }else{
    
  }
 


}
cadastrar = (nome,sobrenome,telefone1,telefone2,email,senha) => {
  var user = firebase.auth().currentUser
  const {navigation} = this.props;

        const unmasked1 = this.phoneField1.getRawValue()
        const unmasked2 = this.phoneField2.getRawValue()
        if(nome === ""){
          Alert.alert("Oops!","O campo Nome não pode estar vazio")
        }else if(sobrenome === ""){
          Alert.alert("Oops!","O campo Sobrenome não pode estar vazio")
        }else if(unmasked1 ===""){
          Alert.alert("Oops!", "Você deve cadastrar pelo menos um telefone!\n- De preferência o WhatsApp!")
        }else{
        if(this.state.isEditing){
          var tel2 = ""
            if(unmasked2 === ""){
              tel2 = "N"
            }else{
              tel2 = unmasked2
            }
          db.collection("Cliente").doc(user.uid).update({
            nome: nome,
            sobrenome: sobrenome,
            telefone1: unmasked1,
            telefone2: tel2,

            })
            .then(function() {
              alert("Cadastro efetuado com sucesso!")
              navigation.goBack()
            })
            .catch(function(error) {
              cred.user.delete()
              Alert.alert("Oops","ocorreu um erro ao salvar, cadastre-se novamente"+ error);
            });
        }else{
          firebase.auth().createUserWithEmailAndPassword(email,senha)
          .then(cred => {
            this.setState({loading:this.state.loading = true})
            var tel2 = ""
            if(unmasked2 === ""){
              tel2 = "N"
            }else{
              tel2 = unmasked2
            }
            
              db.collection("Cliente").doc(cred.user.uid).set({
              nome: nome,
              sobrenome: sobrenome,
              email: email,
              telefone1: unmasked1,
              telefone2: tel2,
  
              })
              .then(function() {
                alert("Cadastro efetuado com sucesso!")
              })
              .catch(function(error) {
                cred.user.delete()
                Alert.alert("Oops","ocorreu um erro ao salvar, cadastre-se novamente"+ error);
                
              });
     
            
          })
          .catch(function (error){
            var errorCode = error.code;
                  var errorMessage = error.message;
                  console.log(errorCode,errorMessage)
                  switch(errorCode){
                      
                      case 'auth/invalid-email':
                          Alert.alert("Oops","Email inválido");
                        
                          break
                      case 'auth/email-already-in-use':
                          Alert.alert("Oops","Esse e-mail já esta em uso em outra conta");
                          break
                      case 'auth/weak-password':
                          Alert.alert("Oops","A senha precisa ter no mínimo 6 dígitos ");
                          break 
                      default:
                        Alert.alert("Oops","Occorreu um erro")   
                  }
                
              })
          }
        }
        
   
            
      }

    render(){
    return (
        <Container>
 
            <SafeAreaView>
            <ScrollView style={styles.scrollView}>
          
           
                
                <Content>
                
                <Text style={styles.sectionTitle}>Dados Pessoais</Text>
                <Card>
                <Text>Nome</Text>
                <Item regular style={styles.input} >
                    <Input value={this.state.nome} onChangeText={(nome) => this.setState({nome})} placeholderTextColor="#CCCC"  placeholder="Digite seu nome aqui" keyboardType='ascii-capable'/>
                </Item>
                <Text>Sobrenome</Text>
                <Item regular style={styles.input}>
                    <Input value={this.state.sobrenome} onChangeText={(sobrenome) => this.setState({sobrenome})} placeholderTextColor="#CCCC" placeholder="Digite seu sobrenome aqui" keyboardType="ascii-capable"/>
                </Item>
                <View style={styles.row}>
        <View style={styles.inputWrap}>
        <Text>Celular</Text>
                            <View style={styles.tel}>
                            <TextInputMask  placeholder="Digite seu telefone"
                                type={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true,
                                    dddMask: '(99) '
                                }}
                                value={this.state.telefone1}
                                onChangeText={text => {
                                    this.setState({
                                    telefone1:text
                                    })
                                }}
                                ref={(ref)=>this.phoneField1 = ref}
                            />
                            
                            </View> 
                            <Text style={{fontSize:12,color:"#273",marginTop:-5,marginLeft:10}}>De preferência WhatsApp!</Text>
        </View>

        <View style={styles.inputWrap}>
        <Text>Telefone(Opcional)</Text>
                            <View style={styles.tel}>
                            <TextInputMask placeholder="Digite seu telefone"
                                type={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true,
                                    dddMask: '(99) '
                                }}
                                value={this.state.telefone2}
                                onChangeText={text => {
                                    this.setState({
                                        telefone2: text
                                    })
                                }}
                               ref={(ref)=>this.phoneField2 = ref}
                            />
                            </View> 
        </View>
      </View>
                    
 
                           
                </Card>
                   
             
         
                {!this.state.isEditing &&
                  <Text style={styles.sectionTitle}>Dados de acesso</Text>
                }
                {!this.state.isEditing &&
                    <Card >
                    <Text>E-mail</Text>
                    <Item regular style={styles.input}>
                        <Input onChangeText={(email) => this.setState({email})} placeholderTextColor="#CCCC"  placeholder="Digite seu email aqui"  keyboardType="email-address" autoCapitalize="none"/>
                    </Item>
                                    <Text>Senha</Text>
                                    <Item regular style={styles.input}>
                                    
                                        <Input onChangeText={(senha) => this.setState({senha})} placeholderTextColor="#CCCC"  placeholder="Digite sua senha aqui"  secureTextEntry />
                                    </Item>
                
    
                    </Card>
                }
                  
                {
          this.state.loading &&

          <ActivityIndicator
            size="large"
            color="#3498db"
            
          />

        }
                <Button backgroundColor="#F15641" full style={styles.button} 
                onPress={()=> this.cadastrar(
                    this.state.nome,
                    this.state.sobrenome,
                    this.state.telefone1,
                    this.state.telefone2,
                  
                    this.state.email,
                    this.state.senha)
                    }>
                    <Text>Cadastrar</Text>
                </Button>
                
        </Content>
             
              
                
            </ScrollView>
            
            </SafeAreaView>
       </Container>

    );
  }
}
export default Cadastro;



  const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
      
    },
   
    
    button:{
      textAlign: "center",
      fontWeight: "bold",
      fontSize:18,
      margin: 20,
      borderRadius:5,
    },
  
    
    input:{
        marginTop:10,
        marginBottom:10,
        borderWidth:1,
        borderRadius:6,
        marginRight:8,
        marginLeft:8,
        height:35,
        borderColor: "#BBB"
    },
    card_1:{
        marginTop:10,
        marginRight:20,
        marginLeft:20,
        height:380,
        borderRadius:5,
        borderWidth:1,
        borderColor: "#BBB"
    },
    card_2:{
        marginTop:10,
        marginRight:20,
        marginLeft:20,
        height:380,
        borderRadius:5,
        justifyContent : 'center',
        alignItems: 'center',
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: Colors.white,
      marginLeft: 20,
      marginTop:10,
    },
    tel:{
        borderWidth:1,
        width:'90%',
        height:35,
        borderRadius:5,
        justifyContent: 'center',
        borderColor: '#BBB',
        marginLeft:10,
        margin:8,
    },
    row: {
        flex: 1,
        flexDirection: "row",
       
      },
      inputWrap: {
        flex: 1,
     
        marginBottom: 10
      },
   
  });
