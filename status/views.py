from django.shortcuts import render
from django.http import  JsonResponse
from django.db import connections
from django.http import HttpResponse
from .models import Quota,Quota_user,cluster_cpu_history, cluster_memory_history,queue_alloc
from django.core import serializers
import json
import time
import paramiko
# Create your views here.

def index(request):
    context = {}
    context['title'] = "运行状态"

    # 获取队列信息
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect('10.151.225.3', username='root', password='szmb&hpc@123', timeout=5)

    print("----------输出-----------")
    cmd = '/usr/bin/sh /root/get_queue.sh'
    stdin, stdout, stderr = ssh.exec_command(cmd)
    print("----------输出结束------------")

    result=stdout.readlines()
    context['queue']=result[0]
    ssh.close()
    #return HttpResponse(context['queue'])
    return render(request, 'status/index.html', context)

# 实时CPU利用率
def cpu_chart(request):
    # 获取集群总体CPU使用率
    sql_str = "SELECT mtc_data.VALUE,unix_timestamp(mtc_data.COLLECT_TIME) FROM gv_collect_metric as mtc,gv_collect_metric_data_history as mtc_data, gv_collect_metric_templ as mtc_tp WHERE mtc.RESOURCE_ID=1001 AND mtc.ID=mtc_data.METRIC_ID AND mtc.METRIC_TEMPL_ID=mtc_tp.ID AND mtc_tp.DESCRIPTION='CPU利用率' "

    with connections['db_gridview'].cursor() as cursor:
        # cursor.execute("UPDATE bar SET foo = 1 WHERE baz = %s", [self.baz])
        cursor.execute(sql_str)
        row = cursor.fetchall()
    list_cpu_used = []
    for each_cpu_used in row:

        value_time = [each_cpu_used[1]*1000,float(each_cpu_used[0])]
        list_cpu_used.append(value_time)


    json_cpu_data = (
        list_cpu_used
    )

    name_dict = {'status': 'success', 'json_cpu_data':json_cpu_data}
    return JsonResponse(name_dict)
    # return  HttpResponse(json_cpu_data)

# 历史CPU利用率
def cpu_history(request):
    # 获取集群总体历史CPU使用率
    start_date = request.POST.get('start_date')
    end_date = request.POST.get('end_date')

    timeArray = time.strptime(start_date, "%Y-%m-%d")
    timeStamp = str(time.mktime(timeArray))+ '000'

    cpu_data_objs = cluster_cpu_history.objects.values('value', 'collect_time').filter(collect_time__gt=timeStamp)
    data_set = []
    for each_obj in cpu_data_objs:
        data_set.append([int(each_obj['collect_time']), float(each_obj['value'])])

    return JsonResponse({"cpu_history_data":data_set})

# 历史内存利用率
def memory_history(request):
    # 获取集群总体历史CPU使用率
    start_date = request.POST.get('start_date')
    end_date = request.POST.get('end_date')

    timeArray = time.strptime(start_date, "%Y-%m-%d")
    timeStamp = str(time.mktime(timeArray))+ '000'

    memory_data_objs = cluster_memory_history.objects.values('value', 'collect_time').filter(collect_time__gt=timeStamp)
    data_set = []
    for each_obj in memory_data_objs:
        data_set.append([int(each_obj['collect_time']), float(each_obj['value'])])

    return JsonResponse({"memory_history_data":data_set})

def memory_chart(request):
    # 获取集群总体CPU使用率
    sql_str = "SELECT mtc_data.VALUE,unix_timestamp(mtc_data.COLLECT_TIME) FROM gv_collect_metric as mtc,gv_collect_metric_data_history as mtc_data, gv_collect_metric_templ as mtc_tp WHERE mtc.RESOURCE_ID=1001 AND mtc.ID=mtc_data.METRIC_ID AND mtc.METRIC_TEMPL_ID=mtc_tp.ID AND mtc_tp.DESCRIPTION='内存利用率'"

    with connections['db_gridview'].cursor() as cursor:
        cursor.execute(sql_str)
        row = cursor.fetchall()
    list_memory_used = []
    for each_memory_used in row:

        value_time = [each_memory_used[1]*1000,float(each_memory_used[0])]
        list_memory_used.append(value_time)


    json_memory_data = (
        list_memory_used
    )

    name_dict = {'status': 'success', 'json_memory_data':json_memory_data}
    return JsonResponse(name_dict)


