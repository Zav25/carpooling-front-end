import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      initialRouteName="screens/SignIn"
      screenOptions={{
        headerShown: false, // This hides the header showing the route name
      }}
    />
  );
}
