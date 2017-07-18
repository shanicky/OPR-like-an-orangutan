// ==UserScript==
// @name         OPR like an orangutan
// @version      0.23.1
// @description  Just accept, unknown, reject
// @updateURL    https://github.com/RalfZhang/OPR-like-an-orangutan/raw/master/OPR-like-an-orangutan.user.js
// @downloadURL  https://github.com/RalfZhang/OPR-like-an-orangutan/raw/master/OPR-like-an-orangutan.user.js
// @author       ralfz (SBZK)
// @match        https://opr.ingress.com/recon
// @grant        none
// ==/UserScript==


function getRandomIntFunc(min, max) {
    return function() {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

function getNumberFunc(num) {
    return function() { return num }
}

var buttons = [
    {
        button:"Accept",
        total:getNumberFunc(5),
        name:getRandomIntFunc(4,5),
        history:getRandomIntFunc(4,5),
        unique:getRandomIntFunc(4,5),
        location:getRandomIntFunc(4,5),
        safety:getRandomIntFunc(4,5),
        bg:'#0f0'
    },
    {
        button:"Unsure",
        total:getNumberFunc(3),
        name:getRandomIntFunc(2,4),
        history:getRandomIntFunc(2,4),
        unique:getRandomIntFunc(2,4),
        location:getRandomIntFunc(2,4),
        safety:getNumberFunc(2,4),
        bg:'rgb(255,228,0)'
    },
    {
        button:"Reject",
        total:getNumberFunc(1),
        bg:'#f00'
    },
];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////DO NOT EDIT THIS LINE BELOW!
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


function rate_portal(total, name, history, unique, location, safety) {
    var totalValue = total()
    document.querySelector("#AnswersController > form > div:nth-child(1) > div:nth-child(1) > div.btn-group > button:nth-child(" + totalValue + ")").click();
    if(totalValue===1){
        return;
    }
    document.querySelector("#AnswersController > form > div:nth-child(1) > div.col-xs-12.col-sm-4.pull-right.text-center > div:nth-child(5) > button:nth-child(" + name() + ")").click();
    document.querySelector("#AnswersController > form > div:nth-child(1) > div.col-xs-12.col-sm-4.pull-right.text-center > div:nth-child(10) > button:nth-child(" + history() + ")").click();
    document.querySelector("#AnswersController > form > div:nth-child(1) > div.col-xs-12.col-sm-4.pull-right.text-center > div:nth-child(15) > button:nth-child(" + unique() + ")").click();
    document.querySelector("#AnswersController > form > div:nth-child(2) > div:nth-child(1) > div:nth-child(6) > button:nth-child(" + location() + ")").click();
    document.querySelector("#AnswersController > form > div:nth-child(2) > div:nth-child(1) > div:nth-child(11) > button:nth-child(" + safety() + ")").click();
}

function add_button() {
    var button_region = document.querySelector('form[name="answers"] .pull-right');
    button_region.appendChild(document.createElement('br'))
    buttons.forEach(function(button_data) {
        var button = document.createElement("button");
        var textnode = document.createTextNode(button_data["button"]);
        button.appendChild(textnode);
        button.setAttribute('style', 'height: 100px; width: 100px; font-size: 20px; display: inline-block; border: 2px solid #fff; border-radius: 50%; color: #fff; font-weight: 700; margin: 30px 10px;');
        button.style.background = button_data.bg || '#888';
        button_region.appendChild(button);
        button.onclick = function(){
            rate_portal(button_data["total"], button_data["name"], button_data["history"], button_data["unique"], button_data["location"], button_data["safety"]);
            if(button_data.total!==1) {
                document.querySelector('#submitDiv>button').click();
                return;
            }
            document.querySelector('.modal-med .modal-content div.text-center button:nth-child(2)').click()
        };
    });
}


(function() {
    add_button();
})();
