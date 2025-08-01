import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventList from './screens/EventList';
import EventDetail from './screens/EventDetail';
import { FavouritesProvider } from './FavouritesContext';
import FavouriteEvents from './screens/EventFavourite';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <FavouritesProvider>
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#121212'},
            headerTintColor: '#fff',            
          }}
        >
          {/* screen1 */}
          <Stack.Screen name="EventList" component={EventList} options={{ title: 'Upcoming Events' }} /> 
          {/* screen2 */}
          <Stack.Screen name="EventDetail" component={EventDetail} options={{ title: 'Event Details' }} />
          {/* screen3 */}
          <Stack.Screen name="EventFavourite" component={FavouriteEvents} options={{ title: 'Favourite Events' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    </FavouritesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});

