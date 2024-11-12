// HomeScreen.js
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LOG_AMBIENTE from '../assets/LOG_AMBIENTE.png';

export default function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de desvanecimiento del logo
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Navegar a la pantalla principal después de 5 segundos
    const timer = setTimeout(() => {
      navigation.replace('DrawerMenu'); // Cambiado de 'Main' a 'DrawerMenu'
    }, 5000);

    return () => clearTimeout(timer); // Limpia el temporizador si la pantalla cambia
  }, [fadeAnim, navigation]);

  return (
    <LinearGradient
      colors={['#E6CD40', '#447404', '#E6CD40']}
      style={styles.container}
    >
      <Animated.Image source={LOG_AMBIENTE} style={[styles.image, { opacity: fadeAnim }]} />
      <Text style={styles.text}>Municipalidad de Quinchao</Text>
      <Text style={styles.smallText}>Departamento de medioambiente</Text>

      {/* Barra de carga */}
      <View style={styles.progressBarContainer}>
        <Animated.View style={styles.progressBar} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: '600',
    color: 'white',
  },
  smallText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  progressBarContainer: {
    width: '60%',
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#28A745',
  },
});

