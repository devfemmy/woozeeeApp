import { useMemo, useContext } from 'react';

import { AppSettingsContext } from '~src/contexts';

export default function PlaceholderImage() {
  const { appState } = useContext(AppSettingsContext);

  const { darkMode } = appState;

  // prettier-ignore
  const PLACEHOLDER = useMemo(() => (darkMode
    ? require('~assets/images/banner/placeholder-dark.jpg')
    : require('~assets/images/banner/placeholder-light.jpeg')), [darkMode]);

  return PLACEHOLDER;
}
