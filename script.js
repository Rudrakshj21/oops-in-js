'use strict';

// oops challenge 1
// normal way

/*
function Car(make, speed) {
  this.make = make;
  this.speed = speed;
  this.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is moving at speed of ${this.speed}km/h`);
  };
  this.brake = function () {
    this.speed -= 5;
    console.log(`${this.make} is moving at speed of ${this.speed}km/h`);
  };
}

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

console.log(bmw);
console.log(mercedes);
bmw.accelerate();
bmw.brake();
bmw.accelerate();
bmw.brake();
bmw.brake();
for (let i = 0; i < 5; i++) {
  mercedes.brake();
}
*/
/////////////////////////////////////////////////////////
// using prototypal inheritance

/*
function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is moving at speed of ${this.speed}km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is moving at speed of ${this.speed}km/h`);
};
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
mercedes.brake();
/////////////////////////////////////////////////////////
*/

// class expressions
// const PersonCl = class{

// }
/////////////////////////////////////////////////////////
// class declaration

/*
class PersonCl {
  constructor(name, birthYear) {
    // console.log(
    //   'constructor function called automatically when new operator used'
    // );
    // Instance properties
    this.name = name;
    this.birthYear = birthYear;
  }
  //   Instance methods will be added to prototype of the class and not onto the object directly but can be used by all objects of the class
  calcAge() {
    console.log(`${this.name} is ${2023 - this.birthYear} years old`);
  }
}

const jessica = new PersonCl('Jessica', 2001);
console.log(jessica);

console.log(
  'Object.getPrototypeOf(jessica) === PersonCl.prototype',
  Object.getPrototypeOf(jessica) === PersonCl.prototype
);

jessica.greet = () => {
  console.log('hi');
};
PersonCl.prototype.sayBye = function () {
  console.log(`${this.name} says bye!`);
};
console.log(jessica.hasOwnProperty('calcAge'));
console.log(jessica.hasOwnProperty('greet'));
*/
/////////////////////////////////////////////////////////
// getters and setters on object literal
/*
const account = {
  owner: 'rudraksh',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(movement) {
    this.movements.push(movement);
  },
};
console.log(account.latest);

account.latest = 20;
console.log(account.movements);
*/
/////////////////////////////////////////////////////////
// getters and setters on class
/*
class PersonCl {
  constructor(name, birthYear) {
    this.fullName = name; //its not directly setting the property rather calling the setter
    // as obj.prop = new val syntax is used and setter is available with the name of fullName
    console.log('at second line of constructor');
    this._birthYear = birthYear;
    console.log(this.fullName); // here should it not have fullName?
  }
  calcAge() {
    console.log(`${this.name} is ${2023 - this.birthYear} years old`);
  }

  get birthYear() {
    return this._birthYear;
  }

  set birthYear(newBirthYear) {
    this._birthYear = newBirthYear;
  }

  set fullName(newFullName) {
    console.log('called set full name on first line of constructor');
    if (newFullName !== 'rud') {
      alert('cannot set');
    } else {
      this._fullName = newFullName;
    }
    console.log(this);
  }
  get fullName() {
    return this._fullName;
  }
  static myStatic() {
    console.log('my static');
  }
}
const rud = new PersonCl('rud', 2001);
console.log(rud);
console.log(rud._birthYear); //accessing invokes getter
rud.birthYear = 2004;
console.log(rud);
console.log(rud.fullName);
/////////////////////////////////////////////////////////
// static methods (defined on the constructor function itself )
PersonCl.testStatic = function () {
  console.dir(this);
  console.log(
    'this is a static method on PersonCl class and its objects cannot access this method'
  );
};
// rud.testStatic(); // gives error
PersonCl.testStatic();
*/
/////////////////////////////////////////////////////////
// Object.create() for PI

/*
const carProto = {
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is running at ${this.speed}km/h`);
  },
};
const bmw = Object.create(carProto);
console.log(bmw);
bmw.make = 'BMW';
bmw.speed = 20;
console.log(bmw);
bmw.accelerate();
bmw.accelerate();
carProto.test = '1';
console.log(bmw);

// console.log(bmw instanceof carProto);

const personProto = {
  calcAge() {
    console.log(2023 - this.birthYear);
  },
  init(name, birthYear) {
    (this.name = name), (this.birthYear = birthYear);
  },
};

const rudraksh = Object.create(personProto);
rudraksh.init('rudraksh', 2001);
rudraksh.calcAge();
*/

