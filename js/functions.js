const childProcess = require('child_process');
const psTree = require('ps-tree')


$(function () {
    var ip = "";
    var port = "";
    var cp_client = null;
    var started = false;

    $('#button-start').on('click', function () {
        if(started) {
            return
        }
        started = true
        if(ip == ""){
            $("#std_output-area").html("ipアドレスを入力してください");
        } else if(port == ""){
            $("#std_output-area").html("ポートを入力してください");
        } else {
            //cp_client = childProcess.exec(`./js/src/run_client.sh ${ip} ${port}`, (error, stdout, stderr) => {
            console.log(__dirname)
            cp_client = childProcess.exec(`rec -t raw -b 16 -c 1 -e s -r 44100 - | ` + __dirname + `/js/src/clientsfu ${ip} ${port} | play -t raw -b 16 -c 1 -e s -r 44100 -`, (error, stdout, stderr) => {
                if(error) {
                    $("#std_output-area").html(error);
                    return
                }
            });
            $("#std_output-area").html("接続しました"); //嘘
        }
    });

    const cleanup = () => {
        try {
            psTree(cp_client.pid, (err, children) => {
                console.log(children)
                children.forEach((child) => {
                    process.kill(child.PID)
                })
            })
        } catch(e){

        }
    }
    process.on('SIGINT', cleanup)
    process.on('SIGTERM', cleanup)
    process.on('SIGQUIT', cleanup)
    process.on('uncaughtException', cleanup)
    //app.on('quit', cleanup) 本来はこれをよばないと子プロセスが消えない


    $('#button-dst_info').on('click', function () {
        ip = $("#input-dst_ip").val().toString();
        port = $("#input-dst_port").val().toString();
        $("#dst-info").html(`<span>IP : ${ip != "" ? ip : "***.***.***.***"}</span><span>PORT : ${port != "" ? port : "*****"}</span>`)
    });

    $('#button-stop').on('click', function () {
        if(started == false){
            return
        }
        started = false

        cleanup()
        $("#std_output-area").html("切断しました");
    });
})
