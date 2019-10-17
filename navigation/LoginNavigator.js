import { StackNavigator,createStackNavigator } from "react-navigation";

import Inicio from "../screens/Inicio";
import Login from "../screens/Login/Login";
import Cadastro from "../screens/Login/Cadastro";
import {Platform} from 'react-native';
const InicioStack = createStackNavigator(
    {
      Home: Inicio,
      
    },
    {
      ...Platform.select({
     
        android: {
          title: null,
          headerMode: 'none',
          header: null
        
        },
        ios:{
          //Para nao aparecer dois header
        headerMode:'none',
        }
      }),
      
    }
   
  );
  InicioStack.navigationOptions = {
    ...Platform.select({
     
      android: {
       
        header: null
      
      },
      ios:{
        //Para nao aparecer dois header
      headerMode:'none',
      }
    }),
    
    
    
    headerBackTitle: 'Voltar',
    headerStyle: {
        borderBottomWidth: 0,
       
    }
    
    
  };
  const LoginStack = createStackNavigator(
    {
     Login: Login,
    },{
        headerMode:'none',
        
        
    }
    

  );
  LoginStack.navigationOptions = {
    title: 'Login',
    ...Platform.select({
     
      android: {
        headerTintColor: '#fff',
    
    headerStyle: {
      backgroundColor: '#F05641',
      
     
    },
      },
    }),
    
   
  };
  const CadastroStack = createStackNavigator(
    {
        Cadastro:Cadastro,
    },{
        headerMode:'none',
        
    }
  );
  CadastroStack.navigationOptions = {
      title:"Cadastro",
      ...Platform.select({
     
        android: {
          headerTintColor: '#fff',
      
      headerStyle: {
        backgroundColor: '#F05641',
       
       
      },
        },
      }),
  };
  const loginNavigator = createStackNavigator({
    InicioStack,
    LoginStack,
    CadastroStack,
    
  });
export default loginNavigator;