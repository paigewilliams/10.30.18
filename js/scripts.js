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

Bank.prototype.logOut = function(){
  this.currentUser = null;
}

//Business logic for users
function User (id, name, password) {
  this.account = new Account(0);
  this.id = id;
  this.name = name;
  this.password = password;
}

User.prototype.getAccount = function(){
  return this.account;
}

//Business logic for account
function Account (balance) {
  this.balance = balance;
}

Account.prototype.deposit = function(amount) {
  this.balance += amount;
}

Account.prototype.withdrawl = function(amount){
  this.balance -= amount;
}

Account.prototype.getBalance = function(){
  return this.balance;
}

//User Interface Logic
var bank = new Bank();

function addNewUser(username, password) {
  bank.registerUser(username, password)
  $("#login-page").hide();
  $("#open-account-page").show();
}

function addNewAccount(balance){
  var newAccount = bank.currentUser.getAccount();
  newAccount.deposit(balance);
  $("#open-account-page").hide();
  $("#account-page").show();
}

function logIn(username, password){
  console.log("log in u=", username, " p=", password);
}

$(function() {
  var loginUsername = $("#login-form #login-username");
  var loginPassword = $("#login-form #login-password");
  var startBalance = $("#new-account-form #opening-balance");

  $("#register").click(function() {
    addNewUser(loginUsername.val(), loginPassword.val());
  });
  $("#login").click(function() {
    logIn(loginUsername.val(), loginPassword.val())
  });
  $("#new-account-form").submit(function(event){
    event.preventDefault();
    addNewAccount(parseFloat(startBalance.val()));
  })
});
