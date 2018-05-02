import messages from '../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.firstName) {
    errors.firstName = messages.firstNameRequired;
  }

  if (!values.lastName) {
    errors.lastName = messages.lastNameRequired;
  }

  if (!values.email) {
    errors.email = messages.emailRequired;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = messages.emailInvalid;
  }

  if (!values.gender) {
    errors.gender = messages.genderRequired;
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = messages.phoneNumberRequired;
  }

  if (!values.preferredLanguage) {
    errors.preferredLanguage = messages.preferredLanguageRequired;
  }

  if (!values.preferredCurrency) {
    errors.preferredCurrency = messages.preferredCurrencyRequired;
  }

  if (!values.location) {
    errors.location = messages.locationRequired;
  }

  if (!values.info) {
    errors.info = messages.infoRequired;
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = messages.dateOfBirthRequired;
  }

  return errors
}

export default validate
