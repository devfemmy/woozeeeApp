import React, { useState, useContext, useMemo } from 'react';

import { View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

// prettier-ignore
import {
  Layout, Button, Text, Spinner, Toggle, Divider,
} from '@ui-kitten/components';

import { AppSettingsContext } from '~src/contexts';

import TopNavigationArea from '~src/components/TopNavigationArea';

import { IconMoon } from '~src/components/CustomIcons';

// eslint-disable-next-line react/prop-types
export default function Settings({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  const { appState, appOptions } = useContext(AppSettingsContext);

  const { darkMode } = appState;

  const { updateSettings } = appOptions;

  const [isError, setError] = useState(false);

  return useMemo(() => {
    const handleSwitchTheme = async () => {
      try {
        setLoading(true);
        const settingsError = await updateSettings({
          darkMode: !darkMode,
        });

        if (settingsError) {
          await setError(true);
        }
      } catch (e) {
        await setError(true);
      } finally {
        setLoading(false);
      }
    };

    const renderSpinner = () => <Spinner size="tiny" status="danger" />;

    // eslint-disable-next-line react/prop-types
    const routeBack = () => navigation.goBack();

    return (
      <Layout level="4" style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <TopNavigationArea
            title="Settings"
            navigation={navigation}
            screen="auth"
          />
          <ScrollView
            alwaysBounceVertical
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                flex: 1,
                padding: 15,
              }}
            >
              <View style={{ paddingBottom: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    appearance="ghost"
                    status="basic"
                    size="large"
                    accessibilityLiveRegion="polite"
                    accessibilityComponentType="Toggle"
                    accessibilityLabel="SwitchTheme"
                    accessoryLeft={IconMoon}
                    onPress={handleSwitchTheme}
                    style={{ justifyContent: 'flex-start' }}
                  >
                    <Text category="s1">Dark Mode</Text>
                  </Button>
                  <Toggle checked={darkMode} onChange={handleSwitchTheme} />
                </View>
                <Divider style={{ marginVertical: 5 }} />
                <View style={{ paddingVertical: 20 }}>
                  <Button
                    status="danger"
                    size="large"
                    accessibilityLiveRegion="assertive"
                    accessibilityComponentType="button"
                    accessibilityLabel="Continue"
                    accessoryLeft={isLoading ? renderSpinner : null}
                    onPress={routeBack}
                    disabled={isLoading}
                  >
                    <Text status="control">Close</Text>
                  </Button>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Layout>
    );
  }, [darkMode, isLoading, navigation, updateSettings]);
}
