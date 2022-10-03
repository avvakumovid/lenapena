import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  Easing,
  Dimensions,
} from "react-native";

export default class Viewport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDraggable: true,
      showDraggable2: true,
      dropZoneValues: null,
      pan: new Animated.ValueXY(),
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: this.state.pan.x,
            dy: this.state.pan.y,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropZone(gesture)) {
          this.setState({
            showDraggable: false,
          });
        } else {
          Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
        }
      },
    });
  }

  isDropZone(gesture) {
    var dz = this.state.dropZoneValues;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }

  setDropZoneValues(event) {
    console.log(event);
    this.setState({
      dropZoneValues: event.nativeEvent.layout,
    });
  }

  render() {
    return (
      <View key={"asd1"} id={"nunu"} style={styles.mainContainer}>
        <View
          onLayout={this.setDropZoneValues.bind(this)}
          style={styles.dropZone}
        >
          <Text key={"asd6"} style={styles.text}>
            Drop me here!
          </Text>
        </View>

        {this.renderDraggable()}
        {this.renderDraggable2()}
      </View>
    );
  }

  renderDraggable() {
    if (this.state.showDraggable) {
      return (
        <View key={"asd2"} style={styles.draggableContainer}>
          <Animated.View
            key={"asd3"}
            {...this.panResponder.panHandlers}
            style={[this.state.pan.getLayout(), styles.circle]}
          >
            <Text key={"asd5"} style={styles.text}>
              Drag me!
            </Text>
          </Animated.View>
        </View>
      );
    }
  }
  renderDraggable2() {
    if (this.state.showDraggable2) {
      return (
        <View
          key={"asd2"}
          style={{
            ...styles.draggableContainer,
            top: Window.height / 3 - CIRCLE_RADIUS,
          }}
        >
          <Animated.View
            key={"asd3"}
            {...this.panResponder.panHandlers}
            style={[this.state.pan.getLayout(), styles.circle]}
          >
            <Text key={"asd5"} style={styles.text}>
              Drag me!
            </Text>
          </Animated.View>
        </View>
      );
    }
  }
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get("window");
let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  dropZone: {
    height: 100,
    backgroundColor: "#2c3e50",
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
  },
  draggableContainer: {
    position: "absolute",
    top: Window.height / 2 - CIRCLE_RADIUS,
    left: Window.width / 2 - CIRCLE_RADIUS,
  },
  circle: {
    backgroundColor: "#1abc9c",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});
