'use babel';

import CodeNoteView from './code-note-view';
import AlertView from './alert-view';
import SelectBoardView from './select-board';
import { CompositeDisposable } from 'atom';
const request = require('request');
const inspect = require('util-inspect');
const modalController = require('./modalController')
const _ = require('underscore')
const trelloToken = 'b0215d3c3271ffbafb9aeec69f5245fba803926b3ef49289b0dfff3928713c79';
const trelloKey = '38a81889c8c5c443bf606d7af2db28fd';
const exampleTerlloAPICall = 'https://api.trello.com/1/members/me/boards?key=38a81889c8c5c443bf606d7af2db28fd&token=b0215d3c3271ffbafb9aeec69f5245fba803926b3ef49289b0dfff3928713c79';
const exampleTrelloBoardList = 'https://api.trello.com/1/boards/521ee60cc6641cfc54001899/lists?key=38a81889c8c5c443bf606d7af2db28fd&token=b0215d3c3271ffbafb9aeec69f5245fba803926b3ef49289b0dfff3928713c79';
const exampleTrelloBoardListCards = 'https://api.trello.com/1/lists/521ee60cc6641cfc5400189a/cards?key=38a81889c8c5c443bf606d7af2db28fd&token=b0215d3c3271ffbafb9aeec69f5245fba803926b3ef49289b0dfff3928713c79';



export default {

  codeNoteView: null,
  alertView: null,
  modalPanel: null,
  subscriptions: null,
  selectBoardsView: null,
  modalController: null,

  config: {
    trelloAppKey: {
      title: 'Your Trello App Key',
      type: 'string',
      default: ''
    },
    trelloToken:{
      title: 'Your Trello Token',
      type: 'string',
      default: ''
    }
  },

  activate(state) {
    this.alertView = new AlertView(state.alertViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.alertView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'code-note:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.alertView.destroy();
  },

  serialize() {
    return {
      codeNoteViewState: this.alertView.serialize()
    };
  },

  toggle() {
    var thisObject = this;
    var editor = atom.workspace.getActiveTextEditor()
    var selection = editor.getSelectedText()

    if(!selection){
      this.alertView.setMessage('nothing selected')
      this.modalPanel.show()
      return setTimeout(function(){thisObject.modalPanel.hide()},2000)
    }else{
      return modalController.selectBoard(this.modalPanel,this.alertView);
    }
  }


};
