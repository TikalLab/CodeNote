'use babel';

import SelectBoardView from './select-board';
import SelectListView from './select-list';
const _ = require('underscore')
const request = require('request');

const inspect = require('util-inspect');

var selectBoardsView;
var selectListsView;

var boards;
var lists;
var alertView;
var modalPanel;

module.exports = {
  selectBoard: function(modalPanel,alertView){
    this.modalPanel = modalPanel;
    this.alertView = alertView;
    var thisObject = this;

    var qs = {
      key: atom.config.get('code-note.trelloAppKey'),
      token: atom.config.get('code-note.trelloToken'),
    }
    request('https://api.trello.com/1/members/me/boards',{qs: qs},function(error,response,body){
      if(error){

      }else if(response.statusCode > 300){

      }else{
        var boards = JSON.parse(body);
        thisObject.boards = boards;
        var boardNames = _.map(boards,function(board){
          return board.name;
        })
        selectBoardsView = new SelectBoardView(thisObject,boardNames);
      }
    });


  },
  boardSelected(boardName){
    var thisObject = this;
    var selectedBoard = _.find(this.boards,function(board){
      return board.name == boardName
    })
    console.log('user selected the board name: %s',selectedBoard.name)
    console.log('user selected the board id: %s',selectedBoard.id)

    var qs = {
      key: atom.config.get('code-note.trelloAppKey'),
      token: atom.config.get('code-note.trelloToken'),
    }

    request('https://api.trello.com/1/boards/' + selectedBoard.id + '/lists',{qs: qs},function(error,response,body){
      if(error){

      }else if(response.statusCode > 300){

      }else{
        thisObject.lists = JSON.parse(body);
        var listNames = _.map(thisObject.lists,function(list){
          return list.name;
        })

        selectListsView = new SelectListView(thisObject,listNames);
      }
    })

  },
  listSelected(listName){
    var thisObject = this;
    var selectedList = _.find(this.lists,function(list){
      return list.name == listName
    })

    console.log('user selected the list name: %s',selectedList.name)
    console.log('user selected the list id: %s',selectedList.id)

    var editor = atom.workspace.getActiveTextEditor()
    var selection = editor.getSelectedText()
    // now post it to trello
    var form = {
      idList: selectedList.id,
      name: selection
    }
    var qs = {
      key: atom.config.get('code-note.trelloAppKey'),
      token: atom.config.get('code-note.trelloToken'),
    }
    request.post('https://api.trello.com/1/cards',{form: form, qs: qs},function(error,response,body){
      if(error){
      }else if(response.statusCode > 300){
        console.log('error form trello: %s',error)

      }else{
        console.log('success from trello: %s',body)
        thisObject.alertView.setMessage('Task posted to trello')
        thisObject.modalPanel.show()
        setTimeout(function(){thisObject.modalPanel.hide()},2000)
      }
    })

  },
  typeMessage: function(){
    // TBD need to add settings and an explantion on how to get token from trello
  },
}
