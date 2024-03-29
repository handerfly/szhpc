# Generated by Django 2.2 on 2019-09-20 03:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hpc', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Links',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='链接名称')),
                ('url', models.CharField(max_length=100, verbose_name='链接地址')),
                ('link_logo', models.ImageField(upload_to='links_img/', verbose_name='链接图片')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
            ],
            options={
                'verbose_name_plural': '常用链接',
                'db_table': 'Links',
            },
        ),
    ]
