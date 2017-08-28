import Ember from 'ember';

export default Ember.Controller.extend({

  emailAddress: '',
  message: '',

  isEmailValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isTextAreaValid: Ember.computed.gte('message.length', 5),

  isButtonDisabled: Ember.computed.not('isTextAreaValid', 'isEmailValid'),

  actualEmailAddress: Ember.computed('emailAddress', function() {
    // console.log('actualEmailAddress function is called: ', this.get('emailAddress'));
  }),

  emailAddressChanged: Ember.observer('emailAddress', function() {
    // console.log('observer is called', this.get('emailAddress'));
  }),

  actualMessage: Ember.computed('message', function() {
    // console.log('actualMessage function is called: ', this.get('message'));
  }),

  messageChanged: Ember.observer('message', function() {
    // console.log('observer is called', this.get('message'));
  }),

  actions: {

    saveInvitation() {
          const email = this.get('emailAddress');
          const message = this.get('message')

          const newContact = this.store.createRecord('contact', { email: email, message: message });

          newContact.save().then((response) => {
            this.set('responseMessage', `Thank you! We saved your email address with the following id: ${response.get('id')}`);
            this.set('emailAddress', '');
            this.set('message', '');
          });
        }
  }
});
