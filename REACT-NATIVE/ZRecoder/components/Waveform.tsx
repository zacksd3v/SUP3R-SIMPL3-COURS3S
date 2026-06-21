import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

interface WaveformProps {
  isRecording: boolean;
}

export default function Waveform({ isRecording }: WaveformProps) {
  const anim1 = useRef(new Animated.Value(15)).current;
  const anim2 = useRef(new Animated.Value(15)).current;
  const anim3 = useRef(new Animated.Value(15)).current;
  const anim4 = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    if (isRecording) {
      const createAnimation = (anim: Animated.Value, toValue: number, duration: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(anim, { toValue, duration, useNativeDriver: false }),
            Animated.timing(anim, { toValue: 15, duration, useNativeDriver: false }),
          ])
        );
      };

      const a1 = createAnimation(anim1, 60, 400);
      const a2 = createAnimation(anim2, 90, 500);
      const a3 = createAnimation(anim3, 50, 350);
      const a4 = createAnimation(anim4, 80, 450);

      Animated.parallel([a1, a2, a3, a4]).start();

      return () => {
        a1.stop(); a2.stop(); a3.stop(); a4.stop();
      };
    }
  }, [isRecording]);

  if (!isRecording) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, { height: anim1 }]} />
      <Animated.View style={[styles.bar, { height: anim2 }]} />
      <Animated.View style={[styles.bar, { height: anim3 }]} />
      <Animated.View style={[styles.bar, { height: anim4 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 100,
  },
  bar: {
    width: 6,
    backgroundColor: '#34C759',
    borderRadius: 3,
  },
});
