let http = require('http')
let fs = require('fs')


let allyTeam = []
let enemyTeam = []
let res = 0;

const puppeteer = require('puppeteer');



let hi;

arrOfValues = []
arrOfNames = []
let allyReq = []
let enemyReq = []
let tempp;





let start = require('./parse.js')







http.createServer(function (req, res) {





    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST');




    let body = ''
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {


        console.log(body)

        if (req.method == 'GET') {
            if (req.url != '/favicon.ico') {
                console.log('GET')
                console.log(req.url)
                if (req.url.endsWith('.css')) {

                    console.log('CSS')

                    fs.readFile('style.css', (err, data) => {
                        if (!err) {

                            res.setHeader('Content-Type', 'text/css; charset=utf-8');
                            res.write(data)
                            res.end()


                        }
                        else {
                            res.write('<b>404</b>')
                            res.end()

                        }

                    })
                }
                else if (req.url.endsWith('.js')) {

                    console.log('js')

                    fs.readFile('index.js', (err, data) => {
                        if (!err) {

                            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
                            res.write(data)
                            res.end()


                        }
                        else {
                            res.write('<b>404</b>')
                            res.end()

                        }

                    })
                }
                else {


                    fs.readFile('index.html', (err, data) => {
                        if (!err) {
                            console.log('ok')

                            res.write(data)
                            res.end()


                        }
                        else {
                            console.log('not ok')
                            res.write('<b>404</b>')
                            res.end()

                        }



                    })
                }
            }
        }


        if (req.method == 'POST') {
            console.log('POSTTTTTTTT')
            let MassToStr = body.split(',')





            for (let i = 0; i < MassToStr.length; i++) {

                if (i < 5) {

                    enemyTeam.push(MassToStr[i])

                }
                else if (i >= 5 && i < 9) {
                    allyTeam.push(MassToStr[i])
                }
                else {
                    allyTeam.push(MassToStr[i])


                    // console.log(allyTeam + ' allyteam')
                    start(allyTeam, enemyTeam).then(function () {

                        res.write(JSON.stringify(arrOfValues))
                        arrOfValues = []
                        allyReq = []
                        enemyReq = []
                        allyTeam = []
                        enemyTeam = []

                        res.end()


                    })
                }
            }

        }


        // console.log(allyTeam)

        // console.log(MassToStr)



    })

    console.log('server is live')



}).listen(process.env.PORT || 8000);







