// prettier-ignore
import React, {
  useState, useContext, useCallback,
} from 'react';

import { View, ScrollView } from 'react-native';

// prettier-ignore
import {
  Layout, Button, Text, Spinner, Toggle, Divider, Select, SelectItem, IndexPath,
} from '@ui-kitten/components';

import { AppSettingsContext, LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { IconMoon, IconFlag } from 'src/components/CustomIcons';

import locales from './locales.json';

const LOCALES = locales;

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

  const changeAppSettings = useCallback(
    async (option) => {
      try {
        setLoading(true);
        const settingsError = await updateSettings({
          ...option,
        });

        if (settingsError) {
          setError(true);
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [updateSettings],
  );

  const handleSwitchTheme = useCallback(async () => {
    await changeAppSettings({ darkMode: !darkMode });
  }, [changeAppSettings, darkMode]);

  const handleSwitchLocale = useCallback(
    async (index) => {
      await changeAppSettings({ locale: LOCALES[index.row].code });
      setSelectedLocale(index);
    },
    [changeAppSettings],
  );

  const renderSpinner = () => <Spinner size="tiny" status="danger" />;

  const renderLocales = useCallback(
    () => <Text>{LOCALES[selectedLocale.row].title}</Text>,
    [selectedLocale.row],
  );

  const routeBack = () => navigation.goBack();

  return (
    <Layout level="6" style={{ flex: 1 }}>
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
    </Layout>
  );
}
