// prettier-ignore
import React, {
  useState, useContext, useMemo, useCallback,
} from 'react';

import { View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

// prettier-ignore
import {
  Layout, Button, Text, Spinner, Toggle, Divider, Select, SelectItem, IndexPath,
} from '@ui-kitten/components';

import { AppSettingsContext, LocaleContext } from '~src/contexts';

import TopNavigationArea from '~src/components/TopNavigationArea';

import { IconMoon, IconFlag } from '~src/components/CustomIcons';

import locales from './locales.json';

const LOCALES = locales;

// eslint-disable-next-line react/prop-types
export default function Settings({ navigation }) {
  const { appState, appOptions } = useContext(AppSettingsContext);

  const t = useContext(LocaleContext);

  const { darkMode, locale } = appState;

  const { updateSettings } = appOptions;

  // prettier-ignore
  const getIndexOfLocale = () => LOCALES.findIndex((obj) => obj.code === locale);

  const [isLoading, setLoading] = useState(false);

  const [isError, setError] = useState(false);

  const [selectedLocale, setSelectedLocale] = useState(
    new IndexPath(getIndexOfLocale()),
  );

  const handleSwitchTheme = useCallback(async () => {
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
  }, [darkMode, updateSettings]);

  const handleSwitchLocale = useCallback(
    async (index) => {
      try {
        setLoading(true);
        const settingsError = await updateSettings({
          locale: LOCALES[index.row].code,
        });

        if (settingsError) {
          await setError(true);
        }
      } catch (e) {
        await setError(true);
      } finally {
        setLoading(false);
        setSelectedLocale(index);
      }
    },
    [updateSettings],
  );

  const renderSpinner = () => <Spinner size="tiny" status="danger" />;

  // eslint-disable-next-line react/prop-types
  const routeBack = useCallback(() => navigation.goBack(), [navigation]);

  const renderLocales = useCallback(
    () => <Text>{LOCALES[selectedLocale.row].title}</Text>,
    [selectedLocale.row],
  );

  return useMemo(
    () => (
      <Layout level="4" style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <TopNavigationArea
            title={t('settings')}
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
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <IconMoon fill="#8F9BB3" height={24} width={24} />
                    <Text category="s1" style={{ marginLeft: 10 }}>
                      {t('darkMode')}
                    </Text>
                  </View>
                  <Toggle checked={darkMode} onChange={handleSwitchTheme} />
                </View>
              </View>
              <Divider style={{ marginVertical: 10 }} />
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <IconFlag fill="#8F9BB3" height={24} width={24} />
                    <Text category="s1" style={{ marginLeft: 10 }}>
                      {t('language')}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Select
                      value={renderLocales}
                      selectedIndex={selectedLocale}
                      onSelect={handleSwitchLocale}
                    >
                      {/* eslint-disable-next-line react/prop-types */}
                      {LOCALES.map((option) => (
                        <SelectItem key={option.title} title={option.title} />
                      ))}
                    </Select>
                  </View>
                </View>
              </View>
              <Divider style={{ marginVertical: 10 }} />
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
                  <Text status="control">{t('close')}</Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Layout>
    ),
    [
      t,
      selectedLocale,
      darkMode,
      isLoading,
      navigation,
      handleSwitchTheme,
      handleSwitchLocale,
      renderLocales,
      routeBack,
    ],
  );
}
