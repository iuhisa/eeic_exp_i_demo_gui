const childProcess = require('child_process');


$(function () {
    var ip = "";
    var port = "";
    $('#button-start').on('click', function () {
        if(ip == ""){
            $("#std_output-area").html("ipアドレスを入力してください");
        } else if(port == ""){
            $("#std_output-area").html("ポートを入力してください");
        } else {
            childProcess.exec('ls', (error, stdout, stderr) => {
                if(error) return console.error('ERROR', error);
                $("#std_output-area").html(stdout);
            });
        }
    });

    $('#button-dst_info').on('click', function () {
        ip = $("#input-dst_ip").val().toString();
        port = $("#input-dst_port").val().toString();
        console.log(ip)
        $("#dst-info").html(`<span>IP : ${ip != "" ? ip : "***.***.***.***"}</span><span>PORT : ${port != "" ? port : "*****"}</span>`)
    });

    $('#button-stop').on('click', function () {
        if(ip == ""){
            $("#std_output-area").html("ipアドレスを入力してください");
        } else if(port == ""){
            $("#std_output-area").html("ポートを入力してください");
        } else {
            childProcess.exec('ls', (error, stdout, stderr) => {
                if(error) return console.error('ERROR', error);
                $("#std_output-area").html(stdout);
            });
        }
    });
})
