import React, {Component} from 'react';
import { Container, Card,CardItem,Body, Content, Button, Text ,Input,Item, View,} from 'native-base';
import Colors from '../../constants/Colors';

import {
 
  StyleSheet,
  ActivityIndicator,
  
StatusBar,
  Alert,
  
} from 'react-native';
import firebase from 'firebase'
import Constants from 'expo-constants';

class Login extends Component{

    

    constructor(props){
        super(props)
        
        this.state = ({
            email: '',
            senha: '',
            isLoading:false
        })
    }
  
    
    loginUser = (email,senha) => {
       
        
        firebase.auth().onAuthStateChanged(function(user){
            //alert("login:"+user.email)
        })
        try{
            
            firebase.auth().signInWithEmailAndPassword(email,senha)
            .then(function(user){
                //alert(user.user.uid)
                
            })
           
            .catch(function(error){
             
                var errorCode = error.code;
                var errorMessage = error.message;
                
                switch(errorCode){
                    
                    case 'auth/invalid-email':
                        
                        Alert.alert("Oops","Email inválido");
                        
                        break
                    case 'auth/wrong-password':
                        Alert.alert("Oops","A Senha está incorreta");
                        break
                    case 'auth/user-not-found':
                        Alert.alert("Oops","Usuário não encontrado! ");
                        break 
                    case 'auth/user-disabled':
                        Alert.alert("Oops","Seu acesso foi desabilitado! ");
                        break
                    case '':
                        break           
                }
              
            })
                 
        }catch(error){
            alert('Erro',error.toString())
        }
        
    }
    recuperarConta = (email) =>{
       
        try{
            firebase.auth().sendPasswordResetEmail(email)
            .then(function () {
                Alert.alert("Email enviado",'As instruções de recuperação foram enviadas para '+email)
            }).catch(function (e) {
                var errorCode = e.code;
                var errorMessage = e.message;
                switch(errorCode){
                    case 'auth/invalid-email':
                        Alert.alert("Oops","Email inválido");
                        break
                    
                    case 'auth/user-not-found':
                        Alert.alert("Oops","Usuário não encontrado! ");
                        break 
                     
                }
                
            })
        }catch(error){
            alert('Erro'+error.toString())
        }
    }
    dismsissLoading = () =>{
        this.setState({ isLoading: false })
    }
    showLoading(){
        this.setState({ isLoading: true})
    }
    renderActivityIndicador(){
        return(
            <ActivityIndicator
            style={{ height: 80 }}
            color="#222"
            size="large"
          />
        )
    }
    render(){
        const {isLoading} = this.state;
    return (
    
        <Container>
     
        <Content>
        
            <Card style={{marginLeft:20,marginRight:20,marginTop:20,borderRadius:5}}>
                <CardItem header>                        
                    <Text>Dados de acesso</Text>
                </CardItem>

                <CardItem>                        
              
                
                        <Body>
                        <Text>E-mail</Text>
                                <Item regular  style={styles.input}>
                                   
                                    <Input autoCapitalize="none" keyboardType="email-address" placeholderTextColor="#CCCC"  placeholder="Digite seu email aqui" onChangeText={(email) => this.setState({email
                                    })}/>
                                </Item>
                                <Text>Senha</Text>
                                <Item regular style={styles.input}>
                                    
                                    <Input autoCapitalize="none" placeholderTextColor="#CCCC"  placeholder="Digite sua senha aqui" secureTextEntry onChangeText={(senha) => this.setState({senha})}/>
                                </Item>
                           
                            
                                
                                 
                        </Body>
               
                
                </CardItem>

                <CardItem header>                        
                
                </CardItem>
           </Card>
           <Button backgroundColor="#F15641" full style={styles.button} onPress={()=> this.loginUser(this.state.email,this.state.senha)}>
                    <Text>Entrar</Text>
            </Button>
        
            <Button  transparent  full onPress={() => Alert.prompt('Digite seu e-mail', null, (text) =>
                    this.recuperarConta(text),
                )}>
                    <Text>Esqueci minha senha</Text>
                </Button>
                {isLoading && (
                    this.renderActivityIndicador()
                )}
        </Content>
    </Container>
      
           
        

    );
  }
}
export default Login;



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
    statusBar: {
        backgroundColor: "#2411ff",
        height: Constants.statusBarHeight,
      },
    sectionContainer: {
     
    },
    input:{
        marginTop:10,
        marginBottom:10,
        height:35,
        borderRadius:6,
    },
    card:{
        marginTop:10,
        marginRight:20,
        marginLeft:20,
        height:180,
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
   
  });
