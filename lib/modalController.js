'use babel';

import SelectBoardView from './select-board';
import SelectListView from './select-list';
const _ = require('underscore')
const request = require('request');
const exampleTrelloBoardList = 'https://api.trello.com/1/boards/521ee60cc6641cfc54001899/lists?key=38a81889c8c5c443bf606d7af2db28fd&token=b0215d3c3271ffbafb9aeec69f5245fba803926b3ef49289b0dfff3928713c79';

var selectBoardsView;
var selectListsView;

var boards;
var lists;

module.exports = {
  selectBoard: function(boards){
    this.boards = boards;
    var boardNames = _.map(boards,function(board){
      return board.name;
    })
    selectBoardsView = new SelectBoardView(this,boardNames);
  },
  boardSelected(boardName){
    var selectedBoard = _.find(this.boards,function(board){
      return board.name == boardName
    })
    console.log('user selected the board name: %s',selectedBoard.name)
    console.log('user selected the board id: %s',selectedBoard.id)

    request(exampleTrelloBoardList,function(error,response,body){
      if(error){

      }else if(response.statusCode > 300){

      }else{
        lists = JSON.parse(body);
        var listNames = _.map(lists,function(list){
          return list.name;
        })

        selectListsView = new SelectListView(this,listNames);
      }
    })

  },
  listSelected(listName){
    var selectedList = _.find(this.lists,function(list){
      return list.name == listName
    })

    console.log('user selected the list name: %s',selectedList.name)
    console.log('user selected the list id: %s',selectedList.id)

  },
  typeMessage: function(){

  },
}
