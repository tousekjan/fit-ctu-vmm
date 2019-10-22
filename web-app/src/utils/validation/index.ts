import { array, boolean, date, number, object, setLocale, string, ValidationError } from 'yup'

const typeMapping = {
  number: 'číslo',
  string: 'text',
  date: 'datum',
}

const locales = {
  mixed: {
    default: 'Pole není validní',
    required: 'Pole je povinné ',
    oneOf: 'Honodta musí být jedna z následujících hodnot: ${values}',
    notOneOf: 'Hodnota nesmí být žádná z následujících hodnot: ${values}',
    notType: function notType({ type }) {
      return `Hodnota musí být ${typeMapping[type]}`
    },
  },
  date: {
    required: 'Datum nesmí být prázdné',
    min: 'Datum musí být později než ${min}',
    max: 'Datum musí být dříve než ${max}',
  },
  object: {
    noUnknown: '${path} field cannot have keys not specified in the object shape',
  },
  array: {
    min: 'Hodnoty musí mit velikost alespoň ${min}',
    max: 'Hodnoty musí být velké nebo menší než ${max}',
  },
  string: {
    min: 'Text musí mít délku alespoň ${min}',
    max: 'Text může mít maximálně délku ${max}',
    matches: 'Hodnota musí mít tvar: "${regex}"',
    email: 'Nevalidní email',
    url: 'Neplatná URL adresa',
    trim: 'Text musí být normalizovaný',
    lowercase: 'Pole může obsahovat pouze malá písmena',
    uppercase: 'Pole může obsahovat pouze velká písmena',
  },
  number: {
    min: 'Číslo musí být větší než ${min}',
    max: 'Číslo musí být menší než ${max}',
    lessThan: 'Číslo musí být menší než ${less}',
    moreThan: 'Číslo musí být větší než ${more}',
    positive: 'Hodnota musí být pozitivní číslo',
    negative: 'Hodnota musí být záporné číslo',
    integer: 'Hodnota musí být celé kladné číslo',
  },
}

setLocale(locales)

export { array, date, number, object, setLocale, string, ValidationError, boolean }
