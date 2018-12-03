import React from 'react';
import { StyleSheet, Text, View, Button, PixelRatio, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import {Game} from './Core';

const numColumns = 4;
const win = 'YOU WIN';
const newGame = 'New Game';
const steps = 'STEPS: ';

var gameState = { 'game':1, 'win':2, 'stop':3 };

export default class BoardView extends React.Component {
  constructor(props) {
    super(props);
    puzzle = new Game([], 0, gameState.stop);
    puzzle.initBoard();
    this.state = {
      refresh: false,
      game: puzzle,
      tiles: puzzle.getBoard(),
      moves: puzzle.getMoves(),
      status: puzzle.getStatus(),
    };
  }

  onPressTiles(index) {
    if(this.state.game.move(index)) {
      this.updateView();
    }
  }

  updateView() {
    this.setState({
      refresh: !this.state.refresh,
      tiles: this.state.game.getBoard(),
      moves: this.state.game.getMoves(),
      status: this.state.game.getStatus(),
    })
  }

  renderItem = ({item, index}) => {
    if(item === 16) {
      return <View
        style={[styles.item, styles.itemInvisible]}>
      </View>
    }
    if(this.state.status === gameState.win) {
      return(
        <View
          style={[styles.item, styles.itemWin]}>
          <Text
            style={styles.itemText}>
            {win}
          </Text>
        </View>
      )
    }
    return(
      <TouchableOpacity
        style={styles.item}
        onPress={() => {this.onPressTiles(index);}}>
        <Text
          style={styles.itemText}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  }

  restart() {
    this.state.game.restart();
    this.updateView();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.counterText}>{steps}{this.state.moves}</Text>
        <View style={styles.gridView}>
          <FlatList
            style={styles.grid}
            scrollEnabled={false}
            numColumns={numColumns}
            extraData={this.state.refresh}
            data={this.state.tiles}
            keyExtractor={item => item}
            renderItem={this.renderItem}
          />
        </View>
        <View
          style={styles.buttonView}>
          <TouchableOpacity
            style={styles.newGameButton}
            onPress={() => {this.restart();}}>
            <Text
              style={styles.newGameText}>
              {newGame}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    //flex: 1,
    backgroundColor: '#dcdcdc',
    borderRadius: 10,
  },
  item: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 3,
    height: (Dimensions.get('window').width
            - 3*8)/numColumns
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemWin: {
    backgroundColor: 'purple',
  },
  itemText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25
  },
  counterText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
    marginBottom: 5
  },
  gridView: {
    //backgroundColor:'black',
    height: Dimensions.get('window').width,
    //flex: 1,
  },
  buttonView: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newGameButton: {
    borderRadius: Dimensions.get('window').width/2,
    borderColor: 'green',
    borderWidth: 2,
    padding: 10,//PixelRatio.getPixelSizeForLayoutSize(5),
  },
  newGameText: {
    fontSize: 20,//PixelRatio.getPixelSizeForLayoutSize(10),
    textAlign: 'center',
    color: 'green'
  }
});
