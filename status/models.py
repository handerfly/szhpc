from django.db import models

# Create your models here.

class Quota(models.Model):
    username = models.CharField(verbose_name="用户名",max_length=50)
    uid = models.CharField(verbose_name="用户ID",max_length=50)
    realbytes = models.CharField(verbose_name="已用容量",max_length=50)
    softbytes = models.CharField(verbose_name="软阈值",max_length=50)
    hardbytes = models.CharField(verbose_name="硬阈值",max_length=50)
    realinodes = models.CharField(verbose_name="已用文件数",max_length=50)
    softinodes = models.CharField(verbose_name="文件数软阈值",max_length=50)
    hardinodes = models.CharField(verbose_name="文件数硬阈值",max_length=50)
    grace = models.CharField(verbose_name="天数",max_length=50)

    collect_time = models.CharField(verbose_name="时间戳",max_length=50)

    def __str__(self):
        return self.username

    class Meta:
        verbose_name_plural = '用户限额'
        db_table = "Quota"




class Quota_user(models.Model):
    username = models.CharField(verbose_name="用户名", max_length=50,default='')
    uid = models.CharField(verbose_name="用户ID", max_length=50,default='')
    realbytes = models.CharField(verbose_name="已用容量", max_length=50,default='')
    softbytes = models.CharField(verbose_name="软阈值", max_length=50,default='')
    hardbytes = models.CharField(verbose_name="硬阈值", max_length=50,default='')
    realinodes = models.CharField(verbose_name="已用文件数", max_length=50,default='')
    softinodes = models.CharField(verbose_name="文件数软阈值", max_length=50,default='')
    hardinodes = models.CharField(verbose_name="文件数硬阈值", max_length=50,default='')
    grace = models.CharField(verbose_name="天数", max_length=50,default='')


    def __str__(self):
        return self.username

    class Meta:
        verbose_name_plural = '用户'
        db_table = "Quota_user"


class cluster_cpu_history(models.Model):
    value = models.CharField(verbose_name="CPU利用率", max_length=50,default='')
    collect_time = models.CharField(verbose_name="收集时间", max_length=50,default='')


    def __str__(self):
        return str(self.value)

    class Meta:
        verbose_name_plural = 'CPU利用率'
        db_table = "cluster_cpu_history"


class cluster_memory_history(models.Model):
    value = models.CharField(verbose_name="内存利用率", max_length=50,default='')
    collect_time = models.CharField(verbose_name="收集时间", max_length=50,default='')


    def __str__(self):
        return str(self.value)

    class Meta:
        verbose_name_plural = '内存利用率'
        db_table = "cluster_memory_history"