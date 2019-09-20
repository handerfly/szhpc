from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField

# Create your models here.
class About(models.Model):
    content = RichTextUploadingField("平台概况",config_name='my_config')

    create_time = models.DateTimeField("创建时间", auto_now_add=True)
    update_time = models.DateTimeField("更新时间", auto_now=True)

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name_plural = '平台概况'
        db_table = "About"


class Links(models.Model):
    title = models.CharField("链接名称", max_length=100)
    url = models.CharField("链接地址", max_length=100)
    link_logo = models.ImageField("链接图片", upload_to='links_img/')

    create_time = models.DateTimeField("创建时间", auto_now_add=True)
    update_time = models.DateTimeField("更新时间", auto_now=True)

    def __str__(self):
        return self.title;

    class Meta:
        verbose_name_plural = '常用链接'
        db_table = "Links"
