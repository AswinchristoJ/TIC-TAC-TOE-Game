$('document').ready(() => {

    let state = ''
    let tr1 = [], tr2 = [], tr3 = [], col1 = [], col2 = [], col3 = []
    let rows = [tr1, tr2, tr3]
    let columns = [col1, col2, col3]

    turnXdisable()
    turnOdisable()

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

        if (arr[0] == arr[1] && arr[1] == arr[2] && arr[0] != undefined)
            return true
        else
            return false
    }

    function close() {
        let flag1 = swal('GAME OVER','------',"success")
        flag1.then((e)=>{
            if(e){
                location.reload()
            }
        })
    }

    function drawclose(){
        let flag2 = swal('THE GAME DRAWN','-------',"info")
        flag2.then((e)=>{
            if(e){
                location.reload()
            }
        })
    }

    $('input').on('input', (e) => {

        let letter = e.target.value
        let id = e.target.id
        let clas = $(e.target).attr('class')

        if ((letter == 'x' || letter == 'o') && (state !== letter)) {

            if (id == 'tr1') tr1.push(letter)
            else if (id == 'tr2') tr2.push(letter)
            else if (id == 'tr3') tr3.push(letter)

            if (clas == 'col1') col1.push(letter)
            else if (clas == 'col2') col2.push(letter)
            else if (clas == 'col3') col3.push(letter)

            $('#' + id + '.' + clas).prop('disabled', true)
            if (letter == 'x') {

                turnXdisable()
                turnOenable()
                state = 'x'

            } else if (letter == 'o') {

                turnOdisable()
                turnXenable()
                state = 'o'
            }

            let x1 = $('#tr1.col1').val()
            let x2 = $('#tr2.col2').val()
            let x3 = $('#tr3.col3').val()

            let y1 = $('#tr1.col3').val()
            let y3 = $('#tr3.col1').val()

            let successFlag = 0

            if((x1 == x2 && x2 == x3) && (x1 != '')){

                $('#tr1.col1').css('color','green')
                $('#tr2.col2').css('color','green')
                $('#tr3.col3').css('color','green')

                successFlag = 1
                setTimeout(close, 0)
            }else if((y1 == x2 && x2 == y3) && (y1 != '')){

                $('#tr1.col3').css('color','green')
                $('#tr2.col2').css('color','green')
                $('#tr3.col1').css('color','green')

                successFlag = 1
                setTimeout(close, 0)
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
                    setTimeout(close, 0)
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
                    setTimeout(close, 0)
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
                setTimeout(drawclose, 0)
            }

        } else {

            $('#' + id + '.' + clas).val('')
        }
    })

})