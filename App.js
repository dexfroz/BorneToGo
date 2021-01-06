import React from 'react';
import { StyleSheet } from 'react-native';
import PageLogo from './Components/PageLogo'

export default function App() {
  return (
    <PageLogo />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
