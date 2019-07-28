from django.shortcuts import render
from django.http import  JsonResponse
from django.db import connections
from django.http import HttpResponse
import time
# Create your views here.

def index(request):
    context = {}
    context['title'] = "运行状态"
    return render(request, 'status/index.html', context)

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
        all_dic_list.append(",")


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
        all_dic_list.append(",")


    group_cpu_dict_list = {'status': 'success', 'json_group_cpu_data': all_dic_list}
    return JsonResponse(group_cpu_dict_list)




# def my_sql(self):
#     with connections['db_gridview'].cursor() as cursor:
#         # cursor.execute("UPDATE bar SET foo = 1 WHERE baz = %s", [self.baz])
#         cursor.execute("SELECT * FROM gv_rm_category")
#         row = cursor.fetchone()
#
#
#     return HttpResponse(row)

