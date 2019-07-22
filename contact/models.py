from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField

# Create your models here.
class Contact(models.Model):
    content = RichTextUploadingField("联系我们",config_name='my_config')

    create_time = models.DateTimeField("创建时间", auto_now_add=True)
    update_time = models.DateTimeField("更新时间", auto_now=True)

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name_plural = '联系我们'
        db_table = "Contact"