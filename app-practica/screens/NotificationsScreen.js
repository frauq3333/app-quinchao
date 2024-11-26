import React, { useState, useMemo, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Chip } from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';
import { NotificationContext } from '../contexts/NotificationContext';

const NotificacionScreen = ({ navigation }) => {
  const { setHasNewNotifications } = useContext(NotificationContext);

  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Nueva campaña ecológica', type: 'campaña', read: false },
    { id: '2', title: 'Retiro de residuos completado', type: 'retiro', read: false },
    { id: '3', title: 'Aviso a la comunidad: reunión', type: 'comunidad', read: false },
    { id: '4', title: 'Nueva campaña de reciclaje', type: 'campaña', read: false },
    { id: '5', title: 'Actualización del programa de residuos', type: 'retiro', read: false },
  ]);

  const [activeFilters, setActiveFilters] = useState({
    campaña: false,
    retiro: false,
    comunidad: false,
  });

  const filteredNotifications = useMemo(() => {
    const activeTypes = Object.keys(activeFilters).filter((type) => activeFilters[type]);
    if (activeTypes.length === 0) return notifications;
    return notifications.filter((notification) => activeTypes.includes(notification.type));
  }, [activeFilters, notifications]);

  const toggleFilter = (type) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [type]: !prevFilters[type],
    }));
  };

  const deleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const renderRightActions = (id) => (
    <View style={styles.deleteContainer}>
      <Text style={styles.deleteText} onPress={() => deleteNotification(id)}>
        Eliminar
      </Text>
    </View>
  );

  const renderNotification = ({ item }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.id)}
    >
      <View style={[styles.notificationItem, styles[item.type]]}>
        <Text
          style={[
            styles.notificationTitle,
            item.read && styles.readNotification,
          ]}
          onPress={() => {
            // Marcar como leída
            setNotifications((prevNotifications) =>
              prevNotifications.map((notification) =>
                notification.id === item.id
                  ? { ...notification, read: true }
                  : notification
              )
            );
            navigation.navigate('DetalleNotificacion', { notification: item });
          }}
        >
          {item.title}
        </Text>
        <Text style={styles.notificationType}>{item.type.toUpperCase()}</Text>
      </View>
    </Swipeable>
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setHasNewNotifications(false);
    });

    return unsubscribe;
  }, [navigation, setHasNewNotifications]);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Chip
          mode="outlined"
          selected={activeFilters['campaña']}
          onPress={() => toggleFilter('campaña')}
          style={[
            styles.chip,
            activeFilters['campaña']
              ? styles.chipSelected
              : styles.chipUnselected,
          ]}
        >
          Campañas
        </Chip>
        <Chip
          mode="outlined"
          selected={activeFilters['retiro']}
          onPress={() => toggleFilter('retiro')}
          style={[
            styles.chip,
            activeFilters['retiro']
              ? styles.chipSelected
              : styles.chipUnselected,
          ]}
        >
          Retiros
        </Chip>
        <Chip
          mode="outlined"
          selected={activeFilters['comunidad']}
          onPress={() => toggleFilter('comunidad')}
          style={[
            styles.chip,
            activeFilters['comunidad']
              ? styles.chipSelected
              : styles.chipUnselected,
          ]}
        >
          Comunidad
        </Chip>
      </View>

      <FlatList
        data={filteredNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No hay notificaciones disponibles.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5DC', // Fondo beige claro
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  chip: {
    margin: 4,
    borderWidth: 1,
  },
  chipSelected: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  chipUnselected: {
    backgroundColor: '#EEE',
    borderColor: '#CCC',
  },
  notificationItem: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#FFF',
    flexDirection: 'column',
  },
  campaña: {
    borderLeftWidth: 5,
    borderLeftColor: '#1976D2',
  },
  retiro: {
    borderLeftWidth: 5,
    borderLeftColor: '#388E3C',
  },
  comunidad: {
    borderLeftWidth: 5,
    borderLeftColor: '#F57C00',
  },
  notificationTitle: {
    fontSize: 16,
    color: '#333',
  },
  readNotification: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  notificationType: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
    textTransform: 'capitalize',
  },
  deleteContainer: {
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 15,
    borderRadius: 8,
  },
  deleteText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#999',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default NotificacionScreen;
