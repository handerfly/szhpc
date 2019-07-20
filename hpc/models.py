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