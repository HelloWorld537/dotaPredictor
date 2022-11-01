const puppeteer = require('puppeteer');



let hi;

arrOfValues = []
arrOfNames = []
let allyReq = []
let enemyReq = []
let tempp;

async function start(ally, enemy) {





    for (let i = 0; i < ally.length; i++) {


        let temp = ally[i]

        if (temp.includes(' ')) {
            tempp = temp.replace(' ', '-')


        }
        else {
            tempp = temp
        }




        allyReq.push(tempp.toLowerCase())






    }
    for (let i = 0; i < enemy.length; i++) {


        enemy[i].replace("_", '-')

        enemyReq.push(enemy[i].toLowerCase())



    }




    for (let i = 0; i < 5; i++) {

        const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        const page = await browser.newPage()
        const currentName = ''


        // console.log(allyReq[i] + ' allyreq')



        await page.goto(`https://ru.dotabuff.com/heroes/${allyReq[i]}/counters`)
        // console.log(enemy[i])


        const rows = await page.$$('.sortable tbody tr')


        for (let i = 0; i < rows.length; i++) {

            let row = rows[i];
            let value = await row.$eval(".sorted", e => e.textContent)
            let name = await row.$eval(".cell-xlarge", e => e.textContent)
            for (let i = 0; i <= 5; i++)
                if (name == enemy[i]) {

                    if (value) {
                        hi = value.replace('%', '')
                        arrOfValues.push(hi)








                    }

                }



        }






        // console.log(arrOfNames)
        // console.log(arrOfValues)




        // console.log(percents)


        console.log(allyReq + ' ALLY REQ')



        console.log(arrOfValues + ' arrOfValues')
        await browser.close()


    }





}

module.exports = start