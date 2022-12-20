/*
    Creator : Anson Cheang
    Contact : Anson0906@gmail.com
    Source : TA, W3schools
    Description : essentially makes the scrabble board
    well a really makeshift one with only 1 row, and a
    single player
*/

//All of the global variable used everywhere
var handsize = 0;
var length = 0;
var wordscore = 0;
var totalscore = 0;
var wordmulti = 1;
var currentword = "";
var pile = [
    { "letter" : "A", "value" : 1,  "original" : 9,  "amount" : 9  },
    { "letter" : "B", "value" : 3,  "original" : 2,  "amount" : 2  },
    { "letter" : "C", "value" : 3,  "original" : 2,  "amount" : 2  },
    { "letter" : "D", "value" : 2,  "original" : 4,  "amount" : 4  },
    { "letter" : "E", "value" : 1,  "original" : 12, "amount" : 12 },
    { "letter" : "F", "value" : 4,  "original" : 2,  "amount" : 2  },
    { "letter" : "G", "value" : 2,  "original" : 3,  "amount" : 3  },
    { "letter" : "H", "value" : 4,  "original" : 2,  "amount" : 2  },
    { "letter" : "I", "value" : 1,  "original" : 9,  "amount" : 9  },
    { "letter" : "J", "value" : 8,  "original" : 1,  "amount" : 1  },
    { "letter" : "K", "value" : 5,  "original" : 1,  "amount" : 1  },
    { "letter" : "L", "value" : 1,  "original" : 4,  "amount" : 4  },
    { "letter" : "M", "value" : 3,  "original" : 2,  "amount" : 2  },
    { "letter" : "N", "value" : 1,  "original" : 6,  "amount" : 6  },
    { "letter" : "O", "value" : 1,  "original" : 8,  "amount" : 8  },
    { "letter" : "P", "value" : 3,  "original" : 2,  "amount" : 2  },
    { "letter" : "Q", "value" : 10, "original" : 1,  "amount" : 1  },
    { "letter" : "R", "value" : 1,  "original" : 6,  "amount" : 6  },
    { "letter" : "S", "value" : 1,  "original" : 4,  "amount" : 4  },
    { "letter" : "T", "value" : 1,  "original" : 6,  "amount" : 6  },
    { "letter" : "U", "value" : 1,  "original" : 4,  "amount" : 4  },
    { "letter" : "V", "value" : 4,  "original" : 2,  "amount" : 2  },
    { "letter" : "W", "value" : 4,  "original" : 2,  "amount" : 2  },
    { "letter" : "X", "value" : 8,  "original" : 1,  "amount" : 1  },
    { "letter" : "Y", "value" : 4,  "original" : 2,  "amount" : 2  },
    { "letter" : "Z", "value" : 10, "original" : 1,  "amount" : 1  },
    { "letter" : "_", "value" : 0,  "original" : 2,  "amount" : 2  }]

