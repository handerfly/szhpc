from django.db import models

# Create your models here.

class Quota(models.Model):
    qtype = models.CharField(verbose_name="文件类型",max_length=50)
    username = models.CharField(verbose_name="用户名",max_length=50)
    uid = models.CharField(verbose_name="用户ID",max_length=50)
    realbytes = models.CharField(verbose_name="已用容量",max_length=50)
    softbytes = models.CharField(verbose_name="软阈值",max_length=50)
    hardbytes = models.CharField(verbose_name="硬阈值",max_length=50)
    realinodes = models.CharField(verbose_name="已用文件数",max_length=50)
    softinodes = models.CharField(verbose_name="文件数软阈值",max_length=50)
    hardinodes = models.CharField(verbose_name="文件数硬阈值",max_length=50)
    grace = models.CharField(verbose_name="天数",max_length=50)

    collect_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

    class Meta:
        verbose_name_plural = '用户限额'
        db_table = "Quota"

