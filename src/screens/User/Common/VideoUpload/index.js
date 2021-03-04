import React, { useState, useContext, useCallback } from 'react';

import { View, ScrollView } from 'react-native';

import { Video } from 'expo-av';

// prettier-ignore
import {
  Button, Layout, Text, Divider, Toggle,
} from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField } from 'src/components/FormFields';

export default function VideoUpload({ route, navigation }) {
  const { editorResult } = route.params;

  const t = useContext(LocaleContext);

  const [uploadLocations, setUploadLocations] = useState({
    stories: false,
    feeds: false,
    wooz: false,
  });

  const [form, setFormValues] = useState({
    message: '',
  });

  const handleVideoRef = useCallback(
    (ref) => {
      const videoComp = ref;

      (async () => {
        try {
          await videoComp?.loadAsync({ uri: editorResult.video });
        } catch (e) {
          const msg = e;
        }
      })();
    },
    [editorResult.video],
  );

  const handleUploadLoc = (loc) => {
    setUploadLocations((prevState) => ({
      ...prevState,
      [loc]: !prevState[loc],
    }));
  };

  // prettier-ignore
  const VideoPreview = useCallback(
    () => (
      <View
        style={{
          flex: 1,
          paddingTop: 10,
          paddingHorizontal: 15,
          marginBottom: 20,
        }}
      >
        <Video
          ref={handleVideoRef}
          useNativeControls
          resizeMode="contain"
          style={{ height: 300, width: '100%' }}
        />
      </View>
    ),
    [handleVideoRef],
  );

  return (
    <>
      <Layout level="6" style={{ flex: 1 }}>
        <TopNavigationArea
          title="woozeee"
          navigation={navigation}
          icon="logout"
          screen="social"
        />
        <ScrollView
          style={{ flex: 1, paddingVertical: 10 }}
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ paddingBottom: 40 }}>
            <VideoPreview />
            <Divider style={{ marginVertical: 10 }} />
            <View
              style={{
                flex: 1,
                paddingHorizontal: 15,
              }}
            >
              <Text
                category="label"
                appearance="hint"
                style={{ marginBottom: 5, marginLeft: 10 }}
              >
                {t('addTo')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text category="s1" style={{ marginLeft: 10 }}>
                    {t('stories')}
                  </Text>
                </View>
                <Toggle
                  checked={uploadLocations.stories}
                  onChange={(e) => handleUploadLoc('stories')}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text category="s1" style={{ marginLeft: 10 }}>
                    {t('feeds')}
                  </Text>
                </View>
                <Toggle
                  checked={uploadLocations.feeds}
                  onChange={(e) => handleUploadLoc('feeds')}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text category="s1" style={{ marginLeft: 10 }}>
                    {t('wooz')}
                  </Text>
                </View>
                <Toggle
                  checked={uploadLocations.wooz}
                  onChange={(e) => handleUploadLoc('wooz')}
                />
              </View>
              <View style={{ flex: 1, marginHorizontal: 5 }}>
                <GeneralTextField
                  type="message"
                  label={t('message')}
                  placeholder={t('writeMsg')}
                  setFormValues={setFormValues}
                  multiline
                  maxHeight={50}
                />
              </View>
            </View>
            <Divider style={{ marginVertical: 10 }} />
            <View style={{ paddingHorizontal: 15 }}>
              <Button
                status="danger"
                disabled={Object.values(uploadLocations).every(
                  (item) => item === false,
                )}
              >
                <Text status="control" category="h6">
                  {t('upload')}
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </>
  );
}
