export default async function ({ addon, global, console, msg }) {
    console.log('discuss')

    var toolbar =
        document.querySelector("#markItUpId_body > div > div.markItUpHeader > ul") ||
        document.querySelector("#markItUpId_signature > div > div.markItUpHeader > ul");

    var textBox = document.querySelector("#id_body") || document.querySelector("#id_signature");

    var bottom = document.querySelector('.form-submit')

    var canned = [
        {
            name: 'support',
            body: 'adsf'
        },
        {
            name: 'no support',
            body: 'i dont support lol'
        }
    ]

    if (toolbar && textBox) {
        //topic has to be open
        var button = document.createElement('li')
        button.className = "markItUpButton markItUpButton18 markItUpDropMenu";

        var link = document.createElement('a')
        link.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAzUExURQAAAGNvd3qEi3aAh32Hjevr65Kan2l0fICJj6Srr7m9wIeQlVtocIqTmHJ9hJujpwAAAE8cYK8AAAARdFJOU/////////////////////8AJa2ZYgAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAENJREFUKFNjEBBgZIIAZhYBIAAKsLBCARs7RIADymfl5OKGCvCAASsvGx+qClZWflwCEC1ATThVwAE9tTCywAG7gAAA7OsJRJbLCYcAAAAASUVORK5CYII=')"
        button.append(link)

        var dropdown = document.createElement('ul')

        button.append(dropdown)
        var seperator = document.createElement('li')
        seperator.className = 'markItUpSeparator'
        seperator.innerText = '---------------'

        toolbar.append(seperator)
        toolbar.append(button);

        // save
        var or = document.createElement('span')
        or.innerText = 'or '

        var save = document.createElement('a')
        save.innerText = 'Put in the can'
        save.addEventListener('click', e => {
            can(textBox.value)
        })

        bottom.append(or)
        bottom.append(save)

        function makeList() {
            dropdown.innerHTML = '' //im sorry is this a violation of the law? i would assume its not...

            canned.forEach(i => {
                var dropItem = document.createElement('li')
                dropItem.className = 'markItUpButton'

                var dropLink = document.createElement('a')
                dropLink.style.paddingLeft = '5px'
                dropLink.innerText = i.name

                dropItem.append(dropLink)
                dropdown.append(dropItem)

                dropLink.addEventListener('click', e => {
                    textBox.value = i.body
                })
            })
        }

        function can(text) {
            console.log(text)
            canned.push({
                name: prompt('Name?'),
                body: text
            })
            makeList()
        }

        makeList()
    }
}