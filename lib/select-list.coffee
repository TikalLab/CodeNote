{SelectListView} = require 'atom-space-pen-views'

module.exports =
class MySelectListView extends SelectListView
 initialize:(@maister,@listNames) ->
   super
   @addClass('overlay from-top')
  #  @setItems(['Hello', 'World'])
   @setItems(listNames)
   @panel ?= atom.workspace.addModalPanel(item: this)
   @panel.show()
   @focusFilterEditor()

 viewForItem: (item) ->
   "<li>#{item}</li>"

 confirmed: (item) ->
  #  console.log("#{item} was selected")
  #  this.cancel();
  @maister.listSelected(item);
  @cancel();

 cancelled: ->
   console.log("This view was cancelled")
   @panel?.destroy()
