import Ember from 'ember';

export default Ember.Controller.extend({

  emailAddress: '',
  message: '',

  isEmailValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isTextAreaValid: Ember.computed.gte('message.length', 5),

  isButtonDisabled: Ember.computed.not('isTextAreaValid', 'isEmailValid'),

  actualEmailAddress: Ember.computed('emailAddress', function() {
    console.log('actualEmailAddress function is called: ', this.get('emailAddress'));
  }),

  emailAddressChanged: Ember.observer('emailAddress', function() {
    console.log('observer is called', this.get('emailAddress'));
  }),

  actualMessage: Ember.computed('message', function() {
    console.log('actualMessage function is called: ', this.get('message'));
  }),

  messageChanged: Ember.observer('message', function() {
    console.log('observer is called', this.get('message'));
  }),

  actions: {

    saveInvitation() {
      alert(`Saving of the following email: ${this.get('emailAddress')} and the message: ${this.get("message")}`);
      this.set('responseMessage', `We got your message and we’ll get in touch soon`);
      this.set('emailAddress', '');
      this.set('message', '');
    }
  }
});
