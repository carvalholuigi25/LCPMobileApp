// Loading.tsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle, StatusBar } from 'react-native';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  style?: ViewStyle;
}

const Loader: React.FC<LoaderProps> = ({ size = 'large', color = '#00FF38', style }) => {
  return (
    <View style={[styles.container, style]}>
      <StatusBar barStyle="light-content" backgroundColor="#00FF38" />
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