//initial setup of the board
$(document).ready(function() {
    var total;
    var random;
    var pieceletter;
    var piececlass;
    var pieceid;
    var a = document.getElementsByClassName("tilepiece").length;
    $(".amountleft").append("<p id = \"leftover\">" + 93 + "</p");          //basic information
    $(".currentword").append("<p id = \"cw\">" + currentword + "</p");
    $(".Wscore").append("<p id = \"ws\">" + wordscore + "</p");
    $(".Tscore").append("<p id = \"ts\">" + totalscore + "</p");
    for(var i = a; i < 7; i++)
    {
        total = 0;
        for(var j = 0; j < 27; j++)                                         //total amount of tiles in the bag
        {
            total = total + pile[j].amount;
        }
        random = Math.floor(Math.random() * total);                         //randomize, then choose the letter
        var k = -1;
        while(random >= 0)
        {
            k++;
            random = random - pile[k].amount;
        }
        pile[k].amount = pile[k].amount - 1;
        pieceletter = pile[k].letter;
        piececlass = "tile" + pieceletter;
        if(pieceletter == "_")
        {
            pieceletter = "Blank"
        }
        pieceid = "tilepiece" + pieceletter + pile[k].amount;               //add that letter to the rack

        $("#pieces").append("<img id = \"" + pieceid + "\" class = \"onrack tilepiece " + piececlass + "\" src = \"../graphics_data/graphics_data/Scrabble_Tiles/Scrabble_Tile_" + pieceletter + ".jpg\" alt = \"" + pieceletter + "\">")
        pieceid = "#" + pieceid;
        $(pieceid).draggable({                                              //make each tile draggable
            revert: "invalid"                                               //make it so its draggable in certain location
        });
        handsize = handsize + 1;
    }
    $("#rack").droppable({                                                  //make rack droppable
        drop: function(event, ui) {
            var dragid = ui.draggable.attr("id");                           //getting information
            var list;
            var dragclass = ui.draggable.attr("class");
            $("#" + dragid).remove();
            dragid = dragclass.split(' ')[2];
            var letter = dragid.charAt(4);
            //alert(letter);
            var amount;
            amount = Math.floor(Math.random() * 100);                       //append to it
            
            $("#pieces").append("<img id = \"tilepiece" + letter + amount + "\" class = \"onrack tilepiece tile" + letter + "\" src = \"../graphics_data/graphics_data/Scrabble_Tiles/Scrabble_Tile_" + letter + ".jpg\" alt = \"" + letter + "\">")
            $("#tilepiece" + letter + amount).draggable({
                revert: "invalid"
            });


            if(length > 0)
            {
                $("#cw").remove();                                         //workon information
                $("#ws").remove();
                handsize = handsize + 1;
                length = length - 1;
                var classname = dragclass.split(' ')[3];
                var slotid = document.getElementById(classname);
                var bonuscheck = slotid.className.split(' ')[0];
                //alert(classname);
                $("#" + classname).removeClass(letter);                             //change class, and disable droppable
                $("#" + classname).droppable( "option", "disabled", false );
                var numstring = '';
                var num;
                var bool = true;
                currentword = "";
                for(var i = 1; i < classname.length; i++)                           //get the number of the slot
                {
                    numstring = numstring + classname[i];
                }
                num = Number(numstring);
                if (length == 0){                                                   //for when the there is no more tiles on the board
                    for(var i = 1; i <= 15; i++)
                    {
                        n = "n"
                        n = n + i;
                        list = document.getElementById(n)
                        $("#" + n).droppable("option", "disabled", false);
                        if(list.classList.contains("empty"))
                        {
                            $("#" + n).removeClass("empty");
                        }
                    }
                    wordscore = 0;
                    wordmulti = 1;
                    currentword = "";
                }
                else   
                {                                                                   //tile placed position
                    n = "n" + num;
                    list = document.getElementById(n);                              //scoring
                    for(var j = 0; j < 27; j++){
                        if(pile[j].letter == letter)
                        {
                            if(bonuscheck == "DLS")
                            {
                                wordscore = wordscore - (pile[j].value * 2);
                            }
                            else if(bonuscheck == "DWS")
                            {
                                wordmulti = wordmulti / 2;
                                wordscore = wordscore - pile[j].value;
                            }
                            else
                            {
                                wordscore = wordscore - pile[j].value;
                            }
                        }
                    }
                    if(num < 15)
                    {
                        num = num + 1;                                                  // make sure the slot to the right is not droppable(if its not filled)
                        n = "n" + num;                                                  // if filled make the tile draggable
                        list = document.getElementById(n);
                        if(!list.classList.contains('empty'))
                        {
                            n = "#" + n
                            $(n).droppable("option", "disabled", true);
                            for(var j = 0; j < 27; j++){
                                if(list.classList.contains(pile[j].letter))
                                {
                                    $("#tileslot" + num).draggable("enable");
                                    bool = false;
                                }
                            }
                            if(bool)
                            {
                                $(n).addClass("empty");
                            }
                        }
                    }
                    bool = true;
                    num = num - 2;
                    if(num > 0)                                                         //same as last time but to the left
                    {
                        bool = true;
                        num = num - 2;
                        n = "n" + num;
                        list = document.getElementById(n);
                        if(!list.classList.contains('empty'))
                        {
                            n = "#" + n
                            $(n).droppable("option", "disabled", true);
                            for(var j = 0; j < 27; j++){
                                if(list.classList.contains(pile[j].letter))
                                {
                                    $("#tileslot" + num).draggable("enable");
                                    bool = false;
                                }
                            }
                            if(bool)
                            {
                                $(n).addClass("empty");
                            }
                        }
                    }
                    for(var j = 1; j <= 15; j++)                                  //update the word
                    {
                        n = "n" + j;
                        list = document.getElementById(n);
                        for(var k = 0; k < 27; k++)
                        {
                            if(list.classList.contains(pile[k].letter))
                            {
                                currentword = currentword + pile[k].letter;
                            }
                        }
                    }
                }
                $(".Wscore").append("<p id = \"ws\">" + wordscore * wordmulti + "</p");                   //update everything
                $(".currentword").append("<p id = \"cw\">" + currentword + "</p");
            }
        }
    });
    
    $(".nl").droppable({                                                                            //makes the table droppable
        drop: function(event, ui) {
            $("#cw").remove();
            $("#ws").remove();
            handsize = handsize - 1;                                                                //info
            length = length + 1;
            var list;
            var child;
            var dragid = ui.draggable.attr("id");
            var dragclass = $(this).attr("class");
            var bonuscheck = dragclass.split(' ')[0];
            var letter = dragid.charAt(9);
            var n;
            var lp;
            var l = $(this).attr('id');
            $("#" + dragid).remove();
            $("#" + l).droppable( "option", "disabled", true );
            var numstring = '';
            var num;
            for(var i = 1; i < l.length; i++)
            {
                numstring = numstring + l[i];
            }
            $(this).addClass(letter)
            num = Number(numstring);                                                                //append to specified table slot
            $("#" + l).append("<img id = \"tileslot" + num + "\" class = \"onboard tilepiece tile" + letter + " " + l +"\" src = \"../graphics_data/graphics_data/Scrabble_Tiles/Scrabble_Tile_" + letter + ".jpg\" alt = \"" + letter + "\">")
            $("#tileslot" + num).draggable({
                revert: "invalid",
            });
            if (length == 1){                                                                   //make sure the player can only drag to the
                currentword = letter;                                                           //left or the right of the letter
                for(var i = 1; i <= 15; i++)
                {
                    n = "#n"
                    if(i != num - 1 && i != num && i != num + 1)
                    {
                        n = n + i;
                        $(n).droppable("option", "disabled", true);
                        $(n).addClass("empty");
                    }
                }
            }
            else
            {
                num = num + 1;                                                                  //same as the rack except opisite
                n = "n" + num;                                                                  //also updates the word
                list = document.getElementById(n);
                if(list.classList.contains('empty'))
                {
                    n = "#" + n
                    $(n).droppable("option", "disabled", false);
                    $(n).removeClass("empty");
                    currentword = currentword + letter;
                }
                else if(length > 2)
                {
                    lp = "tileslot" + num;
                    $("#" + lp).draggable("disable");
                }
                num = num - 2;
                n = "n" + num;
                list = document.getElementById(n);
                if(list.classList.contains('empty'))
                {
                    n = "#" + n
                    $(n).droppable("option", "disabled", false);
                    $(n).removeClass("empty");
                    currentword = letter + currentword;
                }
                else if(length > 2)
                {
                    lp = "tileslot" + num;
                    $("#" + lp).draggable("disable");
                }
            }
            for(var i = 0; i < 27; i++)                                                                  //update word score
            {
                if(pile[i].letter == letter)
                {
                    if(bonuscheck == "DLS")
                    {
                        wordscore = wordscore + (pile[i].value * 2);
                    }
                    else if(bonuscheck == "DWS")
                    {
                        wordmulti = wordmulti * 2;
                        wordscore = wordscore + pile[i].value;
                    }
                    else
                    {
                        wordscore = wordscore + pile[i].value;
                    }
                }
            }
            $(".currentword").append("<p id = \"cw\">" + currentword + "</p");
            $(".Wscore").append("<p id = \"ws\">" + wordscore * wordmulti + "</p");
        }
    });
});

