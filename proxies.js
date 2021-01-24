// This can be a 3rd party library
class Greetings {
  english() {
    return "Hello";
  }
  spanish() {
    return "Hola";
  }
}

// Our own implementation
class MoreGreetings {
  german() {
    return "Hallo";
  }
  french() {
    return "Bonjour";
  }
}

const greetings = new Greetings();
const moreGreetings = new MoreGreetings();

const allGreetings = new Proxy(moreGreetings, {
  get: function (target, property) {
    console.log(property);
    // return reference to property function
    return target[property] || greetings[property];
  },
});

console.log(allGreetings.french());

// Another example using Page and CustomPage classes

class Page {
  goto() {
    console.log("I'm going to another page");
  }

  setCookie() {
    console.log("I'm setting a cookie");
  }
}

class CustomPage {
  static build() {
    const page = new Page();
    const customPage = new CustomPage(page);

    const superPage = new Proxy(customPage, {
      get: function (target, property) {
        return target[property] || page[property];
      },
    });

    return superPage;
  }

  constructor(page) {
    this.page = page;
  }

  login() {
    this.page.goto("localhost:3000");
    this.page.setCookie();
  }
}

const superPage = CustomPage.build();
superPage.login();
superPage.goto();
