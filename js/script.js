$('document').ready(() => {

    //code to load the particle layer
    particlesJS.load('particles-js', 'assets/particles.json', function () {
        console.log('callback - particles.js config loaded');
    });

    let state = ''
    let winner = ''
    let tr1 = [], tr2 = [], tr3 = [], col1 = [], col2 = [], col3 = []
    let rows = [tr1, tr2, tr3]
    let columns = [col1, col2, col3]

    //code to disabling the softkeyboard in mobiles
    $('input').attr('readonly','readonly');

    //code for input boxes border color

    let focused;

    $("input").on({
        focus: function () {

            focused = document.activeElement;

            $(this).css({
                "border-width": "thick",
                "border-style": "outset",
                "border-color": "gray",
                "border-radius": "10px",
            })
        },
        blur: function () {
            $(this).css({
                "border-width": "",
                "border-style": "",
                "border-color": "",
                "border-radius": "",
            })
        }
    })

    $("#turnBox1").click(()=>{
        fillBoxes("X")
    })

    $("#turnBox2").click(()=>{
        fillBoxes("O")
    })

    function fillBoxes(param){
        if(focused != undefined){
            if(!focused.value){
                $(focused).val(param)
                $(focused).trigger('input')
            }
        }
    }

    function turnXdisable() {
        $('#turnBox1').css({
            'opacity': '0.5',
            'box-shadow': '0px 0px'
        })
    }

    function turnXenable() {
        $('#turnBox1').css({
            'opacity': '1',
            'box-shadow': '0px 0px 20px #888888'
        })
    }

    function turnOdisable() {
        $('#turnBox2').css({
            'opacity': '0.5',
            'box-shadow': '0px 0px'
        })
    }

    function turnOenable() {
        $('#turnBox2').css({
            'opacity': '1',
            'box-shadow': '0px 0px 20px #888888'
        })
    }

    function success(arr) {

        if (arr[0] == arr[1] && arr[1] == arr[2] && arr[0] != undefined) {
            winner = arr[0]
            return true
        }
        else {
            return false
        }
    }

    function close(text) {
        
        let closeText = ""

        if(text == "won"){
            closeText = `Player - ${winner} WINS\n ------\n "Success!"`
        }else if(text == "draw"){
            closeText = `"Game Drawn!"\n-------\n`
        }

        Swal({
            title: closeText,
            animation: false,
            customClass: 'animated tada',
            width: 600,
            padding: '3em',
            backdrop: `
              rgba(0,0,123,0.4)
              url("js/images/nyan-cat.gif")
              repeat
            `
        }).then((e) => {
            if (e) {
                location.reload()
            }
        })
    }

    $('input').on('input', (e) => {

        let letter = e.target.value
        let id = e.target.id
        let clas = $(e.target).attr('class')

        if ((letter == 'X' || letter == 'O') && (state !== letter)) {

            if (id == 'tr1') tr1.push(letter)
            else if (id == 'tr2') tr2.push(letter)
            else if (id == 'tr3') tr3.push(letter)

            if (clas == 'col1') col1.push(letter)
            else if (clas == 'col2') col2.push(letter)
            else if (clas == 'col3') col3.push(letter)

            $('#' + id + '.' + clas).prop('disabled', true)
            if (letter == 'X') {

                turnXdisable()
                turnOenable()
                state = 'X'

            } else if (letter == 'O') {

                turnOdisable()
                turnXenable()
                state = 'O'
            }

            let x1 = $('#tr1.col1').val()
            let x2 = $('#tr2.col2').val()
            let x3 = $('#tr3.col3').val()

            let y1 = $('#tr1.col3').val()
            let y3 = $('#tr3.col1').val()

            let successFlag = 0

            if ((x1 == x2 && x2 == x3) && (x1 != '')) {

                $('#tr1.col1').css('color', 'green')
                $('#tr2.col2').css('color', 'green')
                $('#tr3.col3').css('color', 'green')

                winner = x1
                successFlag = 1
                close("won")
            } else if ((y1 == x2 && x2 == y3) && (y1 != '')) {

                $('#tr1.col3').css('color', 'green')
                $('#tr2.col2').css('color', 'green')
                $('#tr3.col1').css('color', 'green')

                winner = y1
                successFlag = 1
                close("won")
            }

            let i = 0

            for (i = 0; i < rows.length; i++) {

                if (success(rows[i])) {

                    if (i == 0) {

                        $('#tr1.col1').css('color', 'green')
                        $('#tr1.col2').css('color', 'green')
                        $('#tr1.col3').css('color', 'green')
                    } else if (i == 1) {

                        $('#tr2.col1').css('color', 'green')
                        $('#tr2.col2').css('color', 'green')
                        $('#tr2.col3').css('color', 'green')
                    } else if (i == 2) {

                        $('#tr3.col1').css('color', 'green')
                        $('#tr3.col2').css('color', 'green')
                        $('#tr3.col3').css('color', 'green')
                    }

                    successFlag = 1
                    close("won")
                    break
                }
            }

            let j = 0

            for (j = 0; j < columns.length; j++) {

                if (success(columns[j])) {

                    if (j == 0) {

                        $('#tr1.col1').css('color', 'green')
                        $('#tr2.col1').css('color', 'green')
                        $('#tr3.col1').css('color', 'green')
                    } else if (j == 1) {

                        $('#tr1.col2').css('color', 'green')
                        $('#tr2.col2').css('color', 'green')
                        $('#tr3.col2').css('color', 'green')
                    } else if (j == 2) {

                        $('#tr1.col3').css('color', 'green')
                        $('#tr2.col3').css('color', 'green')
                        $('#tr3.col3').css('color', 'green')
                    }

                    successFlag = 1
                    close("won")
                    break
                }
            }

            let rowCount = 0
            rows.forEach(e => {
                if (e.length == 3) rowCount = rowCount + 1
            });

            let columnCount = 0
            columns.forEach(e => {
                if (e.length == 3) columnCount = columnCount + 1
            });

            if (rowCount == 3 && columnCount == 3 && successFlag != 1) {
                close("draw")
            }

        } else {

            $('#' + id + '.' + clas).val('')
        }
    })

})