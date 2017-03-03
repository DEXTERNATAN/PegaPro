angular.module('pegapro')
 
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
 
.constant('USER_ROLES', {
  admin: 'admin_role',
  public: 'public_role'
})

.constant('SERVERS', {
  prod: 'https://pegaproweb.herokuapp.com/',
  dev: 'http://localhost:3000/'
});