/*
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is moving at ${this.speed}km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is moving at ${this.speed}km/h`);
  }
  // getter and setter

  get speedUs() {
    return this.speed / 1.6;
  }

  set speedUs(currentSpeed) {
    this.speed = currentSpeed * 1.6;
  }
}

const bmw = new Car('BMW', 40);
const audi = new Car('audi', 40);
const ford = new Car('ford', 120);
console.log(ford.speedUs);
console.log(bmw, audi);
console.log(bmw.speedUs);
bmw.speedUs = 25;
console.log(bmw);
bmw.accelerate();
bmw.brake();
*/
/////////////////////////////////////////////////////////
// Inheritance between classes : constructor functions
/*
const Person = function (name, birthYear) {
  this.name = name;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

const Student = function (name, birthYear, course) {
  Person.call(this, name, birthYear); // function borrowing (reference,args......)
  // this.name = name;
  // this.birthYear = birthYear;
  this.course = course;
};
Student.prototype = Object.create(Person.prototype);
// this is same as
// Student.prototype.__proto__ = Person.prototype
Student.prototype.introduce = function () {
  console.log(
    `Hi my name is ${this.name} born in the year ${this.birthYear} studying ${this.course}`
  );
};

const rud = new Person('rudraksh', 2001);
const steven = new Student('steven', 2002, 'Computer Science');
console.log(steven);
console.log(steven instanceof Person);
console.log(rud instanceof Person);
console.log(rud instanceof Student);
// before resetting constructor property to Student
console.dir(Student.prototype.constructor);
Student.prototype.constructor = Student;
// since constructor property must always point to the constructor function it self but
// because we changed Student.prototype for inheritance the constructor property
// pointed back to Person so we are changing it back to student
console.dir(Student.prototype.constructor);
console.log(steven);
// chrome might show confusing result when logging steven
console.log(Student.prototype === steven.__proto__);
console.log(Person.prototype === steven.__proto__);
*/
/////////////////////////////////////////////////////////
// coding challenge 4

/*
function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}
EV.prototype = Object.create(Car.prototype);

Car.prototype.accelerate = function () {
  this.speed += 10;

  console.log(`${this.make} is running at ${this.speed}km/h `);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is running at ${this.speed}km/h`);
};

function EV(make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
}
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 10;
  this.charge--;
  console.log(
    `${this.make} is running at ${this.speed}km/h. current charge ${this.charge}%`
  );
};
const tesla = new EV('tesla', 120, 23);
const bmw = new Car('bmw', 20);
bmw.accelerate();
// inheritance
EV.prototype.constructor = EV;
console.log(tesla);
console.log('charging to 40');
tesla.chargeBattery(40);
console.log(tesla);
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.brake();
tesla.brake();
tesla.brake();
*/
/////////////////////////////////////////////////////////
// Inheritance Between Classes : ES6 classes

/*
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  introduce() {
    console.log(
      `Hi I'am ${this.fullName} born in the year ${this.birthYear} studying ${this.course}`
    );
  }
  calcAge() {
    console.log(2037 - this.birthYear);
  }
}

class Student extends PersonCl {
  constructor(fullName, birthYear, course) {
    // always needs to happens first as super() is responsible for creating this keyword for sub class
    super(fullName, birthYear);
    this.course = course;
  }
  // if we had no constructor function it would automatically call the
  // parent class constructor with the same args as parent class's constructor;

  // polymorphism : overriding parent class method by child class
  calcAge() {
    console.log(
      `I am ${
        2037 - this.birthYear
      } years old but at university i feel like ${2037-this.birthYear + 10} years old 😂`
    );
  }
}

const jacob = new Student('jacob john', 2001, 'comp sci');
const max = new PersonCl('max', 2003);
console.log(jacob);
*/
/////////////////////////////////////////////////////////
// Inheritance Between Classes : Object.create()

