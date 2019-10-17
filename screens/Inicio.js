import React, {Component} from 'react';
import { Container, Header, Content, Button, Text, Card , CardItem} from 'native-base';

import Colors from '../constants/Colors';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,

  
} from 'react-native';


class Inicio extends Component{
    
    render (){
        return(
            <Container>
          
            <SafeAreaView>
        
                
                
                <View style={styles.body}>
                <Image
                  style={{
                  alignSelf: 'center',
                  height: 200,
                  width: 200,
                  marginTop: 40,
                }}
                  source={require('../assets/images/icon.png')}
                  
                />
                
                <View style={styles.sectionContainer}>
                <Button backgroundColor="#F15641" full style={styles.button} onPress={() => this.props.navigation.push('CadastroStack')}>
                    <Text>Cadastre-se</Text>
                </Button>
                <Text>Já possui conta?</Text>
                <Button  success full bordered style={styles.button}
                onPress={() => this.props.navigation.push('LoginStack')}
                >
                    <Text>Login</Text>
                </Button>  
                </View>
                  
                </View>
              
                
                
            </SafeAreaView>
            </Container>
        );
       
    };
  };
  export default Inicio;

 
  const styles = StyleSheet.create({
  
    button:{
      textAlign: "center",
      fontWeight: "bold",
      fontSize:18,
      margin: 10,
      borderRadius:5,
    },
  
    body: {
      backgroundColor: Colors.white,
      marginTop: 20,
      paddingHorizontal: 20,
      marginVertical: 5,
    },

    sectionContainer: {
      marginTop:20,
      paddingHorizontal: 20,
      marginVertical: 5,
      alignItems : 'center',
    
    },
   
 
  });
  
