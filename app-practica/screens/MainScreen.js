import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MainScreen({ navigation }) {
  // Estado para manejar si hay nuevas notificaciones
  const [hasNewNotifications, setHasNewNotifications] = useState(true);

  // Función para manejar el clic en el botón de notificaciones
  const handleNotificationPress = () => {
    setHasNewNotifications(false);
    navigation.navigate('Notifications'); // Navegar a la pantalla de notificaciones
  };

  return (
    <View style={styles.container}>
      {/* Botón de menú hamburguesa personalizado */}
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
        <Icon name="bars" size={24} color="#2E7D32" />
      </TouchableOpacity>

      <Text style={styles.text}>Menu principal</Text>
      
      {/* Botón de notificaciones con punto rojo si hay nuevas */}
      <TouchableOpacity style={styles.notificationButton} onPress={handleNotificationPress}>
        <Icon name="bell" size={24} color="#2E7D32" />
        {hasNewNotifications && <View style={styles.notificationDot} />}
      </TouchableOpacity>

      {/* Botones en la parte inferior */}
      <View style={styles.buttonContainer}>
        {/* Botón de cámara alineado a la izquierda */}
        <TouchableOpacity style={styles.cameraButton} onPress={() => Alert.alert('Cámara', 'Cámara, sonrie')}>
          <Icon name="camera" size={27} color="white" />
        </TouchableOpacity>

        {/* Botón de localización centrado */}
        <TouchableOpacity style={styles.locationButton} onPress={() => Alert.alert('Ubicación', 'Estamos trabajando para ello')}>
          <Icon name="map-marker" size={27} color="white" />
        </TouchableOpacity>

        {/* Botón de retiro de basura alineado a la derecha */}
        <TouchableOpacity style={styles.trashButton} onPress={() => Alert.alert('Retiro de Basura', 'Futuro retiro de basura')}>
          <Icon name="trash" size={27} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  notificationButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  notificationDot: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    position: 'absolute',
    top: -5,
    right: -5,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 50,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    left: 50,
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  locationButton: {
    backgroundColor: '#2E7D32',
    padding: 17,
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  trashButton: {
    position: 'absolute',
    right: 50,
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
