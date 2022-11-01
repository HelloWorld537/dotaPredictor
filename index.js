

const url = 'https://api.opendota.com';
let strong = document.querySelector('.strong');
let agility = document.querySelector('.agility');
let magick = document.querySelector('.magick');
let searchPanel = document.querySelector('#search');




let modal = document.querySelector('.choose-hero-modal');

let coef = document.querySelector('.center__score');


// panels
let pickPanelsTop = document.querySelectorAll('.top-row__item');
let pickPanelsBot = document.querySelectorAll('.bottom-row__item');
let comand = document.querySelector('.center__team');


// picks

let firstPick = '';
let secondPick = '';
let thirdPick = '';
let fouthPick = '';
let fivePick = '';

let sixPick = '';
let sevenPick = '';
let eithPick = '';
let ninePick = '';
let teenPick = '';

slotsNumber = [];
slotsNumberLocalized = [];


// службовий код
const createEvent = () => {
  const listeners = new Set();
  const event = (...payload) => listeners.forEach((l) => l(...payload));
  event.listen = (handler) => listeners.add(handler);
  event.off = (handler) => listeners.delete(handler);
  return event;
};


//створення події heroSelectedStarted (клік на слот) та heroSelected (коли герой вибраний)

const heroSelectStarted = createEvent();
const heroSelectStartedBot = createEvent();
const heroSelected = createEvent();
const heroSelectedBot = createEvent();

const startParse = createEvent();

let againstTeam = [];
let allyTeam = [];

let ready = 0;

let allTeam
// server = 'http://localhost:9999';
// const xhr = new XMLHttpRequest();
// xhr.open('GET', server)
// xhr.send('hi')


let lock = 0;
let i = 0;
startParse.listen((...heroes) => {



  i = i + 1;








  heroes.forEach((hero, index) => {

    if (index >= 5 && index != 9) {
      againstTeam.push(hero)

    }
    else if (index < 5) {
      allyTeam.push(hero)
    }

    if (index == 9 && lock == 0) {
      lock = 1;
      againstTeam.push(hero)

      allTeam = againstTeam.concat(allyTeam);

      //ff

      document.querySelector('.txt').style.display = 'none';
      document.querySelector('.pl').style.display = 'block';
      fetch(`http://localhost:8000`, {
        method: 'POST',
        body: `${allTeam}`,
        headers: { "Content-type": "text/html; charset=UTF-8" }

        //f
      })
        .then(function (data) {



          data.json().then(function (data) {

            for (let i = 0; i < data.length; i++) {
              ready = Number(data[i]) + ready;
              readyFloor = Math.floor(ready)


            }



            document.querySelector('.pl').style.display = 'none';

            if (ready < 0) {
              document.querySelector('.center__text').innerHTML = `Команда <line class="center__team">1 </line>має більше шансів на перемогу з коефіцієнтом : <line
            class="center__score">${ready.toFixed(2)}</line>`
            }
            else {
              document.querySelector('.center__text').innerHTML = `Команда <line class="center__team">2 </line>має більше шансів на перемогу з коефіцієнтом : <line
            class="center__score">${ready.toFixed(2)}</line>`
            }


            // coef.innerHTML = ready.toFixed(2)


          })
        })





    }




  });

});

// Popup-----------------------------------------------------
fetch('https://api.opendota.com/api/heroStats/')
  .then((response) => response.json())

  .then((json) => {

    for (i = 0; i < 138; i++) {
      slotsNumber.push(json[i].localized_name);
      slotsNumberLocalized = slotsNumber;
      if (slotsNumberLocalized[i].includes('_')) {
        slotsNumberLocalized[i].replace("_", "-");

      }

      if (json[i].primary_attr == 'str') {

        let slotId = null;

        urlImg = url + json[i].img

        let div = document.createElement('div');
        let img = document.createElement('img');

        div.setAttribute('data', `${i}`);

        img.src = urlImg;
        localName = json[i].localized_name.toLowerCase().replace(' ', '')
        div.className = `choose-hero-modal__item ${localName}`;


        strong.append(div)

        div.append(img)



        heroSelectStarted.listen((id) => {

          slotId = id;

        });
        heroSelectStartedBot.listen((id) => {

          slotId = id;

        });

        div.onclick = function () {



          if (slotId >= 5) {
            heroSelectedBot(img.src, slotId, div.getAttribute('data'));

          }
          else {

            heroSelected(img.src, slotId, div.getAttribute('data'));
          }




          let dirtyName = div.className;
          let clearName = dirtyName.replace('choose-hero-modal__item ', '');
          let divImg = div.children;

          // topPanel.style.backgroundImage = `url(${divImg[0].src})`;
          // topPanel.innerHTML = '';
          // console.log(topPanel)

          search.value = ''




          document.querySelectorAll('.choose-hero-modal__item').forEach(element => {


            element.style.display = 'inline-block';


          })

          modal.style.display = 'none';


        };
      }
      else if (json[i].primary_attr == 'agi') {

        let slotId = null;

        urlImg = url + json[i].img

        let div = document.createElement('div');
        let img = document.createElement('img');

        div.setAttribute('data', `${i}`);

        img.src = urlImg;
        localName = json[i].localized_name.toLowerCase().replace(' ', '')
        div.className = `choose-hero-modal__item ${localName}`;


        agility.append(div)

        div.append(img)



        heroSelectStarted.listen((id) => {

          slotId = id;

        });
        heroSelectStartedBot.listen((id) => {

          slotId = id;

        });

        div.onclick = function () {



          if (slotId >= 5) {
            heroSelectedBot(img.src, slotId, div.getAttribute('data'));

          }
          else {

            heroSelected(img.src, slotId, div.getAttribute('data'));
          }




          let dirtyName = div.className;
          let clearName = dirtyName.replace('choose-hero-modal__item ', '');
          let divImg = div.children;

          // topPanel.style.backgroundImage = `url(${divImg[0].src})`;
          // topPanel.innerHTML = '';
          // console.log(topPanel)

          search.value = ''
          document.querySelectorAll('.choose-hero-modal__item').forEach(element => {


            element.style.display = 'inline-block';


          })

          modal.style.display = 'none';


        };

      }
      else if (json[i].primary_attr == 'int') {
        let slotId = null;
        let slotIdBot = null;

        urlImg = url + json[i].img

        let div = document.createElement('div');
        let img = document.createElement('img');

        div.setAttribute('data', `${i}`);

        img.src = urlImg;
        localName = json[i].localized_name.toLowerCase().replace(' ', '')
        div.className = `choose-hero-modal__item ${localName}`;


        magick.append(div)

        div.append(img)



        heroSelectStarted.listen((id) => {

          slotId = id;

        });
        heroSelectStartedBot.listen((id) => {

          slotId = id;

        });

        div.onclick = function () {


          if (slotId >= 5) {
            heroSelectedBot(img.src, slotId, div.getAttribute('data'));
          }
          else {
            heroSelected(img.src, slotId, div.getAttribute('data'));
          }





          let dirtyName = div.className;
          let clearName = dirtyName.replace('choose-hero-modal__item ', '');
          let divImg = div.children;

          // topPanel.style.backgroundImage = `url(${divImg[0].src})`;
          // topPanel.innerHTML = '';
          // console.log(topPanel)


          search.value = ''
          document.querySelectorAll('.choose-hero-modal__item').forEach(element => {


            element.style.display = 'inline-block';


          })
          modal.style.display = 'none';


        };
      }

    }



  });



