import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service(),

  beforeModel() {
    this.get('session').fetch().catch(function() {});
  },

  model() {
    return this.store.findAll('contact');
  },

  actions: {

    deleteContact(contact) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        contact.destroyRecord();
      }
    },

    signIn(email, password) {
      this.get('session')
        .open('firebase', { provider: 'password', email: email, password: password})
        .then(data => console.log(data.currentUser));
    },

    signOut() {
      this.get('session').close();
    }
  }
});
