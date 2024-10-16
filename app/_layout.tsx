import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Profiles" />
      <Stack.Screen name="UpdateProfile" />
      <Stack.Screen name="SignIn" />
      <Stack.Screen name="SignUp" />
      <Stack.Screen name="RequestRide" />
    </Stack>
  );
}
