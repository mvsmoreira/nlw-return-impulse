import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';

import Widget from './src/components/Widget'
import { theme } from './src/theme';
import { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';


export default function App() {
  // const [fontsLoaded, error] = useFonts({
  //   Inter_400Regular,
  //   Inter_500Medium,
  // });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
            Inter_400Regular,
            Inter_500Medium,
          })
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background,
    }}
    onLayout={onLayoutRootView}
    >
      <StatusBar style="light"
        backgroundColor='transparent'
        translucent />
      <Widget />
    </View>
  );
}