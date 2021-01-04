import { createContext } from 'react';

const AuthContext = createContext(undefined);

const AppSettingsContext = createContext(undefined);

const LoadingContext = createContext(undefined);

export { AuthContext, AppSettingsContext, LoadingContext };
