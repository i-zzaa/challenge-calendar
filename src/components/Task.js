import React from 'react';
import { View, StyleSheet, Modal, Platform } from 'react-native';

const styles = StyleSheet.create({
  cardMain: {
    position: 'absolute',
    top: 100,
    width: 327,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

const Task = ({ isModalVisible, children }) => {
  return (
    <Modal animationType="fade" transparent visible={isModalVisible} onRequestClose={() => null}>
      <View
        style={[
          styles.container,
          {
            ...Platform.select({
              android: {},
            }),
          },
        ]}>
        <View style={styles.cardMain}>{children}</View>
      </View>
    </Modal>
  );
};

export default Task;
