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
        <script>
        var connection = new WebSocket('wss://'+window.location.host+':8080');

        connection.onopen = function () {
          console.error(arguments);
        };
      
        connection.onerror = function (error) {
          console.error(arguments);
        };
      
        connection.onmessage = function (message) {
          // try to decode json (I assume that each message
          // from server is json)
          try {
            var json = JSON.parse(message.data);
            var elem = document.createElement("p");
            elem.innerText = json.text + json.time;
            document.querySelector("#messages").appendChild(elem);
          } catch (e) {
            console.log('This does not look like a valid JSON: '+            message.data);
            return;
          }
          // handle incoming message
        };
        </script>
    </head>
    <body>
    <div>
    <div>App Loaded: ${iEntries}</div>
      <form name="publish">
        <input type="text" name="message">
        <input type="submit" value="Send">
      </form>
    
      <!-- div with messages -->
      <div id="messages"></div>

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
