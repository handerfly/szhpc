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


def group_cpu_chart(request):
    pass


def group_memory_chart(request):
    pass



# def my_sql(self):
#     with connections['db_gridview'].cursor() as cursor:
#         # cursor.execute("UPDATE bar SET foo = 1 WHERE baz = %s", [self.baz])
#         cursor.execute("SELECT * FROM gv_rm_category")
#         row = cursor.fetchone()
#
#
#     return HttpResponse(row)

