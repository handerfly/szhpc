 function get_storage_table() {
   $.ajax({
           type:"POST",
           url:"/status/storage_table",
           dataType:'json',
            beforeSend:function(XMLHttpRequest){
              $('#container').html("<img src='/static/img/timg.gif' />");
            },
            success:function(data){
                    // 图表配置
                $('#storage1 table tbody').html("")
                for(var each_data in data.list){
                    var uid        = data.list[each_data].uid;
                    var username  = data.list[each_data].username;
                    var softbytes = (data.list[each_data].softbytes/1024/1024/1024/1024).toFixed(2);
                    var hardbytes = (data.list[each_data].hardbytes/1024/1024/1024/1024).toFixed(2);
                    var realbytes = (data.list[each_data].realbytes/1024/1024/1024/1024).toFixed(2);
                    var realinodes = data.list[each_data].realinodes
                    var softinodes = data.list[each_data].softinodes
                    var hardinodes = data.list[each_data].hardinodes
                    var grace = data.list[each_data].grace
                    var freebytes = (hardbytes - realbytes).toFixed(2)
                    var prealbytes = (realbytes/hardbytes).toFixed(2)*100

                   $('#storage1 table tbody').append("<tr>"+
                                                "<td>"+username+"</td>"+
                                                "<td>"+uid+"</td>"+
                                                "<td>"+realbytes+" TB</td>"+
                                                "<td>"+freebytes+" TB</td>"+
                                                "<td>"+prealbytes+"%</td>"+
                                                "<td>"+realinodes+"</td>"+
                                                "<td>"+softbytes+" TB</td>"+
                                                "<td>"+hardbytes+" TB</td>"+
                                                "</tr>")

                }



            }
       })

}



