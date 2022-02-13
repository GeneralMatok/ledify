const db = require("./db.js");

const getCSS = () => {

    return `
    @font-face {
        font-family: 'digital-7';
        src: url('../fonts/digital-7.ttf');
      }
      
      body {
        color: #ffffff;
        background-color: #000000;
        font-family: 'digital-7', sans-serif;
      }
      
      /* DAYS OF THE WEEK */
      
      div.days {
        margin: 0 auto;
        color: #131212;
      }
      
      div.days .day { display: inline-block; }
      
      div.days .day p {
        font-size: 12px;
        font-weight: bold;
        font-family: sans-serif;
        text-transform: uppercase;
      }
      
      /* CLOCK */
      
      div.clock { margin: 5px 0; }
      
      div.clock div {
        display: inline-block;
        position: relative;
      }
      
      div.clock div p {
        font-size: 100px;
        position: relative;
        z-index: 100;
      }
      
      div.clock .placeholder {
        color: #131212;
        position: absolute;
        top: 0;
        z-index: 50;
      }
      
      div.clock .meridian { margin-left: 15px; }/*END CLOCK*/
      
      /* AM OR PM*/
      
      .am-pm {
        font-family: sans-serif;
        text-transform: uppercase;
        width: 20px;
      }
      
      div.am-pm div p {
        font-size: 12px;
        font-weight: bold;
        width: 100%;
      }
      
      .am, .pm { color: #131212; }
      
      /*CLASS THAT CHANGES COLOR OF TEXT TO APPEAR LIKE ITS "ON"*/
      
      .light-on { color: #ffffff; }


      .fullDays {
       color: #03DAC6
      }

      .fullDays.am {
        #03DAC6
      }

      .workingDays {
        color: #018786
       }
 
      .workingDays.pm {
         #018786
      }
      `
}

const getHTML = async (oVal) => {
    const iEntries = await db.getEntries();
    const iFullDays = oVal.fullDays,
        iWorkingDays = oVal.workdaysLeftExcluding;
    return `
    <html>
    <head>
        <style>
            ${getCSS()}
        </style>
    </head>
    <body>
    <div>
    <div>App Loaded: ${iEntries}</div>
        <div class="clock">
            <!-- HOUR -->
            <div class="numbers">
                <p class="fullDays">${iFullDays}</p>
                <p class="placeholder"></p>
            </div>
        
            <div class="colon">
                <p>/</p>
            </div>
        
            <!-- MINUTE -->
            <div class="numbers">
                <p class="workingDays">${iWorkingDays}</p>
                <p class="placeholder"></p>
            </div>
        
            <!-- AM / PM -->
            <div class="am-pm">
        
            <!-- AM -->
            <div class="">
                <p class="fullDays am">fulldays</p>
            </div>
        
            <!-- PM -->
            <div>
                <p class="workingDays pm">working days</p>
            </div>
        </div>
    </div>
    </body>
    </html>
    `
};


module.exports = {
    getHTML: getHTML
}
