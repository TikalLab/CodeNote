'use babel';

export default class AlertView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('code-note');

    // Create message element
    this.message = document.createElement('div');
    this.message.textContent = 'The CodeNote package is Alive! It\'s ALIVE!';
    this.message.classList.add('message');
    this.element.appendChild(this.message);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  cancel(){
    this.destroy()
  }

  setMessage(msg){
    this.message.textContent = msg
  }

}
