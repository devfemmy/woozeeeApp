import React, { useMemo, useState, useContext } from 'react';

import { Toggle, TopNavigationAction } from '@ui-kitten/components';

import { AppSettingsContext } from '~src/contexts';

export default function SwitchTheme(props) {
  const { appState, appOptions } = useContext(AppSettingsContext);

  const { darkMode } = appState;

  const { updateSettings } = appOptions;

  const [isError, setError] = useState(false);

  return useMemo(() => {
    const handleSwitchTheme = async () => {
      try {
        const settingsError = await updateSettings({
          darkMode: !darkMode,
        });

        if (settingsError) {
          await setError(true);
        }
      } catch (e) {
        await setError(true);
      }
    };

    const renderSwitch = () => (
      <Toggle checked={darkMode} onChange={handleSwitchTheme} />
    );

    return (
      <TopNavigationAction
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...props}
        icon={renderSwitch}
        accessibilityLiveRegion="polite"
        accessibilityLabel="Switch theme"
        accessibilityActions={['onPress']}
      />
    );
  }, [darkMode, updateSettings, props]);
}