/*
const PersonProto = {
  calcAge() {
    console.log(2023 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// a normal person object whose prototype is PersonProto object
const steven = Object.create(PersonProto);
// another object whose prototype is PersonProto object but this object was named StudentProto so that
// multiple objects whose prototype is StudentProto can also access methods and properties of PersonProto as they are in prototype chain
const StudentProto = Object.create(PersonProto);
// here we can modify studentProto as we want considering a student class in mind
StudentProto.init = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(
    `This is ${this.firstName},age  : ${2023 - this.birthYear},course : ${
      this.course
    }`
  );
};
// a student object
const max = Object.create(StudentProto);
// polymorphism
max.init('max', 2001, 'AI/ML');
steven.init('steven', 1883);
max.introduce();
max.calcAge();
console.log(max);
*/
/*
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // protected - not truly private
    this.pin = pin;
    this._movements = [];
    this.local = navigator.language;

    console.log(`thanks for opening an account,${owner}`);
  }

  getMovements() {
    return this._movements;
  }

  getPin() {
    return this._pin;
  }
  // public interface of our objects (api)
  deposit(value) {
    this._movements.push(value);
  }
  // since wwe are withdrawing negative value
  // it masks the fact that it takes -ve value
  withdraw(value) {
    this.deposit(-value);
  }

  // example
  // protected method
  _approveLoan(val) {
    return true;
  }

  requestLoan(value) {
    if (this._approveLoan(value)) {
      this.deposit(value);
      console.log('loan approved');
    } else {
      console.log('loan cannot be approved');
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// deposit
// always better to create methods rather than directly interacting with properties
// acc1.movements.push(250);
// acc1.movements.push(-140);

acc1.deposit(250);
acc1.withdraw(140);

console.log(acc1);

acc1.requestLoan(100);
console.log(acc1);

// we are able to access this
// in real world this should not occur
// this is why we need data encapsulation and data privacy
acc1._approveLoan();
console.log(acc1.pin);

acc1.getMovements();

*/
// different class fields : -  public/private fields , public/private methods
class Account {
  // public fields (attached to each instance and not the prototype)
  local = navigator.language;

  // private fields (makes properties truly not accessible from outside)
  #movements = [];
  #pin; // empty field since we cannot set private fields inside a constructor
  // for every instance it will be set as property and its value will be undefined
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // now for each instance the pin value will be changed from undefined to the parameter's pin value
    this.#pin = pin;
    console.log(`thanks for opening an account,${owner}`);
  }

  // these are nothing but public methods
  getMovements() {
    return this.#movements;
  }

  getPin() {
    return this._pin;
  }
  deposit(value) {
    this.#movements.push(value);
    return this;
  }
  withdraw(value) {
    this.deposit(-value);
    return this;
  }

  requestLoan(value) {
    console.log(`in request loan ${value}`);
    if (this.#approveLoan(value)) {
      this.deposit(value);
      console.log('loan approved');
      return this;
    } else {
      console.log('loan cannot be approved');
      return this;
    }
  }

  // private methods (useful for hiding implementation details from outside)
  #approveLoan(val) {
    const balance = this.#movements.reduce((sumBalance, currentTransaction) => {
      sumBalance += currentTransaction;
      return sumBalance;
    }, 0);
    console.log(`total bal : ${balance} , request loan : ${val}`);
    if (balance >= val) {
      return true;
    } else {
      return false;
    }
  }

  //static fn is  present on the class itself
  static helper() {
    console.log('e');
  }
}
const acc1 = new Account('Jonas', 'EUR', 1111);

console.log(acc1);
// acc1.withdraw(200);
acc1.deposit(300);

console.log(acc1.getMovements()); // no error as getMovements is accessible which
// itself is inside a class when accessing the movements property is an example of public api

// console.log(acc1.#movements); // error trying to access private fields outside of the class

// console.log(acc1.#pin);

acc1.requestLoan(300);

// console.log(acc1.#approveLoan()); cannot access since private method

// chaining normal methods
/*
let nums = [1, 2, 3, 4];

nums = nums
  .filter(num => {
    return num % 2 == 1;
  })
  .map(num => {
    return num * 2;
  })
  .reduce((result, num) => {
    return (result = result - num);
  });
console.log(nums);
*/

// chaining instance methods

// console.log(acc1.withdraw(300).deposit(30).withdraw(20).requestLoan(2500));

console.log(acc1.requestLoan(350));
console.log(acc1.requestLoan(300));
