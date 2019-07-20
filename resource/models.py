from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField

# Create your models here.
class Type(models.Model):
    title = models.CharField("资源类型", max_length=30)

    create_time = models.DateTimeField("创建时间", auto_now_add=True)
    update_time = models.DateTimeField("更新时间", auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "资源环境分类"

class Resource(models.Model):
    fk_type_id = models.ForeignKey(Type, on_delete=models.CASCADE, help_text="资源分类", verbose_name="资源分类",)
    content = RichTextUploadingField("资源环境", config_name='my_config')

    create_time = models.DateTimeField("创建时间", auto_now_add=True)
    update_time = models.DateTimeField("更新时间", auto_now=True)

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name_plural = "资源环境"