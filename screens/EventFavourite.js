import { useContext } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Alert, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FavouritesContext } from "../FavouritesContext"; 

const FavouriteEvents = ({ navigation }) => {
  const {
    favourites,
    removeFromFavourites,
    clearFavourites
  } = useContext(FavouritesContext); 

  //alert button to clear all
  const handleClearAll = () => {
    Alert.alert("Clear All Favourites", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear All",
        style: "destructive",
        onPress: () => clearFavourites(),
      },
    ]);
  };

  //render even list - only favourite
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("EventDetail", { event: item })} //navigate to event detail on press
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoBox}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>    {item.date} | {item.time}</Text>
        <Text style={styles.text}>📍 {item.location}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromFavourites(item.id)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {favourites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favourites yet.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={favourites}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <TouchableOpacity style={styles.clearAllButton} onPress={handleClearAll}>
            <Text style={styles.clearAllText}>Clear All Favourites</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },

  card: {
    backgroundColor: "#514444ff",
    flexDirection: "row",
    borderRadius: 12,
    marginHorizontal: 15,
    marginVertical: 10,
    overflow: "hidden",
  },

  image: {
    width: 100,
    height: 100,
  },

  infoBox: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f5f6fa",
  },

  text: {
    fontSize: 14,
    color: "#dcdde1",
  },

  removeButton: {
    marginTop: 8,
    backgroundColor: "#d63031",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
  },

  removeButtonText: {
    color: "white",
    fontWeight: "600",
  },

  clearAllButton: {
    backgroundColor: "#d63031",
    margin: 15,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  clearAllText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 18,
    color: "#dcdde1",
  },
});

export default FavouriteEvents;
