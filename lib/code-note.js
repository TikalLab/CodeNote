'use babel';

import CodeNoteView from './code-note-view';
import AlertView from './alert-view';
import SelectBoardView from './select-board';
import { CompositeDisposable } from 'atom';
const request = require('request');
const inspect = require('util-inspect');
const modalController = require('./modalController')
const _ = require('underscore')



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

  toggle(){
      return this.trello()
  },

  trello() {
    console.log('here')
    var thisObject = this;
    var editor = atom.workspace.getActiveTextEditor()
    var selection = editor.getSelectedText()

    if(!selection){
      this.alertView.setMessage('No text is selected')
      this.modalPanel.show()
      return setTimeout(function(){thisObject.modalPanel.hide()},2000)
    }else{
      return modalController.selectBoard(this.modalPanel,this.alertView);
    }
  }


};
