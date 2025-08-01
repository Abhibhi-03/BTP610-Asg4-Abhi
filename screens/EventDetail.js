import { Text, View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useState, useEffect } from 'react';
import { FavouritesContext } from '../FavouritesContext';

const EventDetail = ({ route }) => {
  const { event } = route.params;

  const {
    favourites,
    addToFavourites,
    removeFromFavourites,
  } = useContext(FavouritesContext);

  //Local state, track my favourites
  const [isFavourite, setIsFavourite] = useState(false);

  //Sync gloabl favourites with local state
  useEffect(() => {
    const isInFavourites = favourites.some((fav) => fav.id === event.id);
    setIsFavourite(isInFavourites);
  }, [favourites]);

  
  const toggleFavourite = () => {
    if (isFavourite) {
      removeFromFavourites(event.id);
    } else {
      addToFavourites(event);
    }

    Alert.alert(
      !isFavourite ? 'Added to Favourites' : 'Removed from Favourites',
      `"${event.title}" ${!isFavourite ? 'added to' : 'removed from'} favourites.`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Image source={{ uri: event.image }} style={styles.image} />
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.text}>Waiting for you to be there on {event.date} at {event.time}</Text>
        <Text style={styles.text}>📍 {event.location}</Text>
        <Text style={styles.description}>{event.description}</Text>

        <TouchableOpacity
          onPress={toggleFavourite}
          style={[
            styles.button,
            { backgroundColor: isFavourite ? '#e74c3c' : '#27ae60' },
          ]}
        >
          <Text style={styles.buttonText}>
            {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },

  viewContainer: {
    padding: 20,
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e99f21ff',
    textAlign: 'center',
  },

  text: {
    fontSize: 16,
    color: '#f5feffff',
    marginTop: 15,
    textAlign: 'center',
  },

  description: {
    fontSize: 18,
    color: '#f5feffff',
    marginTop: 20,
  },

  button: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default EventDetail;
 