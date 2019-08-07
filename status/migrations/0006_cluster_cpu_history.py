# Generated by Django 2.2 on 2019-08-07 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('status', '0005_auto_20190807_1113'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cluster_cpu_history',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(default='', max_length=50, verbose_name='CPU利用率')),
                ('collect_time', models.CharField(default='', max_length=50, verbose_name='收集时间')),
            ],
            options={
                'verbose_name_plural': 'CPU利用率',
                'db_table': 'Cluster_cpu_history',
            },
        ),
    ]