def group_memory_chart(request):
    with connections['db_gridview'].cursor() as cursor:
        sql_str = "SELECT rs.NAME FROM gv_rm_resource as rs,gv_rm_category as ct WHERE rs.CATEGORY_ID=ct.ID AND ct.DESCRIPTION='组'"
        cursor.execute(sql_str)
        row = cursor.fetchall()



    all_dic_list = []
    for each_group in row:
        # 查询每一组的内存使用率
        group_sub_data_list = []
        with connections['db_gridview'].cursor() as cursor:
            single_group_sql_str = "SELECT UNIX_TIMESTAMP(mtc_data.COLLECT_TIME), mtc_data.VALUE FROM gv_rm_category AS ct , gv_rm_resource AS rs, gv_collect_metric AS mtc, gv_collect_metric_data_history AS mtc_data,gv_collect_metric_templ AS mtc_tp WHERE rs.CATEGORY_ID=ct.ID AND mtc.RESOURCE_ID=rs.ID AND mtc.ID=mtc_data.METRIC_ID AND mtc_tp.ID=mtc.METRIC_TEMPL_ID  AND mtc.NAME=%s AND rs.NAME=%s"
            cursor.execute(single_group_sql_str, ["Memory Usage",each_group[0]])
            single_group_row = cursor.fetchall()
            for each_group_memory_value in single_group_row:
                group_sub_data_list.append([each_group_memory_value[0]*1000,float(each_group_memory_value[1])])
        all_dic_list.append({"name":each_group[0],"data":group_sub_data_list})


    group_memory_dict_list = {'status': 'success', 'json_group_memory_data': all_dic_list}
    return JsonResponse(group_memory_dict_list)
    # return  HttpResponse(all_dic_list)


def group_cpu_chart(request):
    with connections['db_gridview'].cursor() as cursor:
        sql_str = "SELECT rs.NAME FROM gv_rm_resource as rs,gv_rm_category as ct WHERE rs.CATEGORY_ID=ct.ID AND ct.DESCRIPTION='组'"
        cursor.execute(sql_str)
        row = cursor.fetchall()



    all_dic_list = []
    for each_group in row:
        # 查询每一组的内存使用率
        group_sub_data_list = []
        with connections['db_gridview'].cursor() as cursor:
            single_group_sql_str = "SELECT UNIX_TIMESTAMP(mtc_data.COLLECT_TIME), mtc_data.VALUE FROM gv_rm_category AS ct , gv_rm_resource AS rs, gv_collect_metric AS mtc, gv_collect_metric_data_history AS mtc_data,gv_collect_metric_templ AS mtc_tp WHERE rs.CATEGORY_ID=ct.ID AND mtc.RESOURCE_ID=rs.ID AND mtc.ID=mtc_data.METRIC_ID AND mtc_tp.ID=mtc.METRIC_TEMPL_ID  AND mtc.NAME=%s AND rs.NAME=%s"
            cursor.execute(single_group_sql_str, ["CPU Usage",each_group[0]])
            single_group_row = cursor.fetchall()
            for each_group_cpu_value in single_group_row:
                group_sub_data_list.append([each_group_cpu_value[0]*1000,float(each_group_cpu_value[1])])
        all_dic_list.append({"name":each_group[0],"data":group_sub_data_list})
        # all_dic_list.append(",")


    group_cpu_dict_list = {'status': 'success', 'json_group_cpu_data': all_dic_list}
    return JsonResponse(group_cpu_dict_list)




def get_selected_option(request):
    # 查询所有的用户名，其中第一条查询历史记录
    first_user = Quota_user.objects.first()

    # 获取第一个用户的数据
    filter_time = str(int(time.time()) - 2592000) + "000"
    first_user_data = Quota.objects.values('id','username','realbytes','softbytes','hardbytes','collect_time').filter(
        username=first_user.username,collect_time__gt=filter_time)
    first_user_data_set = []
    for first_user_dic in first_user_data:
        first_user_data_set.append([int(first_user_dic['collect_time']),round(int(first_user_dic['realbytes'])/1024/1024/1024/1024,2)])

    #return HttpResponse(first_user_data_set)
    #所有用户列表
    all_users = Quota_user.objects.values('username','softbytes','hardbytes').all()
    list_user = []
    for each_user in all_users:
        list_user.append({"username" : each_user['username'],
                          "softbytes": each_user['softbytes'],
                          "hardbytes": each_user['hardbytes'],
                          "back_data": first_user_data_set
                          })
    list_user = json.dumps(list_user, indent=2)
    return HttpResponse(list_user)

