import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState, useLayoutEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { FirebaseDB } from '../config/FirebaseConfig';

const EventList = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => { // fetch events from firestore
    try {
      const querySnapshot = await getDocs(collection(FirebaseDB, 'Events_btp'));
      const eventList = querySnapshot.docs.map((doc) => 
        ({ id: doc.id,
         ...doc.data() }));
      // console.log("Fetched events:", eventList);
      setEvents(eventList); // Save the event list into state to be rendered
    } catch (error) {
      console.log('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Favourites"
          color="#FF5E57"
          onPress={() => navigation.navigate('EventFavourite')}
        />
      ),
    });
  }, [navigation]);

  const renderEvent = ({ item }) => ( //shpw event card on evenlist screen
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('EventDetail', { event: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoBox}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>    {item.date} | {item.time}</Text>
        <Text style={styles.text}>📍 {item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },

  card: {
    backgroundColor: '#514444ff',
    flexDirection: 'row',
    borderRadius: 12,
    marginHorizontal: 15,
    marginVertical: 10,
    overflow: 'hidden', //https://www.w3schools.com/css/css_overflow.asp
  },

  image: {
    width: 100,
    height: 100,
  },

  infoBox: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f5f6fa',
    marginBottom: 4,
  },

  text: {
    fontSize: 14,
    color: '#dcdde1',
  },
});

export default EventList;