// top ------------------------------------------------------

pickPanelsTop.forEach((topPanel, index) => {
  topPanel.addEventListener('click', (e) => {
    // console.log(index)
    modal.style.display = 'block';
    searchPanel.focus()




    // відбулася подія - hero selected started -----------------------------
    heroSelectStarted(index);






    heroSelected.listen((hero, id, cls) => {



      pickPanelsTop[id].style.backgroundImage = `url(${hero})`
      topPanel.innerHTML = '';

      // first team 
      if (id == 0) {
        firstPick = slotsNumber[cls]

      }
      else if (id == 1) {
        secondPick = slotsNumber[cls]


      }
      else if (id == 2) {
        thirdPick = slotsNumber[cls]

      }

      else if (id == 3) {
        fouthPick = slotsNumber[cls]

      }
      else if (id == 4) {
        fivePick = slotsNumber[cls]
      }




      if (firstPick != 0 && secondPick != 0 && thirdPick != 0 && fouthPick != 0 && fivePick != 0 && sixPick != 0 && sevenPick != 0 && eithPick != 0 && ninePick != 0 && teenPick != 0) {
        startParse(firstPick, secondPick, thirdPick, fouthPick, fivePick, sixPick, sevenPick, eithPick, ninePick, teenPick);
      }




    });






  });






  // topPanel.style.backgroundColor = 'red';







});
// });





// bottom --------------------------------------------------------------

pickPanelsBot.forEach((topPanel, index) => {
  topPanel.addEventListener('click', (e) => {
    // console.log(index)
    modal.style.display = 'block';
    searchPanel.focus()





    // відбулася подія - hero selected started -----------------------------
    heroSelectStartedBot(index + 5);






    heroSelectedBot.listen((hero, id, cls) => {


      pickPanelsBot[id - 5].style.backgroundImage = `url(${hero})`
      topPanel.innerHTML = '';




      // second team 

      if (id == 5) {
        sixPick = slotsNumber[cls]


      }

      else if (id == 6) {
        sevenPick = slotsNumber[cls]


      }
      else if (id == 7) {
        eithPick = slotsNumber[cls]


      }
      else if (id == 8) {
        ninePick = slotsNumber[cls]

      }

      else if (id == 9) {
        teenPick = slotsNumber[cls]

      }

      if (firstPick != 0 && secondPick != 0 && thirdPick != 0 && fouthPick != 0 && fivePick != 0 && sixPick != 0 && sevenPick != 0 && eithPick != 0 && ninePick != 0 && teenPick != 0) {
        startParse(firstPick, secondPick, thirdPick, fouthPick, fivePick, sixPick, sevenPick, eithPick, ninePick, teenPick);
      }
      else {

      }



    });






  });




  // topPanel.style.backgroundColor = 'red';







});


searchPanel.oninput = function () {


  document.querySelectorAll('.choose-hero-modal__item').forEach(element => {
    element.style.display = 'none';
    let hi

    if (element.classList.length > 1) {
      hi = element.classList[1]
    }

    if (search.value == '') {

      element.style.display = 'inline-block';

    }
    else {

      //gg
      // if (hi.search(search.value) != -1) {
      //   element.style.display = 'inline-block';
      // }
      if (hi.search(search.value) == 0) {

        element.style.display = 'inline-block';
      }

    }
  })


}