# 存储实时表格数据
def storage_table(request):
    data = {}
    user_objs = Quota_user.objects.values('username','uid','realbytes','softbytes','hardbytes','realinodes','softinodes','hardinodes','grace')

    data['list'] = list(user_objs)
    return JsonResponse(data)
    #data = serializers.serialize("json", user_objs)
    #return HttpResponse(data)




# 存储历史趋势图表
def storage_chart(request):
    user = request.POST.get('username')

    # 根据用户名查询阈值
    user_obj = Quota_user.objects.get(username=user)

    soft_threshold = user_obj.softbytes
    hard_threshold = user_obj.hardbytes

    filter_time = str(int(time.time())-2592000)+"000"
    user_data = Quota.objects.values('id', 'username', 'realbytes', 'softbytes', 'hardbytes',
                                           'collect_time').filter(username=user,collect_time__gt=filter_time)
    user_data_set = []
    for user_dic in user_data:
        user_data_set.append([int(user_dic['collect_time']),
                                    round(int(user_dic['realbytes']) / 1024 / 1024 / 1024 / 1024, 2)])

    # data = [[1564729202000, 78.41],[1564729265000, 74.89],[1564729324000, 75.5],[1564729385000, 75.34],[1564729445000, 74.23],[1564729501000, 74.36],[1564729564000, 74.54],[1564729624000, 74.17],[1564729684000, 74.86],[1564729745000, 74.85],[1564729801000, 73.69],[1564729865000, 72.82],[1564729925000, 71.59],[1564729985000, 70.74],[1564730045000, 60.75],[1564730101000, 54.84],[1564730165000, 53.66],[1564730225000, 53.13],[1564730285000, 52.57],[1564730345000, 53.63],[1564730401000, 54.35],[1564730465000, 54.49],[1564730525000, 55.98],[1564730584000, 60.79],[1564730644000, 58.87],[1564730701000, 58.8],[1564730765000, 54.28],[1564730825000, 58.95],[1564730885000, 61.14],[1564730945000, 71.09],[1564731001000, 75.41],[1564731065000, 75.76],[1564731125000, 71.26],[1564731185000, 67.51],[1564731245000, 75.07],[1564731301000, 76.05],[1564731365000, 76.0],[1564731425000, 75.61],[1564731484000, 76.56],[1564731545000, 75.01],[1564731601000, 73.96],[1564731664000, 74.59],[1564731724000, 73.55],[1564731785000, 72.76],[1564731845000, 72.39],[1564731901000, 71.76],[1564731965000, 69.96],[1564732024000, 70.15],[1564732085000, 69.63],[1564732145000, 68.12],[1564732201000, 69.32],[1564732265000, 68.59],[1564732325000, 65.9],[1564732385000, 67.31],[1564732445000, 65.95],[1564732501000, 64.26],[1564732565000, 62.55],[1564732625000, 62.35],[1564732685000, 60.96],[1564732745000, 59.72],[1564732801000, 58.94],[1564732865000, 59.48],[1564732925000, 54.53]]
    return JsonResponse({"status":"success","back_data":user_data_set,"soft_threshold":soft_threshold,"hard_threshold":hard_threshold})



# 队列占用节点数
def queue_alloc_chart(request):
    print("hello testing ")
    start_date = request.POST.get('start_date')
    end_date = request.POST.get('end_date')
    #start_date='2019-08-17'
    timeArray = time.strptime(start_date, "%Y-%m-%d")
    timeStamp = str(time.mktime(timeArray))+ '000'

    HAPS_data_objs = queue_alloc.objects.values('value', 'collect_time').filter(collect_time__gt=timeStamp,queue="HAPS")
    SixminRadar_data_objs = queue_alloc.objects.values('value', 'collect_time').filter(collect_time__gt=timeStamp,queue="SixminRadar")
    haps_data_set = []
    sixminradar_data_set = []
    for each_obj in HAPS_data_objs:
        haps_data_set.append([int(each_obj['collect_time']), float(each_obj['value'])])

    for each_obj in SixminRadar_data_objs:
        sixminradar_data_set.append([int(each_obj['collect_time']), float(each_obj['value'])])

    queue_alloc_dic = {'queue_alloc_data':[{"name":"HAPS","data":haps_data_set},{"name":"SixminRadar","data":sixminradar_data_set}]}

    return JsonResponse(queue_alloc_dic)