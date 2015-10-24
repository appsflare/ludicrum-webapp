let emoticons,
  codesMap = {},
  primaryCodesMap = {},
  regexp,
  metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g,
  entityMap;

entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
};

let definition = {
  "smile": {"title": "Smile", "codes": [":)", ":=)", ":-)"]},
  "sad-smile": {"title": "Sad Smile", "codes": [":(", ":=(", ":-("]},
  "big-smile": {"title": "Big Smile", "codes": [":D", ":=D", ":-D", ":d", ":=d", ":-d"]}
};

function escape(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}

export class EmoticonsParser {


  constructor() {
    "use strict";
    this.define(definition);
  }

  /**
   * Define emoticons set.
   *
   * @param {Object} data
   */
  define(data) {
    var name, i, codes, code,
      patterns = [];

    for (name in data) {
      codes = data[name].codes;
      for (i in codes) {
        code = codes[i];
        codesMap[code] = name;

        // Create escaped variants, because mostly you want to parse escaped
        // user text.
        codesMap[escape(code)] = name;
        if (i == 0) {
          primaryCodesMap[code] = name;
        }
      }
    }

    for (code in codesMap) {
      patterns.push('(' + code.replace(metachars, "\\$&") + ')');
    }

    regexp = new RegExp(patterns.join('|'), 'g');
    emoticons = data;
  }

  /**
   * Replace emoticons in text.
   *
   * @param {String} text
   * @param {Function} [fn] optional template builder function.
   */
  replace(text, fn) {
    return text.replace(regexp, (code)=> {
      var name = codesMap[code];
      return (fn || this.tpl)(name, code, emoticons[name].title);
    });
  }

  /**
   * Get primary emoticons as html string in order to display them later as overview.
   *
   * @param {Function} [fn] optional template builder function.
   * @return {String}
   */
  toString(fn) {
    var code,
      str = '',
      name;

    for (code in primaryCodesMap) {
      name = primaryCodesMap[code];
      str += (fn || this.tpl)(name, code, emoticons[name].title);
    }

    return str;
  }

  /**
   * Build html string for emoticons.
   *
   * @param {String} name
   * @param {String} code
   * @param {String} title
   * @return {String}
   */
  tpl(name, code, title) {
    return '<span class="emoticon emoticon-' + name + '" title="' + title + '">' +
      code + '</span>';
  }

}
