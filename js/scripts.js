//Business Logic for Bank
function Bank (){
  this.users = [];
  this.currentUser = null;
  this.nextUserId = 0;
}

Bank.prototype.assignUserId = function() {
  var newId = this.nextUserId;
  this.nextUserId++;
  return newId;
}

Bank.prototype.registerUser = function(username, password){
  var userId = this.assignUserId();
  var newUser = new User(userId, username, password);
  this.currentUser = newUser;
  this.users.push(newUser);
}

Bank.prototype.logIn = function(username, password){
  var foundUser = null;
  for (var i = 0; i <this.users.length; i++){
    if (username === this.users[i].name){
      foundUser = this.users[i];
    }
  }

  if(!foundUser) {
    return false;
  }

  if(foundUser.password === password) {
    this.currentUser = foundUser;
    return true;
  } else {
    return false;
  }
}

//Business logic for users
function User (id, name, password) {
  this.account = new Account(0);
  this.id = id;
  this.name = name;
  this.password = password;
}

//Business logic for account
function Account (balance) {
  this.balance = balance;
}

var bank = new Bank();


//User Interface Logic
