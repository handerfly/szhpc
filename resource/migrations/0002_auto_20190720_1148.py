# Generated by Django 2.2 on 2019-07-20 03:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('resource', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource',
            name='fk_type_id',
            field=models.ForeignKey(help_text='资源分类', on_delete=django.db.models.deletion.CASCADE, to='resource.Type', verbose_name='资源分类'),
        ),
    ]