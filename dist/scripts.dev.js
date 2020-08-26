"use strict";

function wait() {
  var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function destroyPopup(popup) {
  return regeneratorRuntime.async(function destroyPopup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          popup.classList.remove('open'); // Wait for one second to let the animation work 

          _context.next = 3;
          return regeneratorRuntime.awrap(wait(1000));

        case 3:
          // Remove it from the Dom
          popup.remove(); // Remove it from the javascript memory

          popup = null;

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function ask(options) {
  // Options object will have an attribute with the questions and the option for a cancel for us
  return new Promise(function _callee(resolve) {
    var popup, skipButton;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // First, we neefd to create a popup with all the fields in it
            popup = document.createElement('form');
            popup.classList.add('popup');
            popup.insertAdjacentHTML('afterbegin', "\n        <fieldset>\n            <label>\n                ".concat(options.title, "\n            </label>\n            <input type=\"text\" name=\"input\">\n            <label>\n               Where are you from?\n            </label>\n            <input type=\"text\" name=\"input\">\n            <label>\n                When were you born?\n            </label>\n            <input type=\"text\" name=\"input\">\n            <button type=\"submit\">Submit</button>\n        </fieldset>\n        ")); // Secondly, we're gonna check if they want a cancel button

            if (options.cancel) {
              skipButton = document.createElement('button');
              skipButton.type = "button";
              skipButton.textContent = "Cancel";
              popup.firstElementChild.appendChild(skipButton); // TODO: listen for a click on the cancel button

              skipButton.addEventListener('click', function () {
                resolve(null);
                destroyPopup(popup);
              }, {
                once: true
              });
            }

            popup.addEventListener('submit', function (e) {
              e.preventDefault(); //popup.input.value

              resolve(e.target.input.value);
            }, {
              once: true
            }); // Listen for the submit event in the inputs
            // When someone does submit it, resolve the data that was in the input box
            // Insert that popup in the DOM

            document.body.appendChild(popup); // Put a very small timeout before we add the open class 

            _context2.next = 8;
            return regeneratorRuntime.awrap(wait(50));

          case 8:
            popup.classList.add("open");

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
}

; // ====================================================

function askQuestion(e) {
  var button, cancel, answer;
  return regeneratorRuntime.async(function askQuestion$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          button = e.currentTarget;
          cancel = 'cancel' in button.dataset; // const cancel = button.hasAttribute('data-cancel');

          _context3.next = 4;
          return regeneratorRuntime.awrap(ask({
            title: button.dataset.question,
            cancel: cancel
          }));

        case 4:
          answer = _context3.sent;
          console.log(answer);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}

var buttons = document.querySelectorAll('[data-question]');
buttons.forEach(function (button) {
  return button.addEventListener('click', askQuestion);
});
var questions = [{
  title: 'What is your name'
}, {
  title: "What is your age?",
  cancel: true
}, {
  title: "What is your dog's name?"
}];

function asyncMap(array, callback) {
  var results, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

  return regeneratorRuntime.async(function asyncMap$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          results = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context4.prev = 4;
          _iterator = array[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context4.next = 17;
            break;
          }

          item = _step.value;
          _context4.t0 = results;
          _context4.next = 11;
          return regeneratorRuntime.awrap(callback(item));

        case 11:
          _context4.t1 = _context4.sent;

          _context4.t0.push.call(_context4.t0, _context4.t1);

          return _context4.abrupt("return", results);

        case 14:
          _iteratorNormalCompletion = true;
          _context4.next = 6;
          break;

        case 17:
          _context4.next = 23;
          break;

        case 19:
          _context4.prev = 19;
          _context4.t2 = _context4["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context4.t2;

        case 23:
          _context4.prev = 23;
          _context4.prev = 24;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 26:
          _context4.prev = 26;

          if (!_didIteratorError) {
            _context4.next = 29;
            break;
          }

          throw _iteratorError;

        case 29:
          return _context4.finish(26);

        case 30:
          return _context4.finish(23);

        case 31:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[4, 19, 23, 31], [24,, 26, 30]]);
}

function go() {
  var answers;
  return regeneratorRuntime.async(function go$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(asyncMap(questions, ask));

        case 2:
          answers = _context5.sent;
          console.log(answers);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
} // go();