function next(){
    var total = 0;
    var random;
    var pieceletter;
    var piececlass;
    var pieceid;
    var n;
    if(length < 2)                                                                          //makes sure the thing is 2 letters long
    {
        alert("Word needs to be two letters long");
    }
    else
    {
        $(".onboard").remove();                                                             //clear the board
        for(var i = 1; i <= 15; i++)                                                        //make every slot droppable again
        {
            n = "n"
            n = n + i;
            list = document.getElementById(n)
            $("#" + n).droppable("option", "disabled", false);
            if(list.classList.contains("empty"))
            {
                $("#" + n).removeClass("empty");
            }
            for(var j = 0; j < 27; j++)
            {
                if(list.classList.contains(pile[j].letter))
                {
                    $("#" + n).removeClass(pile[j].letter);
                }
            }
        }
        totalscore = totalscore + wordscore * wordmulti;                                    //update game information
        wordscore = 0;
        currentword = "";
        wordmulti = 1;
        length = 0;
        $("#leftover").remove();
        $("#cw").remove();
        $("#ws").remove();
        $("#ts").remove();
        for(var i = handsize; i < 7; i++)                                                   //redraw upto hand size of 7
        {
            total = 0;
            for(var j = 0; j < 27; j++)
            {
                total = total + pile[j].amount;
            }
            random = Math.floor(Math.random() * total);
            var k = -1;
            while(random >= 0)
            {
                k++;
                random = random - pile[k].amount;
            }
            pile[k].amount = pile[k].amount - 1;
            pieceletter = pile[k].letter;
            if(pieceletter == "_")
            {
                pieceletter = "Blank"
            }

            piececlass = "tile" + pieceletter;
            pieceid = "tilepiece" + pieceletter + i;

            $("#pieces").append("<img id = \"" + pieceid + "\" class = \"tilepiece " + piececlass + "\" src = \"../graphics_data/graphics_data/Scrabble_Tiles/Scrabble_Tile_" + pieceletter + ".jpg\" alt = \"" + pieceletter + "\">")
            pieceid = "#" + pieceid;
            $(pieceid).draggable({
                revert: "invalid",
            });
            handsize = handsize + 1;
        }
        total = 0;
        for(var j = 0; j < 27; j++)
        {
            total = total + pile[j].amount;
        }
        $(".amountleft").append("<p id = \"leftover\">" + total + "</p");                //print info
        $(".Wscore").append("<p id = \"ws\">" + wordscore + "</p");
        $(".Tscore").append("<p id = \"ts\">" + totalscore + "</p");
        $(".currentword").append("<p id = \"cw\">" + currentword + "</p");
    }
}

