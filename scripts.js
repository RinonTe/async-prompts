function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  popup.classList.remove('open');
  // Wait for one second to let the animation work 
  await wait(1000);
  // Remove it from the Dom
  popup.remove();
  // Remove it from the javascript memory
  popup = null
}
function ask(options) {
    // Options object will have an attribute with the questions and the option for a cancel for us
    return new Promise(async function (resolve) {
        // First, we neefd to create a popup with all the fields in it
        const popup = document.createElement('form');
        popup.classList.add('popup');
        popup.insertAdjacentHTML('afterbegin', `
        <fieldset>
            <label>
                ${options.title}
            </label>
            <input type="text" name="input">
            <label>
               Where are you from?
            </label>
            <input type="text" name="input">
            <label>
                When were you born?
            </label>
            <input type="text" name="input">
            <button type="submit">Submit</button>
        </fieldset>
        `); 

        // Secondly, we're gonna check if they want a cancel button
        if (options.cancel) {
            const skipButton = document.createElement('button');
            skipButton.type = "button";
            skipButton.textContent = "Cancel";
            popup.firstElementChild.appendChild(skipButton);
            // TODO: listen for a click on the cancel button
            skipButton.addEventListener('click', () => {
                resolve(null);
                destroyPopup(popup);
            },
            {once: true}
            );
        }

        popup.addEventListener('submit', function(e) {
            e.preventDefault();
            //popup.input.value
            resolve(e.target.input.value);
        },
        {once: true})
        // Listen for the submit event in the inputs

        // When someone does submit it, resolve the data that was in the input box

        // Insert that popup in the DOM
        document.body.appendChild(popup);
        // Put a very small timeout before we add the open class 
        await wait(50);
        popup.classList.add("open");
    });
};

// ====================================================
async function askQuestion(e) {
    const button = e.currentTarget;
    const cancel = 'cancel' in button.dataset;
    // const cancel = button.hasAttribute('data-cancel');
    const answer = await ask({title: button.dataset.question,
                              cancel,
                            });
    console.log(answer);
}

const buttons = document.querySelectorAll('[data-question]');
buttons.forEach(button => button.addEventListener('click', askQuestion))

const questions = [
    { title: 'What is your name' },
    {title: "What is your age?", cancel: true},
    {title: "What is your dog's name?"},
]
 
async function asyncMap(array, callback) {
    const results = [];
    for (const item of array) {
        results.push(await callback(item));
        return results;
    }
}

async function go() {
    const answers = await asyncMap(questions, ask)
    console.log(answers);
}

// go();