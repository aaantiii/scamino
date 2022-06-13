export default class Validator {
  static config = {
    transaction: {
      minAmount: 10,
      maxAmount: 10000
    },
    password: {
      minLength: 8,
      maxLength: 30
    },
    name: {
      minLength: 2,
      maxLength: 30
    },
    countries: [
      'Österreich',
      'Deutschland',
      'Schweiz'
    ],
    city: {
      minLength: 2,
      maxLength: 30
    },
    zip: {
      minLength: 4,
      maxLength: 5
    }
  }

  // email:  https://www.w3resource.com/javascript/form/email-validation.php
  // phone:  https://stackoverflow.com/questions/8634139/phone-validation-regex
  // street: https://stackoverflow.com/questions/48623664/regex-to-extract-german-street-number
  static pattern = {
    email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/,
    phone: /^\+(?:[0-9]●?){8,14}[0-9]$/,
    street: /^[ \-a-zA-Z.]+\s+(\d+(\s?\w$)?)/
  }

  static isValidName(firstName, lastName) {
    if (!firstName || !lastName) return false
    return firstName.length >= this.config.name.minLength && firstName.length <= this.config.name.maxLength &&
           lastName.length >= this.config.name.minLength  && lastName.length <= this.config.name.maxLength
  }

  static isValidEmail(email) {
    if (!email) return false
    return this.pattern.email.test(email)
  }

  static isValidPassword(pw) {
    if (!pw) return false
    return pw.length >= this.config.password.minLength && pw.length <= this.config.password.maxLength
  }

  static isValidTransactionAmount(amount) {
    if (!amount) return false
    return amount >= this.config.transaction.minAmount && amount <= this.config.transaction.maxAmount
  }

  static isValidPhoneNumber(phoneNumber) {
    if (!phoneNumber) return false
    return this.pattern.phone.test(phoneNumber)
  }

  static isValidStreet(street) {
    if (!street) return false
    return this.pattern.street.test(street)
  }

  static isValidCountry(country) {
    if (!country) return false
    return this.config.countries.includes(country)
  }

  static isValidCity(city) {
    if (!city) return false
    return city.length >= this.config.city.minLength && city.length <= this.config.city.maxLength
  }
  
  static isValidZip(zip) {
    if (!zip) return false
    return !isNaN(zip) && zip.length >= this.config.zip.minLength && zip.length <= this.config.zip.maxLength
  }
}
