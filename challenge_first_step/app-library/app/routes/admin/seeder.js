import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service(),
  firebase: Ember.inject.service(),

  beforeModel() {
    this.get('session').fetch().catch(function() {});
  },

  model() {
    return Ember.RSVP.hash({
      libraries: this.store.findAll('library'),
      books: this.store.findAll('book'),
      authors: this.store.findAll('author')
    })
  },

  setupController(controller, model) {
    controller.set('libraries', model.libraries);
    controller.set('books', model.books);
    controller.set('authors', model.authors);

    this._super(controller, model);
  },

  actions: {

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