function reset(){
    var total;
    var random;
    var pieceletter;
    var piececlass;
    var pieceid;
    var n;
    $(".onboard").remove();                                                            //clear board
    for(var i = 1; i <= 15; i++)                                                        //make every slot droppable
    {
        n = "n"
        n = n + i;
        list = document.getElementById(n)
        $("#" + n).droppable("option", "disabled", false);
        if(list.classList.contains("empty"))
        {
            $("#" + n).removeClass("empty");
        }
        for(var j = 0; j < 27; j++)
        {
            if(list.classList.contains(pile[j].letter))
            {
                $("#" + n).removeClass(pile[j].letter);
            }
        }
    }
    handsize = 0;                                                                   //reset info
    document.getElementById("pieces").innerHTML = '';
    $("#leftover").remove();
    $("#cw").remove();
    $("#ws").remove();
    $("#ts").remove();
    currentword = "";
    wordscore = 0;
    totalscore = 0;
    wordmulti = 1;
    length = 0;
    $(".amountleft").append("<p id = \"leftover\">" + 93 + "</p");
    $(".currentword").append("<p id = \"cw\">" + currentword + "</p");
    $(".Wscore").append("<p id = \"ws\">" + wordscore + "</p");
    $(".Tscore").append("<p id = \"ts\">" + totalscore + "</p");
    //var a = document.getElementsByClassName("tilepiece").length;
    for(var p = 0; p < 27; p++)                                                     //reset amount back to original
    {
        pile[p].amount = pile[p].original;
    }
    for(var i = 0; i < 7; i++)
    {                                                                               //redraw your entire hand
        total = 0;
        for(var j = 0; j < 27; j++)
        {
            total = total + pile[j].amount;
        }
        random = Math.floor(Math.random() * total);
        var k = -1;
        while(random >= 0)
        {
            k++;
            random = random - pile[k].amount;
        }
        pile[k].amount = pile[k].amount - 1;
        pieceletter = pile[k].letter;
        if(pieceletter == "_")
        {
            pieceletter = "Blank"
        }

        piececlass = "tile" + pieceletter;
        pieceid = "tilepiece" + pieceletter + i;

        $("#pieces").append("<img id = \"" + pieceid + "\" class = \"tilepiece " + piececlass + "\" src = \"../graphics_data/graphics_data/Scrabble_Tiles/Scrabble_Tile_" + pieceletter + ".jpg\" alt = \"" + pieceletter + "\">")
        pieceid = "#" + pieceid;
        $(pieceid).draggable({
            revert: "invalid",
        });
        handsize = handsize + 1;
    }
}