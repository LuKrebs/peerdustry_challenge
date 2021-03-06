import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service(),
  firebase: Ember.inject.service(),

  beforeModel() {
    this.get('session').fetch().catch(function() {});
  },

  model() {
    return this.store.findAll('invitation');
  },

  actions: {

    deleteInvitation(invitation) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        invitation.destroyRecord();
      }
    },

    signIn(email, pswd) {
      this.get('session').open('firebase', {
        provider: 'password',
        email: email,
        password: pswd,
      }).then(() => {
        console.log("Login success");
      }, (error) => {
        console.log(error);
        console.log(email);
      });
    },

    signOut() {
      this.get('session').close();
    }
  }
});
