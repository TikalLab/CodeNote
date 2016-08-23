'use babel';

import SelectBoardView from './select-board';

var selectBoardsView;

module.exports = {
  selectBoard: function(boardNames){
    selectBoardsView = new SelectBoardView(this,boardNames);
  },
  boardSelected(boardName){
    console.log('user selected the board: %s',boardName)
    // selectBoardsView.cancel();
  },
  typeMessage: function(){

  },
}
